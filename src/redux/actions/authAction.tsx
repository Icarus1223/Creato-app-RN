import { SET_USER } from "../actionTypes";
import { store } from "../store";
import { storage } from "../../utils/storage";

export const LogOut = async (navigation) => {
	try {
		await storage.removeItem("accessToken");
		store.dispatch({ type: SET_USER, payload: null });
		navigation.navigate('Home');
	} catch (err) {
		console.log(err)
	}
}