import firestore from '@react-native-firebase/firestore';

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
  return authUser;
}