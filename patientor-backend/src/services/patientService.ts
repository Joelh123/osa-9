import patients from "../../data/patients";
import {
	NonSensitivePatientEntry,
	PatientEntry,
	NewPatientEntry,
} from "../types";
import { v1 as uuid } from "uuid";

const id = uuid();

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
	const newPatientEntry = {
		id: id,
		...object,
	};

	patients.push(newPatientEntry);
	return newPatientEntry;
};

export default {
	getEntries,
	getSingleEntry,
	getNonSensitiveEntries,
	addPatient,
};
