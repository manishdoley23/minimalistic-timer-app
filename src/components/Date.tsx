import { useDate } from "../utils/hooks";

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
