import { Diagnosis, HospitalEntry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface Props {
	entry: HospitalEntry;
	diagnoses: Diagnosis[];
}

const Hospital = ({ entry, diagnoses }: Props) => {
	const style = {
		border: "2px solid",
		padding: "5px",
	};

	return (
		<div style={style}>
			<div>
				{entry.date} {<LocalHospitalIcon />}
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

export default Hospital;
