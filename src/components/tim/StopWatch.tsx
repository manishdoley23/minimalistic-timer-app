import clsx from "clsx";

import { useState } from "react";

import Lap from "../Lap";
import { useTimerScheduler } from "../../hooks/time.hook";
import { TimeType } from "../../types";

interface LapData {
	id: number;
	time: TimeType;
	started: boolean;
	topic: string;
}

function StopWatch() {
	const {
		timerScheduler,
		setTimerScheduler,
		timer,
		setTimer,
		startedOnce,
		setStartedOnce,
	} = useTimerScheduler();

	const [topicVal, setTopicVal] = useState("");
	const [lapsData, setLapsData] = useState<LapData[]>([]);

	const topicChangeHandler = ({
		idz,
		nTopic,
	}: {
		idz: number;
		nTopic: string;
	}) => {
		setLapsData((prev) => {
			const lapsDataArray = [...prev];
			const indexTopic = lapsDataArray.findIndex((lap) => lap.id === idz);
			lapsDataArray[indexTopic].topic = nTopic;
			return lapsDataArray;
		});
	};

	const lapAddHandler = (val: {
		id: number;
		hours: number;
		seconds: number;
		minutes: number;
	}) => {
		setLapsData((prev) => {
			const lapsDataArray = [...prev];
			const lapDataIdx = lapsDataArray.findIndex(
				(lap) => lap.id === val.id
			);
			const { id, ...rest } = val;
			lapsDataArray[lapDataIdx].time = rest;
			return lapsDataArray;
		});
	};

	const addNewLapData = (lapDataArray: LapData[]) => {
		const newLapData: LapData = {
			id: Math.ceil(Math.random() * 1000),
			started: true,
			time: {
				seconds: timer.seconds,
				minutes: timer.minutes,
				hours: timer.hours,
			},
			topic: topicVal,
		};
		lapDataArray.push(newLapData);
		return lapDataArray;
	};

	const handleLapTimings = () => {
		setLapsData((prev) => {
			const lapsDataArray = [...prev];
			const lapsDataArrayIdx = lapsDataArray.length - 1;
			lapsDataArray[lapsDataArrayIdx].started = false;
			localStorage.setItem("Laps", JSON.stringify(lapsDataArray));
			setTopicVal("");
			return addNewLapData(lapsDataArray);
		});
	};

	// console.log("Laps:", lapsData);

	return (
		<>
			<div className="w-full flex flex-col items-center justify-center relative">
				{/* <Date /> */}
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
								if (topicVal === "" && lapsData.length < 1) {
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
									setLapsData(addNewLapData(lapsData));
									setTopicVal("");

									// block for when the timer is in the stop stage and
									// the user presses the start to start the timer back up
								} else if (
									timerScheduler.started === false &&
									timerScheduler.stopped === true
								) {
									setTimerScheduler({
										started: true,
										stopped: false,
									});
									setLapsData((prev) => {
										const lapsDataArray = [...prev];
										const lapsDataArrayIdx =
											lapsDataArray.length - 1;
										lapsDataArray[
											lapsDataArrayIdx
										].started = true;
										return lapsDataArray;
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
								setLapsData((prev) => {
									const lapsDataArray = [...prev];
									const lapsDataLastIdx =
										lapsDataArray.length - 1;
									lapsDataArray[lapsDataLastIdx].started =
										false;
									return lapsDataArray;
								});
								// block for reset
							} else {
								setLapsData([]);
								setTimer({ hours: 0, minutes: 0, seconds: 0 });
								setStartedOnce(false);
								setTopicVal("");
								localStorage.removeItem("Laps");
							}
						}}
					>
						{!timerScheduler.stopped ? "Stop" : "Reset"}
					</div>
				</div>

				{/* Lap part */}
				<div className="flex flex-col-reverse gap-5">
					{lapsData.map((lap) => {
						return (
							<Lap
								key={lap.id}
								idx={lap.id}
								start={lap.started}
								topic={lap.topic}
								topicChangeCb={(val) => topicChangeHandler(val)}
								lapAddCb={(val) => lapAddHandler(val)}
							/>
						);
					})}
					{/* <Lap /> */}
				</div>
			</div>
		</>
	);
}

export default StopWatch;
