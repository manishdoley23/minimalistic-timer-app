import { useEffect } from "react";
import { useTimerScheduler } from "../../utils/hooks";

const Lap = ({ topic, start }: { topic: string; start: boolean }) => {
	const { setTimerScheduler, timer } = useTimerScheduler();

	useEffect(() => {
		if (start === true) {
			setTimerScheduler({
				started: true,
				stopped: false,
			});
		} else {
			setTimerScheduler({
				started: false,
				stopped: true,
			});
		}
	}, [start, setTimerScheduler]);

	return (
		<div className="flex gap-5">
			<p>TOPIC: {topic}</p>
			<p>
				{timer.hours} : {timer.minutes} : {timer.seconds}
			</p>
		</div>
	);
};

export default Lap;
