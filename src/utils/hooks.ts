import { useEffect, useState } from "react";

export const useDate = (): { date: string; time: string } => {
	const [stateDate, setStateDate] = useState<Date>(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setStateDate(new Date());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const date = stateDate.toDateString();
	const time = stateDate.toLocaleTimeString();

	return { date, time };
};

export const useTimerScheduler = (): {
	timerScheduler: { started: boolean; stopped: boolean };
	setTimerScheduler: React.Dispatch<
		React.SetStateAction<{ started: boolean; stopped: boolean }>
	>;
	timer: {
		seconds: number;
		minutes: number;
		hours: number;
	};
	setTimer: React.Dispatch<
		React.SetStateAction<{
			seconds: number;
			minutes: number;
			hours: number;
		}>
	>;
	startedOnce: boolean;
	setStartedOnce: React.Dispatch<React.SetStateAction<boolean>>;
} => {
	const [startedOnce, setStartedOnce] = useState<boolean>(false);
	const [timerScheduler, setTimerScheduler] = useState<{
		started: boolean;
		stopped: boolean;
	}>({
		started: false,
		stopped: true,
	});
	const [timer, setTimer] = useState<{
		seconds: number;
		minutes: number;
		hours: number;
	}>({
		seconds: 0,
		minutes: 0,
		hours: 0,
	});

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
			}, 1000);

			return () => {
				clearInterval(intervalIdsec);
			};
		} else {
			return () => {
				clearInterval(intervalIdsec);
			};
		}
	}, [timer.hours, timer.minutes, timer.seconds, timerScheduler]);

	return {
		timerScheduler,
		setTimerScheduler,
		timer,
		setTimer,
		startedOnce,
		setStartedOnce,
	};
};
