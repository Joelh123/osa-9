import express from "express";
const app = express();

import calculateBmi from "./bmiCalculator";

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	const result = calculateBmi(height, weight);
	if (!weight || !height || !result) {
		res.send({ error: "malformatted parameters" });
	} else {
		res.send({ weight: weight, height: height, bmi: result });
	}
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
