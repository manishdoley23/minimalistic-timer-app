import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthProvider from "./context/auth.provider.tsx";
import TimeProvider from "./context/time.provider.tsx";

import App from "./App.tsx";
import Signup from "./pages/auth/signup/Signup.tsx";
import Login from "./pages/auth/login/Login.tsx";
import Welcome from "./pages/welcome/Welcome.tsx";
import Tim from "./pages/tim/Tim.tsx";

import RequireAuth from "./layout/RequireAuth.tsx";
import PersistAuth from "./layout/PersistAuth.tsx";

import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/tim",
		element: <Tim />,
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
			<TimeProvider>
				<RouterProvider router={router} />
			</TimeProvider>
		</AuthProvider>
	</React.StrictMode>
);
