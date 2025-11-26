import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
	entry: OccupationalHealthcareEntry;
	diagnoses: Diagnosis[];
}

const OccupationalHealthcare = ({ entry, diagnoses }: Props) => {
	const style = {
		border: "2px solid",
		padding: "5px",
	};

	return (
		<div style={style}>
			<div>
				{entry.date} {<WorkIcon />} {entry.employerName}
			</div>
			<div>
				<i>{entry.description}</i>
			</div>
			<ul>
				{entry.diagnosisCodes?.map((code) => (
					<li key={code}>
						{code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
					</li>
				))}
			</ul>
			<div>diagnosed by {entry.specialist}</div>
		</div>
	);
};

export default OccupationalHealthcare;
