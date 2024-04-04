import { useState } from "react";
import { useTime } from "../../hooks/time.hook";
import clsx from "clsx";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const SECONDS = Array.from({ length: 60 }, (_, i) => i);

const SetTime = () => {
	const { setStarted, setTime } = useTime();
	const [countDown, setCountDown] = useState<{
		hours: number;
		minutes: number;
		seconds: number;
	}>({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	const handleHourHover = (hour: number) => {
		setCountDown((prev) => ({
			...prev,
			hours: hour,
		}));
	};

	const handleMinuteHover = (minute: number) => {
		setCountDown((prev) => ({
			...prev,
			minutes: minute,
		}));
	};

	const handleSecondHover = (second: number) => {
		setCountDown((prev) => ({
			...prev,
			seconds: second,
		}));
	};

	const startTimer = () => {
		setStarted(true);
		setTime(countDown);
	};

	return (
		<>
			<div className="w-full flex">
				<div className="flex flex-col w-1/3">
					<label>Hours</label>
					<div className="overflow-y-auto">
						<select
							size={HOURS.length}
							className="no-scrollbar"
							value={countDown.hours}
							onChange={(e) =>
								setCountDown((prev) => ({
									...prev,
									hours: parseInt(e.target.value),
								}))
							}
						>
							{HOURS.map((hour) => (
								<option
									key={hour}
									// className={clsx(
									// 	"p-2 pl-5",
									// 	hour > 9 && "pl-3",
									// 	selectedHour === hour
									// 		? "transform scale-150"
									// 		: "filter text-gray-400",
									// 	"transition-all duration-250"
									// )}
									onMouseEnter={() => handleHourHover(hour)}
								>
									{hour}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="flex flex-col w-1/3">
					<label>Minutes</label>
					<select
						size={HOURS.length}
						className="h-auto overflow-y-scroll"
						value={countDown.minutes}
						onChange={(e) =>
							setCountDown((prev) => ({
								...prev,
								minutes: parseInt(e.target.value),
							}))
						}
					>
						{MINUTES.map((minute) => (
							<option
								key={minute}
								className={clsx(
									"hover:bg-gray-200",
									countDown.minutes === minute
										? "bg-gray-200"
										: ""
								)}
								onMouseEnter={() => handleMinuteHover(minute)}
							>
								{minute}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col w-1/3">
					<label>Seconds</label>
					<select
						size={HOURS.length}
						className="h-auto overflow-y-scroll"
						value={countDown.seconds}
						onChange={(e) =>
							setCountDown((prev) => ({
								...prev,
								seconds: parseInt(e.target.value),
							}))
						}
					>
						{SECONDS.map((second) => (
							<option
								key={second}
								className={clsx(
									"hover:bg-gray-200",
									countDown.seconds === second
										? "bg-gray-200"
										: ""
								)}
								onMouseEnter={() => handleSecondHover(second)}
							>
								{second}
							</option>
						))}
					</select>
				</div>
			</div>
			<button onClick={startTimer}>CLICK TO SAVE</button>
		</>
	);
};

export default SetTime;
