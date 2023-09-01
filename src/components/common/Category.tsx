import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Category = ({text, width}) => {
	return (
		<View style={[styles.container, { width: width ? width : undefined }]}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 40,
		padding: 8,
		borderColor: '#EFA058',
		borderWidth: 1,
		backgroundColor: '#FFFFFF'
	},
	text: {
		fontSize: 16,
		lineHeight: 20,
		fontWeight: 400,
		color: '#EFA058'
	}
});

export default Category;