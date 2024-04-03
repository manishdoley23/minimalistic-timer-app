import { useDate } from "../hooks/time.hook";

const Date = () => {
	const { date, time } = useDate();
	return (
		<>
			<p>
				{date}, {time}
			</p>
		</>
	);
};

export default Date;
