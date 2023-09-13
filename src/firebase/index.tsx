import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const GoogleLogin = async (isNewUser, user) => {
	const userRef = firestore().collection('users');
	if(isNewUser) {
		await userRef.add({
	    email: user.email,
	    name: user.displayName,
	    avatar: user.photoURL,
	    balance: 1000
		});
	}

	const authUser = await getUserByEmail(user.email);
  return authUser;
}

export const getUserByEmail = async (email) => {
	const userRef = firestore().collection('users');
	const authUserSnapshot = await userRef.where('email', '==', email).get();
    
  if(authUserSnapshot.empty) {
    return null;
  }
    
  const authUser = authUserSnapshot.docs[0].data();
  return { id: authUserSnapshot.docs[0].id, ...authUser };
}

const UploadFile = async (url) => {
	const filename = url.substring(url.lastIndexOf('/') + 1);
  const storageRef = storage().ref(`images/${Date.now()}-${filename}`);
  await storageRef.putFile(url);
  const firestoreUrl = await storageRef.getDownloadURL();
  return firestoreUrl;
}

export const CreateDareMe = async (newDareme) => {
	const uploadFuncs = []
	if(newDareme.photos[0]) {
		uploadFuncs.push(UploadFile(newDareme.photos[0]));
	}
	if(newDareme.photos[1]) {
		uploadFuncs.push(UploadFile(newDareme.photos[1]));
	}

	newDareme.photos = await Promise.all(uploadFuncs);

	const dareme = {
		...newDareme,
		createdAt: Date.now()
	}

	const daremeRef = firestore().collection('daremes');
	await daremeRef.add(dareme);
}

export const GetAllDareMes = async () => {
	const daremeRef = firestore().collection('daremes');
	const daremeSnapshot = await daremeRef.get();

	if(daremeSnapshot.empty) {
		return [];
	}

	const daremesPromises = await daremeSnapshot.docs.map(async(doc) => {
		const daremeId = doc.id;
		const data = doc.data();
		const userRef = firestore().collection('users');
		const userSnapshot = await userRef.doc(data.owner).get();

		if(userSnapshot.empty) {
			data.owner = null
		} else {
			data.owner = { id: userSnapshot.id, ...userSnapshot.data() }
		}

		return { id: daremeId, ...data };
	})

	const daremes = await Promise.all(daremesPromises);
	return daremes;
}

export const GetDareMesByUser = async (userId) => {
	const daremeRef = firestore().collection('daremes');
	const daremeSnapshot = await daremeRef.where('owner', '==', userId).get();

	if(daremeSnapshot.empty) {
		return [];
	}

	const daremesPromises = await daremeSnapshot.docs.map(async(doc) => {
		const daremeId = doc.id;
		const data = doc.data();
		const userRef = firestore().collection('users');
		const userSnapshot = await userRef.doc(data.owner).get();

		if(userSnapshot.empty) {
			data.owner = null
		} else {
			data.owner = { id: userSnapshot.id, ...userSnapshot.data() }
		}

		return { id: daremeId, ...data };
	})

	const daremes = await Promise.all(daremesPromises);
	return daremes;
}

export const GetDareMeById = async (daremeId) => {
	const daremeRef = firestore().collection('daremes');
	const daremeSnapshot = await daremeRef.doc(daremeId).get();

	if(daremeSnapshot.empty) {
		return null;
	}

	const data = daremeSnapshot.data();
	const userRef = firestore().collection('users');
	const userSnapshot = await userRef.doc(data.owner).get();

	if(userSnapshot.empty) {
		data.owner = null
	} else {
		data.owner = { id: userSnapshot.id, ...userSnapshot.data() }
	}

	return { id: daremeId, ...data };
}