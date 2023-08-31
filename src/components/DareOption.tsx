import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import { VoteIconSvg } from "../assets/svg"

const DareOption = ({ title, username }) => {
	return (
		<TouchableOpacity>
			<View style={styles.container}>
				<View style={{ justifyContent: 'center', flexDirection: 'row' }}>
					<View style={styles.optionTitle}>
						<Text style={styles.optionText}>{title}</Text>
					</View>
					<View style={styles.voteStatus}>
					{(title && title.indexOf('Dare Option') === -1) &&
						<SvgXml xml={VoteIconSvg} />
					}
					</View>
				</View>
			</View>
			{username &&
				<View style={styles.username}>
					<Text style={styles.usernameText}>by {username}</Text>
				</View>
			}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 304,
		backgroundColor: '#F5F5F4',
		height: 80,
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	optionTitle: {
		flexDirection: 'column',
		justifyContent: 'center',
		height: 60,
		width: 230
	},
	voteStatus: {
		width: 40,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	optionText: {
		fontSize: 16,
		lineHeight: 20,
		fontWeight: 400
	},
	username: {
		marginTop: 1,
		flexDirection: 'row-reverse'
	},
	usernameText: {
		fontSize: 12,
		lineHeight: 14,
		fontWeight: 400
	}
})

export default DareOption;