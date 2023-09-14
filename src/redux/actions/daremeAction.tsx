import * as Firebase from "../../firebase";
import { SET_OPTION, SET_DAREMES, SET_DAREME, SET_DAREME_INITIAL, SET_USER } from "../actionTypes";
import { store } from "../store";

export const CreateDareMe = async (dareme) => {
	try {
		await Firebase.CreateDareMe(dareme);
		store.dispatch({ type: SET_DAREME_INITIAL });
	} catch (err) {
		console.log(err)
	}
} 

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

export const VoteDareMe = async (daremeId, optionIndex, user, amount) => {
	try {
		const updatedOption = await Firebase.VoteDareOption(daremeId, optionIndex, user.id, amount);
		if(updatedOption) {
			store.dispatch({ type: SET_OPTION, payload: updatedOption });
			store.dispatch({ type: SET_USER, payload: { ...user, balance: user.balance - amount } });
		}
	} catch (err) {
		console.log(err)
	}
}