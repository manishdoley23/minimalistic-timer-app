import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/auth.provider.tsx";

import App from "./App.tsx";
import Timer from "./pages/timer/Timer.tsx";
import Signup from "./pages/auth/signup/Signup.tsx";
import Login from "./pages/auth/login/Login.tsx";
import Welcome from "./pages/welcome/Welcome.tsx";

import RequireAuth from "./layout/RequireAuth.tsx";
import PersistAuth from "./layout/PersistAuth.tsx";

import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/time",
		element: <Timer />,
	},
	{
		path: "/auth",
		children: [
			{
				path: "signup",
				element: <Signup />,
			},
			{
				path: "login",
				element: <Login />,
			},
		],
	},
	{
		element: <PersistAuth />,
		children: [
			{
				element: <RequireAuth />,
				children: [
					{
						path: "/welcome",
						element: <Welcome />,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
