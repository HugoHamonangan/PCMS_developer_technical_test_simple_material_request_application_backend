import { z } from 'zod';

export const positionSchema = z.object({
  name: z.string().max(40),
});

export type PositionType = z.infer<typeof positionSchema>;

export const updatePositionSchema = z.object({
  name: z.string().max(40),
});

export type UpdatePositionType = z.infer<typeof updatePositionSchema>;
