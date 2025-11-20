import { Diagnosis, HealthCheckEntry } from "../../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

interface Props {
	entry: HealthCheckEntry;
	diagnoses: Diagnosis[];
}

const HealthCheck = ({ entry, diagnoses }: Props) => {
	let heartColor;
	switch (entry.healthCheckRating) {
		case 0:
			heartColor = "#1ac949";
			break;
		case 1:
			heartColor = "#f7ee39";
			break;
		case 2:
			heartColor = "#ff9124";
			break;
		case 3:
			heartColor = "#ff0000";
	}

	const style = {
		border: "2px solid",
		padding: "5px",
	};

	return (
		<div style={style}>
			<div>
				{entry.date} {<HealthAndSafetyIcon />}
			</div>
			<div>
				<i>{entry.description}</i>
			</div>
			<FavoriteIcon style={{ color: heartColor }} />
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

export default HealthCheck;
