import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import Timer from "./pages/timer/Timer.tsx";
import Signup from "./pages/auth/signup/Signup.tsx";
import Login from "./pages/auth/login/Login.tsx";
import { AuthProvider } from "./context/auth.provider.tsx";
import RequireAuth from "./layout/RequireAuth.tsx";

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
		// element: <RequireAuth />,
		children: [
			{
				path: "/auth/signup",
				element: <Signup />,
			},
			{
				path: "/auth/login",
				element: <Login />,
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
