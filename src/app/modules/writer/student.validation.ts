import { z } from 'zod';

export const createReaderValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    Reader: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
  }),
});


export const updateReaderValidationSchema = z.object({
  body: z.object({
    Reader: z.object({
      name: z.string().optional(),
     email: z.string().email().optional(),
    }),
  }),
});

export const ReaderValidations = {
  createReaderValidationSchema,
  updateReaderValidationSchema,
};
