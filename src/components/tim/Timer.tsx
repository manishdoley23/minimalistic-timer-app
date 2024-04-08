import { useEffect, useState } from "react";
import { useTime } from "../../hooks/time.hook";
import Counter from "./Counter";
import SetTime from "./SetTime";
import { TimeType } from "../../types";

type TimerMetaDataType = {
	id: number;
	time: TimeType;
};

const Timer = () => {
	const { started } = useTime();
	const [timerMetaData, setTimerMetaData] = useState<TimerMetaDataType[]>([]);

	useEffect(() => {
		if (started) {
			TimerMetaData.push();
		}
	});

	return (
		<div>
			<SetTime />
			{TimerOutput.map(out)}
			{/* <Counter /> */}
		</div>
	);
};

export default Timer;
