import { useEffect, useState } from "react";
import { useAuth, useRefreshToken } from "../hooks/auth.hook";
import { Outlet } from "react-router-dom";

const PersistAuth = () => {
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);
	const refresh = useRefreshToken();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (error) {
				throw new Error("Error with persist");
			} finally {
				setLoading(false);
			}
		};

		!user?.accessToken ? verifyRefreshToken() : setLoading(false);
	}, []);

	return <>{!loading ? <Outlet /> : <div>Loading...</div>}</>;
};

export default PersistAuth;
