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
		navigation.navigate('Auth')
	}

	const HomeScreen = () => {
		navigation.navigate('Home')
	}

	const CreateDareMeScreen = () => {
		navigation.navigate('DareMe-Create')
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
							<SvgXml xml={DonutIconSvg('#54504E')} />
							<Text style={styles.donutCount}>1,000</Text>
						</View>
						<Avatar />
					</View>
				:
					<View style={styles.button}>
						<PrimaryButton text="Log In" onPress={LoginScreen}/>
					</View>
				}
			</View>
			{isAuthenticated ?
				<View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
					<View style={styles.createBtn}>
						<PrimaryButton text="Create" width={'100%'} onPress={CreateDareMeScreen}>
							<SvgXml xml={AddIconSvg('white')} />
						</PrimaryButton>
					</View>
				</View> : null
			}
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
		height: 52,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	donutCount: {
		marginLeft: 3,
		marginRight: 5
	},
	createBtn: {
		maxWidth: 320,
		width: '100%',
		marginHorizontal: 10
	}
});

export default Header;