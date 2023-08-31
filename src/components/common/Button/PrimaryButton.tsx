import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const PrimaryButton = ({ text, rounded, onPress, width, children }) => {
	return (
		<TouchableOpacity style={[styles.button, { width: width ? width : undefined, borderRadius: rounded ? 50 : 8 }]} onPress={onPress}>
      <View style={styles.buttonContent}>
        {children}
			  <Text style={styles.buttonText}>{text}</Text>
      </View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EFA058',
    alignSelf: 'flex-start',
  },
  buttonContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 500,
    textAlign: 'center',
  },
});

export default PrimaryButton;