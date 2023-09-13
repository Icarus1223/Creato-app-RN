import { useContext } from "react"; 
import {StyleSheet, View, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { SvgXml } from "react-native-svg";
import { AuthContext } from "../utils/AuthContext"
import { SET_OPEN_MENUBAR } from "../redux/actionTypes";
import { UserIconSvg } from "../assets/svg";

const MenuBar = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { isOpenedMenuBar } = useSelector(state => state.auth);
	const { logout } = useContext(AuthContext);

	const ProfileScreen = () => {
		navigation.navigate('Profile');
		dispatch({ type: SET_OPEN_MENUBAR, payload: false });
	}

	const Logout = () => {
		dispatch({ type: SET_OPEN_MENUBAR, payload: false });
		logout(navigation);
	}

	return (
		<View style={[styles.menubar, { right: isOpenedMenuBar ? 0 : -200 }]}>
			<TouchableOpacity style={styles.menuItem} onPress={ProfileScreen}>
				<SvgXml xml={UserIconSvg} />
				<Text style={styles.itemText}>My Profile</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.menuItem} onPress={Logout}>
				<FontAwesomeIcon icon={faRightFromBracket} style={{ marginHorizontal: 5 }}/>
				<Text style={styles.itemText}>Log out</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	menubar: {
		position: 'absolute',
		zIndex: 1,
		top: 115,
		shadowColor: 'rgb(0, 0, 0, 0.35)',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10,
		backgroundColor: '#FFFFFF',
		width: 200
	},
	menuItem: {
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center'
	},
	itemText: {
		marginHorizontal: 8,
		fontSize: 16,
		fontWeight: 400,
		lineHeight: 20
	}
});

export default MenuBar;