import React from "react";
import { createContext } from "react";

export const LapContext = createContext<{ topic: string; start: boolean }>({
	topic: "",
	start: false,
});

export const LapProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<LapContext.Provider value={{ topic: "", start: false }}>
			{children}
		</LapContext.Provider>
	);
};
