import { z } from 'zod';

export const departmentSchema = z.object({
  name: z.string().max(40),
});

export type DepartmentType = z.infer<typeof departmentSchema>;

export const updateDepartmentSchema = z.object({
  name: z.string().max(40),
});

export type UpdateDepartmentType = z.infer<typeof updateDepartmentSchema>;
