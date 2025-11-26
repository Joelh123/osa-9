import axios from "axios";
import { EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

	return data;
};

const getOne = async (id: string | undefined) => {
	const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

	return data;
};

const create = async (object: PatientFormValues) => {
	const objectWithEntries = {
		...object,
		entries: [],
	};

	const { data } = await axios.post<Patient>(
		`${apiBaseUrl}/patients`,
		objectWithEntries
	);

	return data;
};

const addEntry = async (object: EntryWithoutId, id: string) => {
	const { data } = await axios.post(
		`${apiBaseUrl}/patients/${id}/entries`,
		object
	);

	return data;
};

export default {
	getAll,
	getOne,
	create,
	addEntry,
};
