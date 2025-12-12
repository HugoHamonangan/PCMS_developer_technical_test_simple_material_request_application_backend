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

export type UpdateMaterialDetailType = z.infer<
  typeof updateMaterialDetailSchema
>;
