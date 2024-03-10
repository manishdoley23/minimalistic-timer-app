import { useEffect } from "react";
import { useTimerScheduler } from "../../utils/hooks";

const Lap = ({ start }: { start: boolean }) => {
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
		<div>
			{timer.hours} : {timer.minutes} : {timer.seconds}
		</div>
	);
};

export default Lap;
