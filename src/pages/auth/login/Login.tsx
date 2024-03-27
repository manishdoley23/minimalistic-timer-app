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
					body: JSON.stringify(formData),
				}
			);

			console.log("response:", response);
			const { message } = await response.json();
			if (response.ok) {
				console.log("Success");
				toast(message);
				login("logged in");
				setTimeout(() => {
					navigate("/time");
				}, 5000);
			} else {
				toast(message);
				console.error("Error in response");
			}
		} catch (error) {
			console.log("error in signup:", error);
			throw error;
		}
	};

	return (
		<div className="h-screen w-screen flex items-center justify-center">
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
			<form onSubmit={onSubmitHandler}>
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
		</div>
	);
};

export default Login;
