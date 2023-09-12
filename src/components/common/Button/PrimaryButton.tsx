import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const PrimaryButton = ({ text, rounded, onPress, width, children, outlined, forceColor, disabled }) => {
	return (
		<TouchableOpacity
      disabled={disabled}
      style={[
        styles.button, 
        { 
          width: width ? width : undefined, 
          borderRadius: rounded ? 50 : 8,
          backgroundColor: disabled ? 'grey' :  forceColor ? forceColor : outlined ? '#FFFFFF' : '#EFA058',
          borderColor: disabled ? 'grey' : forceColor ? forceColor : '#EFA058'
        }
      ]} 
      onPress={disabled ? undefined : onPress}
    >
      <View style={styles.buttonContent}>
        {children}
			  <Text style={[
            styles.buttonText,
            { color: forceColor ? '#FFFFFF' : outlined ? '#EFA058' : '#FFFFFF' }
          ]}>{text}</Text>
      </View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  buttonContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    marginLeft: 3,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 500,
    textAlign: 'center',
  },
});

export default PrimaryButton;