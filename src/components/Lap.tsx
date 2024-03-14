import { useEffect, useState } from "react";
import { useStartTimer } from "../utils/hooks";

const Lap = ({
	idx,
	topicChangeCb,
	lapAddCb,
	topic,
	start,
}: {
	idx: number;
	topicChangeCb: React.Dispatch<{ idz: number; nTopic: string }>;
	lapAddCb: React.Dispatch<{
		id: number;
		hours: number;
		minutes: number;
		seconds: number;
	}>;
	topic: string;
	start: boolean;
}) => {
	// const { setTimerScheduler } = useTimerScheduler();
	const [newTopic, setNewTopic] = useState(topic);
	const newTime = useStartTimer(start);

	const onTopicChange = () => topicChangeCb({ idz: idx, nTopic: newTopic });
	useEffect(() => {
		if (start === false) {
			lapAddCb({
				id: idx,
				hours: newTime.hours,
				minutes: newTime.minutes,
				seconds: newTime.seconds,
			});
		}
	}, [start]);

	// useEffect(() => {
	// 	if (start === true) {
	// 		setTimerScheduler({
	// 			started: true,
	// 			stopped: false,
	// 		});
	// 	} else {
	// 		setTimerScheduler({
	// 			started: false,
	// 			stopped: true,
	// 		});
	// 	}
	// }, [start, setTimerScheduler]);

	return (
		<div className="flex gap-5">
			<p>
				TOPIC:{" "}
				<input
					value={newTopic}
					onChange={(e) => setNewTopic(e.currentTarget.value)}
				/>
				<button onClick={onTopicChange}>Change topic</button>
				{/* useContext or useRef for changing the topic from the child ?? */}
			</p>
			<p>
				{newTime.hours} : {newTime.minutes} : {newTime.seconds}
			</p>
		</div>
	);
};

export default Lap;
