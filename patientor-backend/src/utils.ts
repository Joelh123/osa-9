import { z } from "zod";
import { Gender, HealthRating } from "./types";

const EntrySchema = z.object({
	description: z.string().min(1),
	date: z.string().min(1),
	specialist: z.string().min(1),
	diagnosisCodes: z.array(z.any()).optional(),
});

export const NewPatientEntrySchema = z.object({
	name: z.string().min(1),
	dateOfBirth: z.string().date(),
	ssn: z.string().min(1),
	gender: z.nativeEnum(Gender),
	occupation: z.string().min(1),
	entries: z.array(EntrySchema),
});

export const NewOccupationalHealthcareEntrySchema = EntrySchema.merge(
	z.object({
		type: z.string().min(1),
		employerName: z.string().min(1),
		sickLeave: z
			.object({ startDate: z.string().min(1), endDate: z.string().min(1) })
			.optional(),
	})
);

export const HealthCheckRatingEntrySchema = EntrySchema.merge(
	z.object({
		type: z.string().min(1),
		healthRating: z.nativeEnum(HealthRating),
	})
);

export const Hospital = EntrySchema.merge(
	z.object({
		type: z.string().min(1),
		discharge: z.object({ date: z.string().min(1), criteria: z.string().min(1) }),
	})
);
