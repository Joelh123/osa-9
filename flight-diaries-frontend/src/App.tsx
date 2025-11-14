import { useEffect, useState } from "react";
import type { Diary } from "./types";
import { getAllDiaries } from "./services/diaryService";

const App = () => {
	const [diaries, setDiaries] = useState<Diary[]>([]);

	useEffect(() => {
		getAllDiaries().then((data) => setDiaries(data));
	}, []);

	return (
		<div>
			<h1>Flight diaries</h1>
			{diaries.map((d) => (
				<div key={d.id}>
					<h2>{d.date}</h2>
					<div>weather: {d.weather}</div>
					<div>visibility: {d.visibility}</div>
				</div>
			))}
		</div>
	);
};

export default App;
