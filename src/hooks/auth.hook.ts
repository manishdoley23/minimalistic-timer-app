import { useContext } from "react";
import { AuthContext } from "../context/auth.provider";

export const useAuth = () => useContext(AuthContext);

export const useRefreshToken = () => {
	const { user, setUser } = useAuth();

	const refresh = async () => {
		const res = await (
			await fetch(`${import.meta.env.VITE_BACKEND}/auth/refresh-token`, {
				credentials: "include",
			})
		).json();

		// setUser((prev: User | null) => ({
		// 	...prev,
		// 	accessToken: res.accessToken,
		// }));

		setUser({
			accessToken: res.accessToken,
			email: user?.email ?? "",
			password: user?.password ?? "",
		});
		return res.accessToken;
	};

	return refresh;
};
