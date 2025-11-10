import { z } from "zod";
import { Gender } from "./types";

const NewEntrySchema = z.object({
	name: z.string().min(1),
	dateOfBirth: z.string().date(),
	ssn: z.string().min(1),
	gender: z.nativeEnum(Gender),
	occupation: z.string().min(1),
});

export default NewEntrySchema;
