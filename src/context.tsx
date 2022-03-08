import * as React from "react";
import { reducer } from "./reducer/fs";
import { state } from "./utils/init";
interface AppContextInterface {
	states: Promise<number>;
	dispatch: ({ type: string }) => void;
}
export const AppCtx = React.createContext<AppContextInterface | null>(null);
const Context = ({ children }: { children: React.ReactNode }) => {
	const [states, dispatch] = React.useReducer(reducer, state());
	return (
		<>
			<AppCtx.Provider value={{ states, dispatch }}>
				{children}
			</AppCtx.Provider>
		</>
	);
};
export default Context;
