import { z } from 'zod';
import { UserStatus } from './user.constant';

const userValidationSchema = z.object({
  pasword: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const createReaderValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    reader: z.object({
      name: z.string().optional(),
      email: z.string().email(),
      profileImg: z.string().optional(),
      password: z.string(),
    }),
  }),
});


export const updateReaderValidationSchema = z.object({
  body: z.object({
    reader: z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      profileImg: z.string().optional(),
      password: z.string().optional(),
    }),
  }),
});

export const AuthValidation = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().optional(),
  })
})

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
  createReaderValidationSchema,
  updateReaderValidationSchema,
  AuthValidation
};
