import { useStartTimer } from "../../hooks/time.hook";

const Counter = () => {
	const time = useStartTimer();
	return (
		<div>
			{time.hours} : {time.minutes} : {time.seconds}
		</div>
	);
};

export default Counter;
