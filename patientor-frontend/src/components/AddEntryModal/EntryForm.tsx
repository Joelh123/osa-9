import { Alert, Button, DialogContent, Grid, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import patientService from "../../services/patients";
import axios from "axios";
import { Patient } from "../../types";

interface Props {
	patient: Patient;
	setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const EntryForm = ({ patient, setPatient }: Props) => {
	const [visible, setVisible] = useState(false);
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [specialist, setSpecialist] = useState("");
	const [healthCheckRating, setHealthCheckRating] = useState(0);
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [error, setError] = useState("");

	const hideWhenVisible = {
		display: visible ? "none" : "",
		paddingTop: "15px",
	};
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		setError("");

		const newEntry = {
			description: description,
			date: date,
			specialist: specialist,
			type: "HealthCheck" as "HealthCheck",
			healthCheckRating: Number(healthCheckRating),
			diagnosisCodes: diagnosisCodes ?? [],
		};

		try {
			const result = await patientService.addEntry(newEntry, patient.id);
			setPatient(result);
			setDescription("");
			setDate("");
			setSpecialist("");
			setHealthCheckRating(-1);
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

	const formStyle = {
		paddingBottom: "30px",
	};

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button color="primary" variant="contained" onClick={toggleVisibility}>
					Add Entry
				</Button>
			</div>
			<div style={showWhenVisible}>
				<div style={formStyle}>
					<DialogContent>
						{error && <Alert severity="error">{error}</Alert>}
					</DialogContent>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Description"
							fullWidth
							value={description}
							onChange={({ target }) => setDescription(target.value)}
						/>
						<TextField
							label="Date YYYY-MM-DD"
							fullWidth
							value={date}
							onChange={({ target }) => setDate(target.value)}
						/>
						<TextField
							label="Specialist"
							fullWidth
							value={specialist}
							onChange={({ target }) => setSpecialist(target.value)}
						/>
						<TextField
							label="Healthcheck Rating"
							fullWidth
							value={healthCheckRating}
							onChange={({ target }) => setHealthCheckRating(Number(target.value))}
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
									onClick={() => setVisible(!visible)}
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
			</div>
		</div>
	);
};

export default EntryForm;
