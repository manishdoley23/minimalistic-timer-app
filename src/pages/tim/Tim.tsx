import CountDown from "../../components/CountDown";

const Tim = () => {
	return (
		<div className="h-screen w-full flex items-center">
			<div className="w-[50%] bg-gray-400 px-10">
				<CountDown />
			</div>
			<div className="w-[50%] bg-blue-400">Stopwatch</div>
		</div>
	);
};

export default Tim;
