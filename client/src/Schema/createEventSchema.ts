import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(30, "Title must not exceed 30 characters"),
  description: z
    .string()
    .nonempty("Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  category: z.string().min(2, "Category is required"),
  coverImageURL: z.union([
    z.string().url("Cover image must be a valid URL"),
    z.instanceof(File),
  ]),
  date_Time: z
    .object({
      startAt: z
        .string()
        .min(1, "Start date & time is required")
        .transform((val) => new Date(val)),
      endAt: z
        .string()
        .min(1, "End date & time is required")
        .transform((val) => new Date(val)),
    })
    .refine((data) => data.endAt > data.startAt, {
      message: "End date must be after start date",
      path: ["endAt"],
    }),
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    name: z
      .string()
      .min(2, "Location name must be at least 2 characters")
      .max(100, "Location name too long"),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(200, "Address must not exceed 200 characters"),
  }),
  ticket: z.object({
    amount: z
      .number()
      .positive("Ticket amount must be positive")
      .max(100000, "Ticket price is too high"),
    currency: z
      .string()
      .min(1, "Currency is required")
      .max(10, "Invalid currency code (e.g. USD, EUR, RON)"),
  }),
  capacity: z
    .number()
    .int("Capacity must be an integer")
    .positive("Capacity must be greater than zero")
    .max(100000, "Capacity too large"),
});

export type CreateEventType = z.infer<typeof createEventSchema>;
