import type { JSX } from "react";
import type { CoursePart } from "../types";

const Part = (props: CoursePart): JSX.Element => {
	switch (props.kind) {
		case "basic":
			return (
				<div>
					<b>
						{props.name} {props.exerciseCount}
					</b>
					<div>description: {props.description}</div>
				</div>
			);
		case "group":
			return (
				<div>
					<b>
						{props.name} {props.exerciseCount}
					</b>
					<div>group project count: {props.groupProjectCount}</div>
				</div>
			);
		case "background":
			return (
				<div>
					<b>
						{props.name} {props.exerciseCount}
					</b>
					<div>description: {props.description}</div>
					<div>background material: {props.backgroundMaterial}</div>
				</div>
			);
		case "special":
			return (
				<div>
					<b>
						{props.name} {props.exerciseCount}
					</b>
					<div>description: {props.description}</div>
					<div>requirements: {props.requirements.join(", ")}</div>
				</div>
			);
		default:
			return <></>;
	}
};

export default Part;
