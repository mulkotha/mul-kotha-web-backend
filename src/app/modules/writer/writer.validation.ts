import { z } from 'zod';

export const createWriterValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    writer: z.object({
      name: z.string(),
      email: z.string().email(),
      profileImg: z.string().optional(),
      password: z.string().optional(),
    }),
  }),
});


export const updateWriterValidationSchema = z.object({
  body: z.object({
    Writer: z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      
    }),
  }),
});

export const WriterValidations = {
  createWriterValidationSchema,
  updateWriterValidationSchema,
};
