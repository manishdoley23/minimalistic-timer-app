import { TimeType } from "../context/time.provider";
import { useStartTimer } from "../hooks/time.hook";

const Counter = (props: { time: TimeType; started: boolean }) => {
	const time = useStartTimer(props.started, props.time);

	return (
		<div>
			{time.hours} : {time.minutes} : {time.seconds}
		</div>
	);
};

export default Counter;
