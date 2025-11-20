import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { QuestionMark } from "@mui/icons-material";

const PatientPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null);

	const id = useParams<{ id: string }>().id;

	useEffect(() => {
		const fetchPatient = async () => {
			const patient = await patientService.getOne(id);
			setPatient(patient);
		};
		void fetchPatient();
	}, []);
	if (!patient) {
		return <div>Patient not found</div>;
	}

	let genderIcon;
	switch (patient.gender) {
		case "male":
			genderIcon = <MaleIcon />;
			break;
		case "female":
			genderIcon = <FemaleIcon />;
			break;
		default:
			genderIcon = <QuestionMark />;
			break;
	}

	return (
		<div>
			<h1>
				{patient.name} {genderIcon}
			</h1>
			<div>ssn: {patient.ssn}</div>
			<div>occupation: {patient.occupation}</div>
			<h2>Entries</h2>
			<div>
				{patient.entries.map((e) => (
					<div key={e.id}>
						{e.date} {e.description}
						<ul>
							{e.diagnosisCodes?.map((c) => (
								<li key={c}>{c}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default PatientPage;
