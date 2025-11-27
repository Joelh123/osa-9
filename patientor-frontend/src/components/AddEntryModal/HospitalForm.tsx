import { Alert, Button, DialogContent, Grid, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import axios from "axios";

interface HealthCheckFormProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	patient: Patient;
	setPatient: Dispatch<SetStateAction<Patient | null>>;
	triggerRefresh: () => void;
}

const HospitalForm = ({
	visible,
	setVisible,
	patient,
	setPatient,
	triggerRefresh,
}: HealthCheckFormProps) => {
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [specialist, setSpecialist] = useState("");
	const [dischargeDate, setDischargeDate] = useState("");
	const [dischargeCriteria, setDischargeCriteria] = useState("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [error, setError] = useState("");
	const formStyle = { paddingBottom: "30px" };

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");

		const newEntry = {
			description: description,
			date: date,
			specialist: specialist,
			type: "Hospital" as "Hospital",
			discharge: { date: dischargeDate, criteria: dischargeCriteria },
			diagnosisCodes: diagnosisCodes ?? [],
		};

		try {
			const result = await patientService.addEntry(newEntry, patient.id);
			setPatient({ ...patient, entries: [...patient.entries, result] });
			triggerRefresh();
			setDescription("");
			setDate("");
			setSpecialist("");
			setDischargeDate("");
			setDischargeCriteria("");
			setDiagnosisCodes([]);
			setVisible(!visible);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data.error) {
					let message = "";
					e.response.data.error.map((issue: { message: string; path: string }) => {
						console.log(issue);
						message += `Error at ${issue.path[0]}: ${issue.message} | `;
					});

					console.error(message);
					setError(message);
				} else {
					setError("Unrecognized axios error");
				}
			} else {
				console.error("Unknown error", e);
				setError("Unknown error");
			}
		}
	};
	return (
		<div style={formStyle}>
			<DialogContent>
				{error && <Alert severity="error">{error}</Alert>}
			</DialogContent>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Description*"
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
				/>
				<TextField
					label="Date YYYY-MM-DD*"
					fullWidth
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<TextField
					label="Specialist*"
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
				/>
				<TextField
					label="Discharge date*"
					fullWidth
					value={dischargeDate}
					onChange={({ target }) => setDischargeDate(target.value)}
				/>
				<TextField
					label="Discharge criteria*"
					fullWidth
					value={dischargeCriteria}
					onChange={({ target }) => setDischargeCriteria(target.value)}
				/>
				<TextField
					label="Diagnosis Codes"
					fullWidth
					value={diagnosisCodes.join(", ")}
					onChange={({ target }) =>
						setDiagnosisCodes(target.value.split(",").map((code) => code.trim()))
					}
				/>
				<Grid>
					<Grid item>
						<Button
							color="error"
							variant="contained"
							style={{ float: "left" }}
							type="button"
							onClick={() => {
								setError("");
								setVisible(!visible);
							}}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{
								float: "right",
							}}
							type="submit"
							variant="contained"
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default HospitalForm;
