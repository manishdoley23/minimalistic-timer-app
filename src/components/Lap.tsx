import { useEffect, useState } from "react";
import { useTimerScheduler } from "../utils/hooks";

const Lap = ({ topic, start }: { topic?: string; start: boolean }) => {
	const { setTimerScheduler, timer } = useTimerScheduler();
	const [newTopic, setNewTopic] = useState(topic);

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
			<p>
				TOPIC:{" "}
				<input
					value={newTopic}
					onChange={(e) => setNewTopic(e.currentTarget.value)}
				/>
				{/* useContext or useRef for changing the topic from the child ?? */}
			</p>
			<p>
				{timer.hours} : {timer.minutes} : {timer.seconds}
			</p>
		</div>
	);
};

export default Lap;
