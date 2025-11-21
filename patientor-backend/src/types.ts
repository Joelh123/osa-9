import { z } from "zod";
import { NewPatientEntrySchema } from "./utils";

export interface DiagnosisEntry {
	code: string;
	name: string;
	latin?: string;
}

export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<DiagnosisEntry["code"]>;
}

export enum HealthRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: {
		date: string;
		criteria: string;
	};
}

export type Entry =
	| OccupationalHealthcareEntry
	| HospitalEntry
	| HealthCheckEntry;

export interface PatientEntry {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
	entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}
