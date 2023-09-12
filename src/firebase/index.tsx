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
	if(newDareme.photos[0]) {
		newDareme.photos[0] = await UploadFile(newDareme.photos[0]);
	}
	if(newDareme.photos[1]) {
		newDareme.photos[1] = await UploadFile(newDareme.photos[1]);
	}

	const dareme = {
		...newDareme,
		createdAt: Date.now()
	}

	const daremeRef = firestore().collection('daremes');
	await daremeRef.add(dareme);
}