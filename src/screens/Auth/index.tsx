import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from "../../utils/AuthContext"
import { SvgXml } from 'react-native-svg';
import { GoogleButtonSvg } from '../../assets/svg';

const AuthScreen = ({ navigation }) => {
	const { isAuthenticated, login, logout } = useContext(AuthContext);

	GoogleSignin.configure({
	  webClientId: '451351028152-ts3hp6bgcqkboq8gm5n7ruc6q56krpe8.apps.googleusercontent.com',
	});

	const GoogleLoginHandle = async() => {
		//login();
		const { idToken } = await GoogleSignin.signIn();
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);
		const user_sign_in = auth().signInWithCredential(googleCredential);
		user_sign_in.then(re => {
			console.log(re)
		})
	}

	return (
		<View style={styles.auth}>
			<View style={styles.signBox}>
				<Text style={styles.welcomeText}>Welcome!</Text>
				<Text style={styles.continueWithText}>Continue With:</Text>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<TouchableOpacity style={styles.googleLogin} onPress={GoogleLoginHandle}>
						<SvgXml xml={GoogleButtonSvg}/>
					</TouchableOpacity>
				</View>
			</View>
    </View>
	);
};

const styles = StyleSheet.create({
	auth: {
		height: '100%',
		paddingVertical: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
	},
	signBox: {
		alignSelf: 'flex-start',
		maxWidth: 330,
		marginHorizontal: 10,
		width: '100%',
		borderRadius: 10,
		paddingVertical: 50,
		paddingHorizontal: 25,
		backgroundColor: '#FFFFFF',
		shadowColor: 'rgb(0, 0, 0, 0.35)',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10,
	},
	welcomeText: {
		fontSize: 24,
		lineHeight: 28,
		textAlign: 'center',
		marginBottom: 10
	},
	continueWithText: {
		fontSize: 20,
		lineHeight: 24,
		textAlign: 'center',
		marginBottom: 25
	},
	googleLogin: {
		backgroundColor: '#FFFFFF',
		shadowColor: 'rgb(0, 0, 0, 0.35)',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		borderRadius: 10,
		shadowOpacity: 0.25,
		shadowRadius: 10,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default AuthScreen;