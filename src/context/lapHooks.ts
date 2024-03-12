import { useContext } from "react";
import { LapContext } from "./LapContext";

export const useGetLaps = () => {
	console.log("LapContext:", LapContext);
	return useContext(LapContext);
};
