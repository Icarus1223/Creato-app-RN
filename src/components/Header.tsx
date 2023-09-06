import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../utils/AuthContext"
import { PrimaryButton } from "../components/common/Button";
import Avatar from "../components/common/Avatar";
import { SvgXml } from "react-native-svg";
import { CreatoLogoSvg, DonutIconSvg, AddIconSvg } from "../assets/svg";

const Header = () => {
	const { isAuthenticated, login, logout } = useContext(AuthContext);
	const navigation = useNavigation();

	const LoginScreen = () => {
		navigation.navigate('Auth');
	}

	const HomeScreen = () => {
		navigation.navigate('Home');
	}

	const CreateDareMeScreen = () => {
		navigation.navigate('DareMe-Create');
	}

	const ProfileScreen = () => {
		navigation.navigate('Profile');
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.logo} onPress={HomeScreen}>
					<SvgXml xml={CreatoLogoSvg} />
					<Text style={styles.logoText}>Creato</Text>
				</TouchableOpacity>
				{isAuthenticated ? 
					<View style={styles.avatar}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<TouchableOpacity onPress={CreateDareMeScreen}>
								<View style={{ marginRight: 10, width: 30, height: 30, backgroundColor: 'white', borderColor: 'black', borderWidth: 3, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
									<SvgXml xml={AddIconSvg('black')} />
								</View>
							</TouchableOpacity>
							<SvgXml xml={DonutIconSvg('#54504E')} />
							<Text style={styles.donutCount}>1,000</Text>
						</View>
						<TouchableOpacity onPress={ProfileScreen}>
							<Avatar />
						</TouchableOpacity>
					</View>
				:
					<View style={styles.button}>
						<PrimaryButton text="Log In" onPress={LoginScreen}/>
					</View>
				}
			</View>
		</View>
	);
};	

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 2,
    	borderBottomColor: '#BCB6A9'
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		paddingVertical: 5,
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
	},
	avatar: {
		height: 54,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	donutCount: {
		width: 40,
		marginHorizontal: 3
	},
});

export default Header;