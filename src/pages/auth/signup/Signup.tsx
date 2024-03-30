import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND}/auth/signup`,
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
				toast(message);
				console.log("Success");
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
		<div className="h-screen w-full flex justify-center items-center">
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
			<form className="flex flex-col gap-2" onSubmit={onSubmitHandler}>
				<header>Sign up page</header>
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
				<button onClick={() => navigate("/auth/login")}>GO TO LOGIN</button>
			</form>
		</div>
	);
};

export default Signup;
