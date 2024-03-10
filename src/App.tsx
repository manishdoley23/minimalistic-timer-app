import React from "react";
import { useState } from "react";
import { useDate, useTimerScheduler } from "./utils/hooks";

import Lap from "./components/Lap/Lap";

function App() {
	const { date, time } = useDate();
	const [topicVal, setTopicVal] = useState("");
	const {
		timerScheduler,
		setTimerScheduler,
		timer,
		setTimer,
		startedOnce,
		setStartedOnce,
	} = useTimerScheduler();

	const [laps, setLaps] = useState<React.ReactNode[]>([]);

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
			lapArray.push(<Lap key={idx} start={true} />);
			return lapArray;
		});
	};

	return (
		<>
			<div className="h-screen w-full flex flex-col items-center justify-center">
				<p>
					{date}, {time}
				</p>
				<div>
					{timer.hours} : {timer.minutes} : {timer.seconds}
				</div>
				<div className="flex gap-5">
					<div className="flex">
						<p className="mr-5">
							Topic:{" "}
							<input
								className="bg-gray-200"
								value={topicVal}
								onChange={(e) =>
									setTopicVal(e.currentTarget.value)
								}
							/>{" "}
						</p>
						<p
							onClick={() => {
								if (
									timerScheduler.started === false &&
									timerScheduler.stopped === true &&
									startedOnce === false
								) {
									setTimerScheduler({
										started: true,
										stopped: false,
									});
									laps.push(<Lap key={1} start={true} />);
								} else if (
									timerScheduler.started === false &&
									timerScheduler.stopped === true
								) {
									setTimerScheduler({
										started: true,
										stopped: false,
									});
								} else {
									handleLapTimings();
								}
							}}
							className="cursor-pointer"
						>
							{!timerScheduler.started ? "Start" : "Lap"}
						</p>
					</div>
					<div
						className={`cursor-pointer ${
							startedOnce ? "block" : "hidden"
						}`}
						onClick={() => {
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
					{laps}
					{/* <Lap /> */}
				</div>
			</div>
		</>
	);
}

export default App;
