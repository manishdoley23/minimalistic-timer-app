import { createContext, useState } from "react";
import { TimeType } from "../types";

type TimeContextType = {
	started: boolean;
	timerTime: TimeType;
	timerTimeBlock: TimeType[];
	stopWatchTime: TimeType;
	stopWatchTimeBlock: TimeType[];
	setStarted: (bool: boolean) => void;
	setTimerTime: (timerTime: TimeType) => void;
	setTimerTimeBlock: (timerTimeBlock: TimeType[]) => void;
	setStopWatchTime: (stopWatch: TimeType) => void;
	setStopWatchTimeBlock: (stopWatchTimeBlock: TimeType[]) => void;
};

export const TimeContext = createContext<TimeContextType>({
	started: false,
	timerTime: { hours: 0, minutes: 0, seconds: 0 },
	timerTimeBlock: [],
	stopWatchTime: { hours: 0, minutes: 0, seconds: 0 },
	stopWatchTimeBlock: [],
	setStarted: () => {},
	setTimerTime: () => {},
	setTimerTimeBlock: () => {},
	setStopWatchTime: () => {},
	setStopWatchTimeBlock: () => {},
});

const getStopWatchTimeFromLocalStorage = (): TimeType => {
	const stopWatchTime = localStorage.getItem("stopWatchTime");
	if (stopWatchTime === null) return { hours: 0, minutes: 0, seconds: 0 };
	else return JSON.parse(stopWatchTime);
};
const TimeProvider = ({ children }: { children: React.ReactNode }) => {
	const [started, setStarted] = useState(true);
	const [timerTime, setTimerTime] = useState<TimeType>({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [stopWatchTime, setStopWatchTime] = useState<TimeType>(
		getStopWatchTimeFromLocalStorage()
	);
	const [timerTimeBlock, setTimerTimeBlock] = useState<TimeType[]>([]);
	const [stopWatchTimeBlock, setStopWatchTimeBlock] = useState<TimeType[]>(
		[]
	);

	return (
		<TimeContext.Provider
			value={{
				started,
				timerTime,
				timerTimeBlock,
				stopWatchTime,
				stopWatchTimeBlock,
				setStarted,
				setTimerTime,
				setTimerTimeBlock,
				setStopWatchTime,
				setStopWatchTimeBlock,
			}}
		>
			{children}
		</TimeContext.Provider>
	);
};

export default TimeProvider;
