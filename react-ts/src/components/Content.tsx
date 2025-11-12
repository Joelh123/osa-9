import type { JSX } from "react";

interface CoursePart {
	name: string;
	exerciseCount: number;
}

interface ContentProps {
	courseParts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
	return (
		<>
			{props.courseParts.map((p) => (
				<p key={p.name}>
					{p.name} {p.exerciseCount}
				</p>
			))}
		</>
	);
};

export default Content;
