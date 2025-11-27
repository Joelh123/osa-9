import { Button } from "@mui/material";
import { useState } from "react";
import { Patient } from "../../types";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";

interface Props {
	patient: Patient;
	setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
	triggerRefresh: () => void;
}

const AddEntryModal = ({ patient, setPatient, triggerRefresh }: Props) => {
	const [visible, setVisible] = useState(false);
	const [selectedType, setSelectedType] = useState("");

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
