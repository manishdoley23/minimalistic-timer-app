import React, { useContext, useRef } from "react";
import { useState } from "react";
import clsx from "clsx";

import { useTimerScheduler } from "./utils/hooks";

import Lap from "./components/Lap";
import Date from "./components/Date";

import { LapContext, LapWrapper } from "./context/LapContext";
import { useGetLaps } from "./context/lapHooks";

function App() {
	const {
		timerScheduler,
		setTimerScheduler,
		timer,
		setTimer,
		startedOnce,
		setStartedOnce,
	} = useTimerScheduler();

	const [topicVal, setTopicVal] = useState("");
	const [laps, setLaps] = useState<React.ReactNode[]>([]);

	const lapRef = useRef<HTMLInputElement>(null);

	const lapsCont = useContext(LapContext);
	console.log("useGetLaps:", useGetLaps());

	const handleLapTimings = () => {
		setLaps((prev) => {
			const idx = Math.ceil(Math.random() * 1000);
			const lapArray = [...prev] as React.ReactElement[];
			const lapArrayIdx = lapArray.length - 1;
			if (lapArray[lapArrayIdx] !== undefined) {
				lapArray[lapArrayIdx] = React.cloneElement(
					lapArray[lapArrayIdx],
					{ start: false }
				);
			}
			lapArray.push(<Lap topic={topicVal} key={idx} start={true} />);
			setTopicVal("");
			return lapArray;
		});
	};

	return (
		<>
			<div className="h-screen w-full flex flex-col items-center justify-center">
				<Date />
				<div>
					{timer.hours} : {timer.minutes} : {timer.seconds}
				</div>
				<div className="flex gap-5">
					<div className="flex">
						<div
							className={clsx(
								"flex gap-2",
								!timerScheduler.started
									? startedOnce === true
										? "hidden"
										: "block"
									: "block"
							)}
						>
							<p>Topic: </p>
							<input
								ref={lapRef}
								className={clsx("bg-gray-200")}
								value={topicVal}
								onChange={(e) =>
									setTopicVal(e.currentTarget.value)
								}
							/>{" "}
						</div>

						{/* Start timer */}
						<p
							onClick={() => {
								// Block for when the user starts the timer
								// without setting any topic
								if (topicVal === "" && laps.length < 1) {
									alert("Please enter topic");

									// Block is for when the user will start the
									// timer for the first time
								} else if (
									timerScheduler.started === false &&
									timerScheduler.stopped === true &&
									startedOnce === false
								) {
									setTimerScheduler({
										started: true,
										stopped: false,
									});
									laps.push(
										<Lap
											topic={topicVal}
											key={1}
											start={true}
										/>
									);
									setTopicVal("");

									// block for when stop is pressed and the timer is waiting
									// for the user to start it back up
								} else if (
									timerScheduler.started === false &&
									timerScheduler.stopped === true
								) {
									setTimerScheduler({
										started: true,
										stopped: false,
									});
									setLaps((prev) => {
										const lapArray = [
											...prev,
										] as React.ReactElement[];
										const lastIdx = lapArray.length - 1;
										lapArray[lastIdx] = React.cloneElement(
											lapArray[lastIdx],
											{ start: true }
										);
										return lapArray;
									});

									// this block is for when the user has started the timer and
									// doing rounds of laps later
								} else {
									if (topicVal === "") {
										alert("Enter a topic");
										return;
									}
									handleLapTimings();
								}
							}}
							className="cursor-pointer"
						>
							{!timerScheduler.started ? "Start" : "Lap"}
						</p>
					</div>

					{/* Stop timer */}
					<div
						className={`cursor-pointer ${
							startedOnce ? "block" : "hidden"
						}`}
						onClick={() => {
							// block for stopping the timer
							if (
								timerScheduler.started === true &&
								timerScheduler.stopped === false
							) {
								setTimerScheduler({
									started: false,
									stopped: true,
								});
								setLaps((prev) => {
									const lapArray = [
										...prev,
									] as React.ReactElement[];
									const lastIdx = lapArray.length - 1;
									lapArray[lastIdx] = React.cloneElement(
										lapArray[lastIdx],
										{ start: false }
									);
									return lapArray;
								});
								// block for reset
							} else {
								setLaps([]);
								setTimer({ hours: 0, minutes: 0, seconds: 0 });
								setStartedOnce(false);
							}
						}}
					>
						{!timerScheduler.stopped ? "Stop" : "Reset"}
					</div>
				</div>

				{/* Lap part */}
				<div className="flex flex-col-reverse gap-5">
					<LapWrapper>{lapsCont}</LapWrapper>
					{/* <Lap /> */}
				</div>
			</div>
		</>
	);
}

export default App;
