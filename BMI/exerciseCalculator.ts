import { parseArguments } from "./parseArguments";

interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (period: number[], target: number): Result => {
	const periodLength: number = period.length;

	const trainingDays: number = period.filter((d) => d !== 0).length;

	const success: boolean =
		period.filter((d) => d >= target).length === period.length ? true : false;

	let rating: number;
	if (period.filter((d) => d >= target).length === period.length) {
		rating = 3;
	} else if (
		period.filter((d) => d >= target).length >= Math.floor(period.length / 2)
	) {
		rating = 2;
	} else {
		rating = 1;
	}

	let ratingDescription: string = "";
	switch (rating) {
		case 1:
			ratingDescription = "Not good enough";
			break;
		case 2:
			ratingDescription = "Not too bad but could be better";
			break;
		case 3:
			ratingDescription = "Perfect";
			break;
	}

	const sum = period.reduce((x, y) => x + y);
	const average = sum / period.length;

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
};
if (require.main === module) {
	try {
		const result = parseArguments(process.argv);
		if (
			result &&
			typeof result.target === "number" &&
			Array.isArray(result.numbers)
		) {
			console.log(calculateExercises(result.numbers, result.target));
		} else {
			throw new Error("Not enough arguments");
		}
	} catch (error: unknown) {
		let errorMessage = "Something bad happened.";
		if (error instanceof Error) {
			errorMessage += " Error: " + error.message;
		}
		console.log(errorMessage);
	}
}

export default calculateExercises;
