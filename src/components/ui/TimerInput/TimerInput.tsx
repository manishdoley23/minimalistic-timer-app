import { useState } from "react";

const TimerInput = (props: {
	label: string;
	maxLimit: number;
	setTime: (time: number) => void;
}) => {
	const [showInputError, setShowInputError] = useState("");

	return (
		<div className="flex flex-col items-start">
			<div className="flex items-center gap-2">
				<input
					className="w-[30px] px-1 py-0.5 focus:outline-none border border-black rounded-md"
					type="text"
					maxLength={2}
					min={0}
					onChange={(e) => {
						const input = e.target.value;
						const inputNumber = parseInt(input);
						if (isNaN(inputNumber)) {
							setShowInputError("Please enter a valid number");
						} else if (
							inputNumber > props.maxLimit ||
							inputNumber < 0
						) {
							setShowInputError(
								`Please enter a number between 0 and ${props.maxLimit}`
							);
						} else {
							setShowInputError("");
							props.setTime(inputNumber);
						}
					}}
				/>
				<label>{props.label}</label>
			</div>
			{showInputError && (
				<div className="text-xs text-red-500 whitespace-nowrap w-[60px]">
					{showInputError}
				</div>
			)}
		</div>
	);
};

export default TimerInput;
