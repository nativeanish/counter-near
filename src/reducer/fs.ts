import { increment, decrement } from "../utils/init";
type ActionType = { type: "increment" } | { type: "decrement" };
export async function reducer(state: Promise<number>, action: ActionType) {
	switch (action.type) {
		case "increment":
			return await increment();
		case "decrement":
			return await decrement();
		default:
			return state;
	}
}
