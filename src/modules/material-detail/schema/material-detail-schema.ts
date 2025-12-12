import { z } from 'zod';

export const materialDetailSchema = z.object({
  request_id: z.number().int(),
  material_code: z.string().max(50),
  material_description: z.string(),
  quantity: z.string(),
  unit: z.string().max(25),
  material_type: z.string().max(100),
  specification: z.string(),
  brand: z.string(),
  notes: z.string(),
});

export type MaterialDetailType = z.infer<typeof materialDetailSchema>;

export const updateMaterialDetailSchema = z.object({
  request_id: z.number().int().optional(),
  material_code: z.string().max(50).optional(),
  material_description: z.string().optional(),
  quantity: z.string().optional(),
  unit: z.string().max(25).optional(),
  material_type: z.string().max(100).optional(),
  specification: z.string().optional(),
  brand: z.string().optional(),
  notes: z.string().optional(),
});

export type UpdateMaterialDetailType = z.infer<
  typeof updateMaterialDetailSchema
>;
