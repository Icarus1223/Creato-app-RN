import React, { useContext } from 'react';
import { View, Button } from "react-native";
import { AuthContext } from "../../utils/AuthContext"

const AuthScreen = ({ navigation }) => {
	const { isAuthenticated, login, logout } = useContext(AuthContext);

	if(!isAuthenticated) {
		//navigation.navigate('Home');
	}

	return (
		<View>
			<Button
        		title="Auth"
        		onPress={() =>
          		navigation.navigate('Home', {name: 'Jane'})
        	}
    	/>
    </View>
	);
};

export default AuthScreen;