import express from "express";
const app = express();

app.use(express.json());

import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	const result = calculateBmi(height, weight);
	if (!weight || !height || !result) {
		res.status(400).send({ error: "malformatted parameters" });
	} else {
		res.send({ weight: weight, height: height, bmi: result });
	}
});

app.post("/exercises", (req, res) => {
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target) {
		return res.status(400).send({ error: "parameters missing" });
	}

	if (isNaN(target)) {
		return res.status(400).send({ error: "malformatted parameters" });
	}

	if (
		!Array.isArray(daily_exercises) ||
		daily_exercises.some((d: string) => isNaN(Number(d)))
	) {
		return res.status(400).send({ error: "malformatted parameters" });
	}
	const days = daily_exercises.map((d: string) => Number(d));

	const result = calculateExercises(days, Number(target));

	return res.send(result);
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
