import React from "react";
import Modal from "react-native-modal";
import { SvgXml } from "react-native-svg";
import { Text, StyleSheet, View, TouchableOpacity} from "react-native";
import { CloseIconSvg } from "../../../assets/svg";

const CustomModal = ({ title, visible, setVisible, children }) => {
	return (
		<Modal isVisible={visible} style={{ alignItems: 'center' }}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>{title}</Text>
					<TouchableOpacity onPress={() => setVisible(false)}>
						<SvgXml xml={CloseIconSvg} />
					</TouchableOpacity>
				</View>
				<View>
					{children}
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 280,
		backgroundColor: '#FFF',
		borderRadius: 20,
		padding: 24,
		shadowColor: '#000',
	  shadowOffset: { width: 4, height: 4 },
	  shadowOpacity: 0.15,
	  shadowRadius: 10,
	},
	header: {
		height: 40,
		padding: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		lineHeight: 24,
		fontWeight: 600
	}
});

export default CustomModal;