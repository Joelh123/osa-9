import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";
import diagnosisService from "../../services/diagnoses";
interface Props {
	patient: Patient;
	setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
	triggerRefresh: () => void;
}

const AddEntryModal = ({ patient, setPatient, triggerRefresh }: Props) => {
	const [visible, setVisible] = useState(false);
	const [selectedType, setSelectedType] = useState("");
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	useEffect(() => {
		const fetchDiagnoses = async () => {
			const result = await diagnosisService.getAll();
			setDiagnoses(result);
		};
		void fetchDiagnoses();
	}, []);

	const hideWhenVisible = {
		display: visible ? "none" : "",
		paddingTop: "15px",
	};
	const showWhenVisible = { display: visible ? "" : "none" };

	const selectType = (type: string): void => {
		setSelectedType(type);
		setVisible(!visible);
	};

	return (
		<div>
			<div style={hideWhenVisible}>
				<div>
					<Button
						color="primary"
						variant="contained"
						onClick={() => selectType("HealthCheckForm")}
					>
						Add Health Check Entry
					</Button>
				</div>
				<div>
					<Button
						color="secondary"
						variant="contained"
						onClick={() => selectType("OccupationalHealthcare")}
					>
						Add Occupational Healthcare Entry
					</Button>
				</div>
				<div>
					<Button
						color="warning"
						variant="contained"
						onClick={() => selectType("Hospital")}
					>
						Add Hospital Entry
					</Button>
				</div>
			</div>
			<div style={showWhenVisible}>
				{(() => {
					switch (selectedType) {
						case "HealthCheckForm":
							return (
								<HealthCheckForm
									visible={visible}
									setVisible={setVisible}
									patient={patient}
									setPatient={setPatient}
									triggerRefresh={triggerRefresh}
									diagnoses={diagnoses}
								/>
							);
						case "OccupationalHealthcare":
							return (
								<OccupationalHealthcareForm
									visible={visible}
									setVisible={setVisible}
									patient={patient}
									setPatient={setPatient}
									triggerRefresh={triggerRefresh}
									diagnoses={diagnoses}
								/>
							);
						case "Hospital":
							return (
								<HospitalForm
									visible={visible}
									setVisible={setVisible}
									patient={patient}
									setPatient={setPatient}
									triggerRefresh={triggerRefresh}
									diagnoses={diagnoses}
								/>
							);
						default:
							return null;
					}
				})()}
			</div>
		</div>
	);
};

export default AddEntryModal;
