import { z } from "zod";

// WorkSample schema
export const workSampleSchema = z.object({
  id: z.number().int().positive().optional(),
  isWeb: z.union([
    z.boolean(),
    z.string().transform((val) => val === "1" || val === "true"),
  ]),
  faTitle: z.string(),
  enTitle: z.string(),
  arTitle: z.string().optional().default(""),
  faDescription: z.string(),
  enDescription: z.string(),
  arDescription: z.string().optional().default(""),
  pictures: z.string(),
  link: z.string().optional().default(""),
  technologys: z.string(),
  faStartDate: z.string(),
  enStartDate: z.string(),
  arStartDate: z.string().optional().default(""),
  faEndDate: z.string(),
  enEndDate: z.string(),
  arEndDate: z.string().optional().default(""),
  client: z.string().optional().default(""),
});

// Education schema
export const educationSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  nameEn: z.string().optional().default(""),
  nameAr: z.string().optional().default(""),
  fromYear: z.number().int().positive(),
  toYear: z.number().int().positive().nullable(),
  picture: z.string(),
  description: z.string(),
  descriptionEn: z.string().optional().default(""),
  descriptionAr: z.string().optional().default(""),
});

// Work schema
export const workSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  nameEn: z.string().optional().default(""),
  nameAr: z.string().optional().default(""),
  technos: z.array(z.string()),
  fromYear: z.number().int().positive(),
  toYear: z.number().int().positive().nullable(),
  picture: z.string(),
  url: z.string().url(),
  description: z.string(),
  descriptionEn: z.string().optional().default(""),
  descriptionAr: z.string().optional().default(""),
});

// Event schema
export const eventSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  nameEn: z.string().optional().default(""),
  nameAr: z.string().optional().default(""),
  date: z.string(),
  picture: z.string(),
  attachment: z.string(),
  description: z.string(),
  descriptionEn: z.string().optional().default(""),
  descriptionAr: z.string().optional().default(""),
});

// Combined database schema
export const dbSchema = z.object({
  WorkSmaples: z.array(workSampleSchema),
  Educations: z.array(educationSchema),
  Works: z.array(workSchema),
  Events: z.array(eventSchema),
});

// Type definitions generated from schemas
export type WorkSample = z.infer<typeof workSampleSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Work = z.infer<typeof workSchema>;
export type Event = z.infer<typeof eventSchema>;
export type DbSchema = z.infer<typeof dbSchema>;
