interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (week: number[], target: number): Result => {
	const periodLength: number = week.length;

	const trainingDays: number = week.filter((d) => d !== 0).length;

	const success: boolean =
		week.filter((d) => d >= target).length === week.length ? true : false;

	let rating: number;
	if (week.filter((d) => d >= target).length === 7) {
		rating = 3;
	} else if (week.filter((d) => d >= target).length >= 4) {
		rating = 2;
	} else {
		rating = 1;
	}

	let ratingDescription: string;
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

	const sum = week.reduce((x, y) => x + y);
	const average = sum / week.length;

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

console.log(calculateExercises([3, 2, 2, 4.5, 2, 3, 2], 3));
