import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton } from "../components/common/Button";
import { LogoIcon } from "../assets/svg/index.tsx";

const Header = () => {
	const navigation = useNavigation();

	const LoginScreen = () => {
		navigation.navigate('Auth')
	}

	return (
		<View style={styles.header}>
			<View style={styles.logo}>
				<LogoIcon width={40} height={40} />
				<Text style={styles.logoText}>Creato</Text>
			</View>
			<View style={styles.button}>
				<PrimaryButton text={"Log In"} onPress={LoginScreen}/>
			</View>
		</View>
	);
};	

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderBottomWidth: 2,
    borderBottomColor: '#BCB6A9'
	},
	logo: {
		marginLeft: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	logoText: {
		marginLeft: 15,
		fontSize: 24,
    lineHeight: 28,
    fontWeight: 600,
	}
});

export default Header;