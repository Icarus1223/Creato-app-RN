import * as Firebase from "../../firebase";
import { SET_FANWALL } from "../actionTypes";
import { store } from "../store";

export const CreateFanwall = async (daremeId, photo) => {
	try {
		await Firebase.PostFanwall(daremeId, photo);
	} catch (err) {
		console.log(err)
	}
}