import type { JSX } from "react";
import Part from "./Part";
import type { CoursePart } from "../types";

interface ContentProps {
	courseParts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
	const padding = {
		paddingBottom: 20,
	};

	return (
		<>
			{props.courseParts.map((part, index) => (
				<div key={index} style={padding}>
					<Part {...part} />
				</div>
			))}
		</>
	);
};

export default Content;
