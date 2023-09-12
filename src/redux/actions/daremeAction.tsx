import * as Firebase from "../../firebase";
import { SET_DAREMES, SET_LOADING } from "../actionTypes";
import { store } from "../store";

export const GetAllDareMes = async () => {
	try {
		store.dispatch({ type: SET_LOADING, payload: true });
		const daremes = await Firebase.GetAllDareMes();
		store.dispatch({ type: SET_DAREMES, payload: daremes });
		store.dispatch({ type: SET_LOADING, payload: false });
	} catch (err) {
		console.log(err)
	}
}