import { useEffect, useRef } from "react";
import { useTime } from "../../hooks/time.hook";
import { TimeType } from "../../types";

const StopWatchNew = () => {
	const { started, setStopWatchTime, stopWatchTime } = useTime();

	const stopwatchRef = useRef<NodeJS.Timeout | undefined>();
	useEffect(() => {
		window.addEventListener("beforeunload", saveToStorage);
		return () => {
			window.removeEventListener("beforeunload", saveToStorage);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const saveToStorage = (e: BeforeUnloadEvent) => {
		// TODO: set to storage
		e.preventDefault();
		localStorage.setItem("stopWatchTime", JSON.stringify(stopWatchTime));
	};

	useEffect(() => {
		if (started === true) {
			if (stopWatchTime.hours === 24) {
				stopwatchRef.current !== undefined &&
					clearInterval(stopwatchRef.current);
			} else if (stopWatchTime.minutes === 60) {
				setStopWatchTime({
					hours: stopWatchTime.hours + 1,
					minutes: 0,
					seconds: 0,
				});
			} else if (stopWatchTime.seconds === 60) {
				setStopWatchTime({
					hours: stopWatchTime.hours,
					minutes: stopWatchTime.minutes + 1,
					seconds: 0,
				});
			} else {
				stopwatchRef.current = setInterval(() => {
					setStopWatchTime({
						hours: stopWatchTime.hours,
						minutes: stopWatchTime.minutes,
						seconds: stopWatchTime.seconds + 1,
					});
				}, 1000);
			}
		} else if (started === false) {
			stopwatchRef.current !== undefined &&
				clearInterval(stopwatchRef.current);
		}

		return () => {
			stopwatchRef.current !== undefined &&
				clearInterval(stopwatchRef.current);
		};
	}, [started, stopWatchTime, setStopWatchTime]);

	return (
		<div>
			{stopWatchTime.hours} :: {stopWatchTime.minutes} ::{" "}
			{stopWatchTime.seconds}
		</div>
	);
};

export default StopWatchNew;
