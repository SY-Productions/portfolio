import { z } from "zod";

// WorkSample schema
export const workSampleSchema = z.object({
  id: z.number().int().positive(),
  isWeb: z.string().transform(val => val === "1"), 
  faTitle: z.string(),
  enTitle: z.string(),
  faDescription: z.string(),
  enDescription: z.string(),
  pictures: z.string(),
  link: z.string().url().optional(),
  technologys: z.string(),
  faStartDate: z.string(),
  enStartDate: z.string(),
  faEndDate: z.string(),
  enEndDate: z.string(),
});

// Education schema
export const educationSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  fromYear: z.number().int().positive(),
  toYear: z.number().int().positive().nullable(),
  picture: z.string(),
  description: z.string(),
});

// Work schema
export const workSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  technos: z.array(z.string()),
  fromYear: z.number().int().positive(),
  toYear: z.number().int().positive().nullable(),
  picture: z.string(),
  url: z.string().url(),
  description: z.string(),
});

// Event schema
export const eventSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string(),
  date: z.string(),
  picture: z.string(),
  attachment: z.string(),
  description: z.string(),
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
