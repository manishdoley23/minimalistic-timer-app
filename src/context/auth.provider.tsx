import { createContext, useState } from "react";

type User = {
	accessToken: string;
	password: string;
	email: string;
};
type AuthContextType = {
	setUser: (user: User | null) => void;
	user: User | null;
};

export const AuthContext = createContext<AuthContextType>({
	setUser: () => {},
	user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	return (
		<AuthContext.Provider value={{ setUser, user }}>
			{children}
		</AuthContext.Provider>
	);
};
