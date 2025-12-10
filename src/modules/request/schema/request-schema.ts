import { z } from 'zod';

export const requestSchema = z.object({
  requested_by_id: z.number().int(),
  department_id: z.number().int(),
  request_code: z.string(),
  project_name: z.string().max(150),
  request_date: z.string().datetime(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED']),
  notes: z.string().optional().default(''),
  approved_by_id: z.number().int().nullable().optional(),
  approved_at: z.string().datetime().nullable().optional(),
  rejected_by_id: z.number().int().nullable().optional(),
  rejected_at: z.string().datetime().nullable().optional(),
});

export type RequestType = z.infer<typeof requestSchema>;

export const updateRequestSchema = z.object({
  requested_by_id: z.number().int().optional(),
  department_id: z.number().int().optional(),
  project_name: z.string().max(150).optional(),
  request_date: z.string().datetime().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  status: z.enum(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED']).optional(),
  notes: z.string().optional(),
  approved_by_id: z.number().int().nullable().optional(),
  approved_at: z.string().datetime().nullable().optional(),
  rejected_by_id: z.number().int().nullable().optional(),
  rejected_at: z.string().datetime().nullable().optional(),
});

export type UpdateRequestType = z.infer<typeof updateRequestSchema>;
