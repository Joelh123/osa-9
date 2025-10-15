import { parseArguments } from "./parseArguments";

const calculateBmi = (height: number, weight: number): string => {
	const result: number = weight / (height / 100) ** 2;
	if (result < 16) {
		return "Underweight (Severe thinness)";
	} else if (result < 17) {
		return "Underweight (Moderate Thinness)";
	} else if (result < 18.5) {
		return "Underweight (Mild Thinness)";
	} else if (result < 25) {
		return "Normal Range";
	} else if (result < 30) {
		return "Overweight (Pre-Obese)";
	} else if (result < 35) {
		return "Obese (Class I)";
	} else if (result < 40) {
		return "Obese (Class II)";
	} else if (result >= 40) {
		return "Obese (Class III)";
	} else {
		return "Invalid value";
	}
};

try {
	const { height, weight } = parseArguments(process.argv);
	if (height === undefined || weight === undefined) {
		throw new Error("Height and weight must be provided and must be numbers.");
	}
	console.log(calculateBmi(height, weight));
} catch (error: unknown) {
	let errorMessage = "Something bad happened.";
	if (error instanceof Error) {
		errorMessage += " Error: " + error.message;
	}

	console.log(errorMessage);
}
