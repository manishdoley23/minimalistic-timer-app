import { Link } from "react-router-dom";

const App = () => {
	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<div className="h-[200px] text-3xl flex flex-col items-center justify-center gap-5">
				<Link to={"/auth/signup"}>Signup</Link>
				<Link to={"/time"}>Continue without signing up</Link>
			</div>
		</div>
	);
};

export default App;
