import { useEffect, useState } from "react";

function App() {
	const [startedOnce, setStartedOnce] = useState(false);
	const [timerScheduler, setTimerScheduler] = useState<{
		started: boolean;
		stopped: boolean;
	}>({
		started: false,
		stopped: true,
	});
	const [lapTimings, setLapTimings] = useState<
		Array<{ id: number; data: string }>
	>([]);

	const [timer, setTimer] = useState<{
		seconds: number;
		minutes: number;
		hours: number;
	}>({
		seconds: 0,
		minutes: 0,
		hours: 0,
	});

	const handleLapTimings = () => {
		setLapTimings((prev) => {
			const idx = Math.ceil(Math.random() * 1000);
			prev.push({
				id: idx,
				data: `${timer.hours} : ${timer.minutes} : ${timer.seconds}`,
			});
			return prev;
		});
	};

	useEffect(() => {
		let intervalIdsec: number;
		if (timerScheduler.started === true) {
			setStartedOnce(true);
			if (timer.seconds === 60) {
				setTimer((prev) => ({
					...prev,
					seconds: 0,
					minutes: prev.minutes + 1,
				}));
			} else if (timer.minutes === 60) {
				setTimer((prev) => ({
					minutes: 0,
					seconds: 0,
					hours: prev.hours + 1,
				}));
			}

			intervalIdsec = setInterval(() => {
				setTimer((prev) => ({
					...prev,
					seconds: prev.seconds + 1,
				}));
			}, 1);

			return () => {
				clearInterval(intervalIdsec);
			};
		} else {
			return () => {
				clearInterval(intervalIdsec);
			};
		}
	}, [timer.hours, timer.minutes, timer.seconds, timerScheduler]);

	return (
		<>
			<div className="h-screen w-full flex flex-col items-center justify-center">
				<div>
					{timer.hours} : {timer.minutes} : {timer.seconds}
				</div>
				<div className="flex gap-5">
					<div
						onClick={() => {
							if (
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
							} else {
								setLapTimings([]);
								setTimer({ hours: 0, minutes: 0, seconds: 0 });
							}
						}}
					>
						{!timerScheduler.stopped ? "Stop" : "Reset"}
					</div>
				</div>

				{/* Lap timings */}
				<div className="flex flex-col gap-5">
					{lapTimings.map((val) => {
						return <p key={val.id}>{val.data}</p>;
					})}
				</div>
			</div>
		</>
	);
}

export default App;
