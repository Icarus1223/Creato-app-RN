import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Header from "../components/Header";
import HomeScreen from "../screens/Home";
import AuthScreen from "../screens/Auth";
import ProfileScreen from "../screens/Profile";
import CreateDareMeScreen from "../screens/DareMe/Create";
import CreateDareMeTitleScreen from "../screens/DareMe/Create/title.tsx";
import CreateDareMeOptionScreen from "../screens/DareMe/Create/dareOption.tsx";
import DareMeDetailScreen from "../screens/DareMe/Detail";
import DareMeVoteScreen from "../screens/DareMe/Vote";
import DareMeResultScreen from "../screens/DareMe/Result";
import FanwallPostScreen from "../screens/Fanwall/Post";
import FanwallDetailScreen from "../screens/Fanwall/Detail";

const Stack = createNativeStackNavigator();

const Navigation = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<NavigationContainer>
	      <Header />
	      <Stack.Navigator screenOptions={{ headerShown: false }}>
	        <Stack.Screen name="Home" component={HomeScreen} />
	        <Stack.Screen name="Auth" component={AuthScreen} />
	        <Stack.Screen name="DareMe-Create" component={CreateDareMeScreen} />
	        <Stack.Screen name="DareMe-Create-Title" component={CreateDareMeTitleScreen} />
	        <Stack.Screen name="DareMe-Create-DareOption" component={CreateDareMeOptionScreen} />
	        <Stack.Screen name="DareMe-Detail" component={DareMeDetailScreen} />
	        <Stack.Screen name="DareMe-Vote" component={DareMeVoteScreen} />
	        <Stack.Screen name="DareMe-Result" component={DareMeResultScreen} />
	        <Stack.Screen name="Fanwall-Post" component={FanwallPostScreen} />
	        <Stack.Screen name="Fanwall-Detail" component={FanwallDetailScreen} />
	        <Stack.Screen name="Profile" component={ProfileScreen} />
	      </Stack.Navigator>
	    </NavigationContainer>
    </SafeAreaView>
	);
};

export default Navigation;