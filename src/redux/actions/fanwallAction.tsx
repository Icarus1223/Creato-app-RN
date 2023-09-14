import * as Firebase from "../../firebase";
import { SET_FANWALL, SET_FANWALLS } from "../actionTypes";
import { store } from "../store";

export const CreateFanwall = async (daremeId, userId, photo) => {
	try {
		await Firebase.PostFanwall(daremeId, userId, photo);
	} catch (err) {
		console.log(err)
	}
}

export const GetFanwallByDareMeId = async (daremeId) => {
	try {
		store.dispatch({ type: SET_FANWALL, payload: null });
		const fanwall = await Firebase.GetFanwallByDareMeId(daremeId);
		store.dispatch({ type: SET_FANWALL, payload: fanwall });
	} catch (err) {
		console.log(err)
	}
}

export const GetAllFanwalls = async () => {
	try {
		store.dispatch({ type: SET_FANWALLS, payload: [] });
		const fanwalls = await Firebase.GetAllFanwalls();
		store.dispatch({ type: SET_FANWALLS, payload: fanwalls });
	} catch (err) {
		console.log(err)
	}
}

export const GetFanwallsByUser = async (userId) => {
	try {
		store.dispatch({ type: SET_FANWALLS, payload: [] });
		const fanwalls = await Firebase.GetFanwallsByUser(userId);
		store.dispatch({ type: SET_FANWALLS, payload: fanwalls });
	} catch (err) {
		console.log(err)
	}
}