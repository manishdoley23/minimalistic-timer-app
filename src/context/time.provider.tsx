import { createContext, useEffect, useState } from "react";

export type TimeType = {
	hours: number;
	minutes: number;
	seconds: number;
};

type TimeContextType = {
	started: boolean;
	setStarted: (bool: boolean) => void;
	time: {
		hours: number;
		minutes: number;
		seconds: number;
	};
	setTime: (val: TimeType) => void;
};

export const TimeContext = createContext<TimeContextType>({
	started: false,
	setStarted: () => {},
	setTime: () => {},
	time: {
		hours: 0,
		minutes: 0,
		seconds: 0,
	},
});

const TimeProvider = ({ children }: { children: React.ReactNode }) => {
	const [started, setStarted] = useState(false);
	const [time, setTime] = useState<TimeType>({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	console.log("time in context:", time);

	// console.log("ran");

	// useEffect(() => {
	// 	setTime(time);
	// }, [time, started]);

	return (
		<TimeContext.Provider value={{ started, setStarted, time, setTime }}>
			{children}
		</TimeContext.Provider>
	);
};

export default TimeProvider;
