import { z } from "zod";

export const kpiCreateSchema = z.object({
	title: z.string().min(1),
	value: z.number(),
	target: z.number(),
	ownerId: z.string().optional().nullable(),
});

export const kpiUpdateSchema = z.object({
	title: z.string().min(1).optional(),
	value: z.number().optional(),
	target: z.number().optional(),
	ownerId: z.string().optional().nullable(),
});

export const leadCreateSchema = z.object({
	name: z.string().min(1),
	stage: z.string().min(1),
	history: z.any().optional().nullable(),
});

export const leadUpdateSchema = z.object({
	name: z.string().min(1).optional(),
	stage: z.string().min(1).optional(),
	history: z.any().optional().nullable(),
});

export const documentCreateSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
	tags: z.array(z.string()),
});

export const documentUpdateSchema = z.object({
	title: z.string().min(1).optional(),
	content: z.string().min(1).optional(),
	tags: z.array(z.string()).optional(),
});


