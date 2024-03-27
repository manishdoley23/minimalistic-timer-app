import { createContext, useState } from "react";

export const AuthContext = createContext<{
	login: (userData: any) => void;
	logout: () => void;
	user: any;
}>({
	login: () => {},
	logout: () => {},
	user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState(null);

	const login = (userData: any) => setUser(userData);

	const logout = () => setUser(null);

	return (
		<AuthContext.Provider value={{ login, logout, user }}>
			{children}
		</AuthContext.Provider>
	);
};
