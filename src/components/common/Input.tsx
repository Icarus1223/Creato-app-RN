import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

const Input = ({ value, setValue, maxLength }) => {

	return (
		<View>
			<TextInput 
				style={styles.text}
				value={value}
				onChangeText={setValue}
				maxLength={maxLength}
				placeholderTextColor={'#54504E'}
				placeholder="Tell us about the title..." 
			/>
			{maxLength &&
				<Text style={styles.wordCount}>({value.length}/{maxLength} characters)</Text>
			}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%'
	},
	text: {
		borderColor: '#54504E',
		borderWidth: 1,
		borderRadius: 15,
		height: 48,
		paddingHorizontal: 8,
		fontSize: 16,
		fontWeight: 400,
		lineHeight: 20,
		color: '#000000'
	},
	wordCount: {
		paddingTop: 5,
		paddingRight: 3,
		textAlign: 'right',
		fontSize: 12,
		fontWeight: 300,
		lineHeight: 14,
		color: '#A6A29F'
	}
});

export default Input;