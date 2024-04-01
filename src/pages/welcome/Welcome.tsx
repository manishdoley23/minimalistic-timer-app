import { useAuth } from "../../hooks/auth.hook";

const Welcome = () => {
	const { setUser } = useAuth();

	const logoutHandler = async () => {
		await fetch(`${import.meta.env.VITE_BACKEND}/auth/logout`, {
			credentials: "include",
		});
		setUser({
			accessToken: "",
			email: "",
			password: "",
		});
	};

	return (
		<>
			<div>Welcome page</div>
			<button
				className="border border-black px-3 py-2"
				onClick={logoutHandler}
			>
				Log out
			</button>
		</>
	);
};

export default Welcome;
