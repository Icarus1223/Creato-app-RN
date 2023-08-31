import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const PrimaryButton = ({ text, onPress }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonContent}>
			  <Text style={styles.buttonText}>{text}</Text>
      </View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EFA058',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 400,
    textAlign: 'center',
  },
});

export default PrimaryButton;