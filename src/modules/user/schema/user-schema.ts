import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().max(40),
  email: z.string().email(),
  phone_number: z.string().max(15),
  password: z.string().min(6),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  role: z.enum(['ADMIN', 'REQUESTER', 'APPROVER']),
  department_id: z.number().int().positive(),
  position_id: z.number().int().positive(),
});

export type UserType = z.infer<typeof userSchema>;

export const updateUserSchema = z.object({
  name: z.string().max(40).optional(),
  email: z.string().email().optional(),
  phone_number: z.string().max(15).optional(),
  password: z.string().min(6).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  role: z.enum(['ADMIN', 'REQUESTER', 'APPROVER']).optional(),
  department_id: z.number().int().positive().optional(),
  position_id: z.number().int().positive().optional(),
});

export type UpdateUserType = z.infer<typeof updateUserSchema>;
