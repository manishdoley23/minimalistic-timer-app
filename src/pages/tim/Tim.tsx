import Date from "../../components/Date";
import Timer from "../../components/tim/Timer";
import StopWatch from "../../components/tim/StopWatch";
import { useAuth } from "../../hooks/auth.hook";

const Tim = () => {
	const { user } = useAuth();

	return (
		<div className="py-5 px-5">
			{user && (
				<p className="absolute top-10 left-20">
					Welcome, {user.email.split("@")[0]}
				</p>
			)}
			<Date />
			<div className="w-full flex mt-10">
				<div className="w-1/2">
					<Timer />
				</div>

				<div className="w-1/2">
					<StopWatch />
				</div>
			</div>
		</div>
	);
};

export default Tim;
