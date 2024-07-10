import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import Button from "./Button";

function Header({ index, title, description }) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap2">
				<p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
					{index}
				</p>
				<h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
			</div>
			<p className="text-sm sm:text-base mx-auto">{description}</p>
		</div>
	);
}

export default function Generator({
	poison,
	setPoison,
	muscles,
	setMuscles,
	goal,
	setGoal,
	updateWorkout,
}) {
	const [showModal, setShowModal] = useState(false);

	function toggleModal() {
		setShowModal(!showModal);
	}

	function updateMuscles(muscleGroup) {
		if (muscles.includes(muscleGroup)) {
			setMuscles(muscles.filter((val) => val !== muscleGroup));
			return;
		}

		if (muscles.length > 3) {
			return;
		}

		if (poison !== "individual") {
			setMuscles([muscleGroup]);
			setShowModal(false);
			return;
		}

		setMuscles([...muscles, muscleGroup]);
		console.log(muscles.length);
		if (muscles.length === 2) {
			setShowModal(false);
		}
	}

	return (
		<SectionWrapper
			id={"generate"}
			header={"generate your workout"}
			title={["It's", "Huge", "o'clock"]}>
			<Header
				index={"01"}
				title={"Pick your poison"}
				description={"Select the workout you wish"}
			/>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{Object.keys(WORKOUTS).map((type, typeIndex) => {
					return (
						<button
							className={
								"bg-slate-950 border border-blue-400 duration-200 hover:border-blue-600 px-4 py-3 rounded-lg " +
								(type === poison ? "border-blue-600" : "border-blue-400")
							}
							key={typeIndex}
							onClick={() => {
								setMuscles([]);
								setPoison(type);
							}}>
							<p className="capitalize">{type.replaceAll("_", " ")}</p>
						</button>
					);
				})}
			</div>
			<Header
				index={"02"}
				title={"Lock On Targets"}
				description={"Select the muscle"}
			/>
			<div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex-col flex">
				<button
					className="relative p-3 flex items-center justify-center"
					onClick={() => {
						toggleModal();
					}}>
					<p className="capitalize">
						{muscles.length === 0 ? "Select Muscle Group" : muscles.join(" ")}
					</p>
					<i className="fa-solid fa-chevron-down right-3 top-1/2 -translate-y-1/2 absolute"></i>
				</button>
				{showModal && (
					<div className="flex flex-col px-3 pb-3">
						{(poison === "individual"
							? WORKOUTS[poison]
							: Object.keys(WORKOUTS[poison])
						).map((muscleGroup, muscleGroupIndex) => {
							return (
								<button
									onClick={() => {
										updateMuscles(muscleGroup);
									}}
									key={muscleGroupIndex}
									className={
										"hover:text-blue-400 duration-200 " +
										(muscles.includes(muscleGroup) ? " text-blue-400" : " ")
									}>
									<p className="uppercase">{muscleGroup.replaceAll("_", " ")}</p>
								</button>
							);
						})}
					</div>
				)}
			</div>
			<Header
				index={"03"}
				title={"Become SuperMan"}
				description={"Select your ultimate objective"}
			/>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
				{Object.keys(SCHEMES).map((scheme, schemeIndex) => {
					return (
						<button
							className={
								"bg-slate-950 border border-blue-400 duration-200 hover:border-blue-600 px-4 py-3 rounded-lg " +
								(scheme === goal ? "border-blue-600" : "border-blue-400")
							}
							key={schemeIndex}
							onClick={() => {
								setGoal(scheme);
							}}>
							<p className="capitalize">{scheme.replaceAll("_", " ")}</p>
						</button>
					);
				})}
			</div>
			<Button text={"Formulate"} func={updateWorkout} />
		</SectionWrapper>
	);
}
