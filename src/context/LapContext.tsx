import React from "react";
import { createContext } from "react";

export const LapContext = createContext<React.ReactNode[]>([]);

export const LapWrapper = ({ children }: { children: React.ReactNode }) => {
	return <LapContext.Provider value={[]}>{children}</LapContext.Provider>;
};
