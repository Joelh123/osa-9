import patients from "../../data/patients";
import {
	NonSensitivePatientEntry,
	PatientEntry,
	NewPatientEntry,
	Entry,
} from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): PatientEntry[] => {
	return patients;
};

const getSingleEntry = (id: string): PatientEntry | undefined => {
	return patients.find((p) => p.id == id);
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patients.map(
		({ id, name, dateOfBirth, gender, occupation, entries }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
			entries,
		})
	);
};

const addPatient = (object: NewPatientEntry): PatientEntry => {
	const newPatientEntry: PatientEntry = {
		id: uuid(),
		...object,
		entries: [],
	};

	patients.push(newPatientEntry);
	return newPatientEntry;
};

const addEntry = (object: Entry, id: string) => {
	const { name, dateOfBirth, ssn, gender, occupation, entries } =
		patients.find((p) => p.id === id) || {};

	if (!name || !dateOfBirth || !ssn || !gender || !occupation || !entries) {
		return null;
	}

	const updatedPatient: PatientEntry = {
		id: id,
		name: name,
		dateOfBirth: dateOfBirth,
		ssn: ssn,
		gender: gender,
		occupation: occupation,
		entries: [...entries, { ...object, id: uuid() }],
	};

	patients.map((p) => (p.id === id ? updatedPatient : p));

	return updatedPatient;
};

export default {
	getEntries,
	getSingleEntry,
	getNonSensitiveEntries,
	addPatient,
	addEntry,
};
