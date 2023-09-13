import * as Firebase from "../../firebase";
import { SET_DAREMES, SET_LOADING } from "../actionTypes";
import { store } from "../store";

export const GetAllDareMes = async () => {
	try {
		store.dispatch({ type: SET_DAREMES, payload: [] });
		const daremes = await Firebase.GetAllDareMes();
		store.dispatch({ type: SET_DAREMES, payload: daremes });
	} catch (err) {
		console.log(err)
	}
}

export const GetDareMesByUser = async (userId) => {
	try {
		store.dispatch({ type: SET_DAREMES, payload: [] });
		const daremes = await Firebase.GetDareMesByUser(userId);
		store.dispatch({ type: SET_DAREMES, payload: daremes });
	} catch (err) {
		console.log(err);
	}
}