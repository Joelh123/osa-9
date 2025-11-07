import patients from "../data/patients";
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

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
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
	getNonSensitiveEntries,
	addPatient,
};
