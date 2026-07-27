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

export const collections = { news, seminars };
