import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";

const RequireAuth = () => {
	const { user } = useAuth();
	const location = useLocation();

	return (
		<div>
			<p>Hello</p>
			{!user?.accessToken ? (
				<Outlet />
			) : (
				<Navigate
					to={"/auth/login"}
					state={{ from: location }}
					replace
				/>
			)}
		</div>
	);
};

export default RequireAuth;
