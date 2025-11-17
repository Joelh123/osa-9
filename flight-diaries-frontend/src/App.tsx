import { useEffect, useState } from "react";
import type { Diary } from "./types";
import { getAllDiaries, addDiary } from "./services/diaryService";

const App = () => {
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [date, setDate] = useState("");
	const [visibility, setVisibility] = useState("");
	const [weather, setWeather] = useState("");
	const [comment, setComment] = useState("");

	useEffect(() => {
		getAllDiaries().then((data) => setDiaries(data));
	}, []);

	const createDiary = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		const newDiary = {
			id: "",
			date: date,
			visibility: visibility,
			weather: weather,
			comment: comment || "",
		};

		const result = await addDiary(newDiary);

		setDiaries(diaries.concat(result));
		setDate("");
		setVisibility("");
		setWeather("");
		setComment("");
	};

	return (
		<div>
			<h1>Add Entry</h1>
			<form onSubmit={createDiary}>
				<div>
					date
					<input type="text" onChange={(event) => setDate(event.target.value)} />
				</div>
				<div>
					visibility
					<input
						type="text"
						onChange={(event) => setVisibility(event.target.value)}
					/>
				</div>
				<div>
					weather
					<input type="text" onChange={(event) => setWeather(event.target.value)} />
				</div>
				<div>
					comment
					<input type="text" onChange={(event) => setComment(event.target.value)} />
				</div>
				<button type="submit">add</button>
			</form>
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
