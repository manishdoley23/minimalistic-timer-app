import { useDate } from "../hooks/time.hook";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

const Date = () => {
	const { date, time } = useDate();
	return (
		<CardContainer>
			<CardBody className="bg-black/75 rounded-md text-white">
				<CardItem>
					<div className="flex flex-col gap-5 items-center">
						<p>{date}</p>
						<p className="text-2xl">{time}</p>
					</div>
				</CardItem>
			</CardBody>
		</CardContainer>
	);
};

export default Date;
