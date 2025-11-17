import { useEffect, useState } from "react";
import type { Diary } from "./types";
import { getAllDiaries, addDiary } from "./services/diaryService";
import axios from "axios";
import Notification from "./components/Notification";

const App = () => {
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [date, setDate] = useState("");
	const [visibility, setVisibility] = useState("");
	const [weather, setWeather] = useState("");
	const [comment, setComment] = useState("");
	const [notification, setNotification] = useState("");

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

		try {
			const result = await addDiary(newDiary);
			setDiaries(diaries.concat(result));

			setDate("");
			setVisibility("");
			setWeather("");
			setComment("");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setNotification(String(error.response?.data) ?? "An error occurred");

				setTimeout(() => {
					setNotification("");
				}, 3000);
			} else {
				setNotification(String(error));

				setTimeout(() => {
					setNotification("");
				}, 3000);
			}
		}
	};

	return (
		<div>
			<h1>Add Entry</h1>
			<Notification message={notification} />
			<form onSubmit={createDiary}>
				<div>
					date
					<input
						type="text"
						value={date}
						onChange={({ target }) => setDate(target.value)}
					/>
				</div>
				<div>
					visibility
					<input
						type="text"
						value={visibility}
						onChange={({ target }) => setVisibility(target.value)}
					/>
				</div>
				<div>
					weather
					<input
						type="text"
						value={weather}
						onChange={({ target }) => setWeather(target.value)}
					/>
				</div>
				<div>
					comment
					<input
						type="text"
						value={comment}
						onChange={({ target }) => setComment(target.value)}
					/>
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
