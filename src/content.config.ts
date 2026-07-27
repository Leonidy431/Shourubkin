import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['ru', 'en']).default('ru'),
    summary: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const seminars = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/seminars' }),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date().optional(),
    price: z.string().optional(),
    lang: z.enum(['ru', 'en']).default('ru'),
    registrationOpen: z.boolean().default(true),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['ru', 'en']).default('ru'),
    subtitle: z.string().optional(),
    lead: z.string().optional(),
    intro: z.string().optional(),
    note: z.string().optional(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    facts: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    timeline: z.array(z.object({ period: z.string(), text: z.string() })).optional(),
    courses: z.array(z.object({ name: z.string(), text: z.string() })).optional(),
    pathway: z.array(z.string()).optional(),
    identityDiver: z.string().optional(),
    identityHydrolab: z.string().optional(),
  }),
});

export const collections = { news, seminars, pages };
