import React from "react";

export default function ({ text, func }) {
	return (
		<button
			className="px-8 py-4 rounded-md border-[2px] border-blue-400 border-solid blueShadow duration-200"
			onClick={func}>
			<p>{text}</p>
		</button>
	);
}
