import { useContext, useEffect, useState } from "react";
import { TimeContext, TimeType } from "../context/time.provider";

export const useTime = () => useContext(TimeContext);

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

export const useStartTimer = () => {
	const { time, started } = useTime();
	const [newTime, setNewTime] = useState(time);

	useEffect(() => {
		setNewTime(time);
	}, [time]);

	useEffect(() => {
		if (started === true) {
			if (
				newTime.hours === 0 &&
				newTime.minutes === 0 &&
				newTime.seconds === 0
			) {
				return;
			}

			if (newTime.seconds === 0 && newTime.minutes === 0) {
				console.log("here 1");
				console.log(
					"newtime inside the useEffect hook:",
					newTime.hours
				);
				setNewTime((prev) => {
					if (prev.hours > 0) {
						return {
							hours: prev.hours - 1,
							minutes: 59,
							seconds: 59,
						};
					} else {
						return {
							hours: 0,
							minutes: 0,
							seconds: 0,
						};
					}
				});
			} else if (newTime.seconds === 0) {
				console.log("here 2");
				setNewTime((prev) => {
					if (prev.minutes > 0) {
						return {
							hours: prev.hours,
							minutes: prev.minutes - 1,
							seconds: 59,
						};
					} else {
						return {
							hours: 0,
							minutes: 0,
							seconds: 0,
						};
					}
				});
			}
			const interval = setInterval(() => {
				console.log("here 3");
				setNewTime((prev) => ({
					...prev,
					seconds: prev.seconds - 1,
				}));
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [started, newTime]);

	return newTime;
};

export const useStartStopWatch = (started: boolean) => {
	const [newTime, setNewTime] = useState<TimeType>({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		if (started === true) {
			if (newTime.minutes === 60) {
				setNewTime((prev) => ({
					hours: prev.hours + 1,
					minutes: 0,
					seconds: 0,
				}));
			} else if (newTime.seconds === 60) {
				setNewTime((prev) => ({
					...prev,
					minutes: prev.minutes + 1,
					seconds: 0,
				}));
			}

			const interval = setInterval(() => {
				setNewTime((prev) => ({
					...prev,
					seconds: prev.seconds + 1,
				}));
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [newTime.seconds, newTime.minutes, newTime.hours, started]);

	return newTime;
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
		let intervalIdsec: NodeJS.Timeout;
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
