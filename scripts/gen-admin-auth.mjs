// Генерирует public/admin/auth.json: GitHub-токен (ADMIN_PAT), зашифрованный
// номерами телефонов из секретов Actions. Запускается в CI перед сборкой.
// Пароль админки = номер телефона; расшифровка происходит в браузере.
import { webcrypto as crypto } from 'node:crypto';
import { writeFileSync, mkdirSync } from 'node:fs';

const ITERS = 310000;
const pat = (process.env.ADMIN_PAT || '').trim();
const phones = [process.env.MAX_NUMBER, process.env.TELEGRAM_NUMBER]
  .filter(Boolean)
  .flatMap((raw) => {
    const digits = raw.replace(/\D/g, '');
    const variants = new Set([raw.trim(), digits]);
    if (digits.length === 11 && digits.startsWith('8')) variants.add('7' + digits.slice(1));
    if (digits.length === 11 && digits.startsWith('7')) variants.add('8' + digits.slice(1));
    return [...variants];
  });

const b64 = (buf) => Buffer.from(buf).toString('base64');

async function encrypt(password, plaintext) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const km = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERS, hash: 'SHA-256' },
    km,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plaintext));
  return { salt: b64(salt), iv: b64(iv), ct: b64(ct) };
}

const entries = [];
if (pat && phones.length) {
  for (const phone of phones) entries.push(await encrypt(phone, pat));
  console.log(`admin auth: encrypted PAT for ${entries.length} password variant(s)`);
} else {
  console.warn('admin auth: ADMIN_PAT or phone secrets missing — password login disabled, PAT fallback only');
}

mkdirSync('public/admin', { recursive: true });
writeFileSync('public/admin/auth.json', JSON.stringify({ v: 1, iters: ITERS, entries }));
