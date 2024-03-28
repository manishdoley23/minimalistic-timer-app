import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../context/auth.provider";

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { user, login } = useContext(AuthContext);
	console.log("user:", user);

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND}/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify(formData),
				}
			);

			console.log("response:", response);
			const { message } = await response.json();
			console.log("message:", message);
			const resHeaders = response.headers;
			console.log("resHeaders:", resHeaders);
			const resHeaderCookie = response.headers.get("Set-Cookie");
			console.log("resHeaderCookie:", resHeaderCookie);

			// if (response.ok) {
			// 	console.log("Success");
			// 	toast(message);
			// 	login("logged in");
			// 	setTimeout(() => {
			// 		navigate("/time");
			// 	}, 5000);
			// } else {
			// 	toast(message);
			// 	console.error("Error in response");
			// }
		} catch (error) {
			console.log("error in signup:", error);
			throw error;
		}
	};

	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center">
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition={Bounce}
			/>
			<form className="flex flex-col" onSubmit={onSubmitHandler}>
				<header>Login page</header>
				<label>Email</label>
				<input
					className="bg-gray-200"
					value={formData.email}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							email: e.target.value,
						}))
					}
				/>

				<label>Password</label>
				<input
					className="bg-gray-200"
					value={formData.password}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							password: e.target.value,
						}))
					}
				/>

				<button>SUBMIT</button>
			</form>
			<button
				onClick={async () => {
					await fetch(`${import.meta.env.VITE_BACKEND}/check`, {
						headers: {
							"Content-type": "application/json",
							Authorization: "Bearer tukka",
						},
					});
				}}
			>
				TEST
			</button>
		</div>
	);
};

export default Login;
