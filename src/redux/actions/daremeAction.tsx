import * as Firebase from "../../firebase";
import { SET_OPTION, SET_DAREMES, SET_DAREME, SET_DAREME_INITIAL } from "../actionTypes";
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

export const GetDareMeById = async (daremeId) => {
	try {
		store.dispatch({ type: SET_DAREME_INITIAL });
		const dareme = await Firebase.GetDareMeById(daremeId);
		if(dareme) {
			store.dispatch({ type: SET_DAREME, payload: dareme });
		}
	} catch (err) {
		console.log(err);
	}
}

export const VoteDareMe = async (daremeId, optionIndex, voterId, amount) => {
	try {
		const updatedOption = await Firebase.VoteDareOption(daremeId, optionIndex, voterId, amount);
		if(updatedOption) {
			store.dispatch({ type: SET_OPTION, payload: updatedOption });
		}
	} catch (err) {
		console.log(err)
	}
}