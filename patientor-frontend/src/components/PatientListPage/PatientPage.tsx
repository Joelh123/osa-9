import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { QuestionMark } from "@mui/icons-material";

const PatientPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	const id = useParams<{ id: string }>().id;

	useEffect(() => {
		const fetchPatient = async () => {
			const patient = await patientService.getOne(id);
			setPatient(patient);
		};
		const fetchDiagnoses = async () => {
			const result = await diagnosisService.getAll();
			setDiagnoses(result);
		};
		void fetchPatient();
		void fetchDiagnoses();
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
				{patient.entries.length !== 0 ? (
					patient.entries.map((e) => (
						<div key={e.id}>
							{e.date} {e.description}
							<ul>
								{e.diagnosisCodes?.map((c) => (
									<li key={c}>
										{c} {diagnoses.find((d) => d.code === c)?.name}
									</li>
								))}
							</ul>
						</div>
					))
				) : (
					<div>no entries</div>
				)}
			</div>
		</div>
	);
};

export default PatientPage;
