export const parseArguments = (args: string[]) => {
	if (args.length < 4) throw new Error("Not enough arguments");

	if (args[1].endsWith("exerciseCalculator.ts")) {
		if (isNaN(Number(args[2]))) {
			console.log(Number(args[2]));

			throw new Error("Provided values were not numbers");
		}
		const target: number = Number(args[2]);

		let num = 3;
		const numbers: number[] = [];

		while (true) {
			if (!args[num]) break;
			else if (isNaN(Number(args[num])))
				throw new Error("Provided values were not numbers");
			numbers.push(Number(args[num]));
			num += 1;
		}

		return { target, numbers };
	} else if (args[1].endsWith("bmiCalculator.ts")) {
		if (isNaN(Number(args[2])) || isNaN(Number(args[3])))
			throw new Error("Provided values were not numbers");

		const height: number = Number(args[2]);
		const weight: number = Number(args[3]);

		return { height, weight };
	} else {
		throw new Error("Invalid script name or arguments");
	}
};
