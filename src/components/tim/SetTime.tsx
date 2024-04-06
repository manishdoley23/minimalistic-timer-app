import { useState } from "react";

import { useTime } from "../../hooks/time.hook";

import TimerInput from "../ui/TimerInput/TimerInput";

const SetTime = () => {
	const { setStarted, setTime } = useTime();
	const [countDown, setCountDown] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	const startTimer = () => {
		if (
			countDown.hours === 0 &&
			countDown.minutes === 0 &&
			countDown.seconds === 0
		)
			return;
		setStarted(true);
		setTime(countDown);
	};

	return (
		<div className="flex flex-col items-start">
			<div className="flex w-full justify-between py-1 rounded-md">
				<TimerInput
					label="Hours"
					maxLimit={23}
					setTime={(hours) =>
						setCountDown((prev) => ({
							...prev,
							hours,
						}))
					}
				/>
				<TimerInput
					label="Minutes"
					maxLimit={59}
					setTime={(minutes) =>
						setCountDown((prev) => ({
							...prev,
							minutes,
						}))
					}
				/>
				<TimerInput
					label="Seconds"
					maxLimit={59}
					setTime={(seconds) =>
						setCountDown((prev) => ({
							...prev,
							seconds,
						}))
					}
				/>
			</div>
			<button
				className="px-3 py-1 mt-2 h-10 w-24 bg-black/75 text-white rounded-md text-sm whitespace-nowrap"
				onClick={startTimer}
			>
				Start Timer
			</button>
		</div>
	);
};

export default SetTime;
