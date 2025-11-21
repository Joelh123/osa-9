import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientService";
import z from "zod";
import { NewPatientEntrySchema } from "../utils";
import { NewPatientEntry, PatientEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
	res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
	const patient = patientService.getSingleEntry(req.params.id);
	if (!patient) {
		return res.status(404).send({ error: "Patient not found" });
	}
	return res.send(patient);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientEntrySchema.parse(req.body);
		console.log(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
};

const errorMiddleware = (
	error: unknown,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof z.ZodError) {
		res.status(400).send({ error: error.issues });
	} else {
		next(error);
	}
};

router.post(
	"/",
	newPatientParser,
	(
		req: Request<unknown, unknown, NewPatientEntry>,
		res: Response<PatientEntry>
	) => {
		const addedEntry = patientService.addPatient(req.body);
		res.json(addedEntry);
	}
);

router.post("/:id/entries", (req, res) => {
	const addedEntry = patientService.addEntry(req.body, req.params.id);

	res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;
