import React, { useEffect, useState } from "react";
import * as near from "./utils/init";
import { AppCtx } from "./context";
const Counter = () => {
	const holder = React.useContext(AppCtx);
	const [account, setAccount] = useState<String | false>(false);
	const check = async () => {
		const token = await near.checkSign();
		if (token) {
			setAccount(token);
		}
	};
	const signin = async () => {
		await near.signin();
	};
	const signout = async () => {
		await near.sign_out();
		setAccount(false);
	};
	useEffect(() => {
		check().then().catch();
		make_state();
	}, [account]);
	const [num, setNum] = useState<number | null>(null);
	const make_state = () => {
		holder.states
			.then((e) => setNum(e))
			.catch((err) => console.log(err));
	};
	return (
		<>
			{account ? (
				<>
					<h1>Hello {account}</h1>
					<button onClick={signout}>
						logout
					</button>
					<br />
					<h1></h1>
					<button
						onClick={() =>
							holder.dispatch({
								type: "increment",
							})
						}
					>
						+
					</button>
					<h1>{num}</h1>
					<button
						onClick={() =>
							holder.dispatch({
								type: "decrement",
							})
						}
					>
						-
					</button>
				</>
			) : (
				<button onClick={signin}>lOGIN</button>
			)}
		</>
	);
};
export default Counter;
