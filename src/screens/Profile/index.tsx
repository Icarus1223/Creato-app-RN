import { useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Carousel from 'react-native-snap-carousel';
import DareMeCard from "../../components/DareMeCard";
import FanwallCard from "../../components/FanwallCard";
import Avatar from "../../components/common/Avatar";
import { SET_LOADING } from "../../redux/actionTypes";
import { GetDareMesByUser } from "../../redux/actions/daremeAction";
import { CreatoLogoSvg, DonutIconSvg, AddIconSvg, DareIconSvg, RewardIconSvg } from "../../assets/svg";

const Tab = createBottomTabNavigator();

const DareMeTab = ({ items }) => {
	const width = Dimensions.get('window').width;

	const renderItem = ({ item }) => {
    return <DareMeCard data={item} />;
  }

  return (
    <ScrollView styles={{ backgroundColor: '#FFF' }}>
    	{items.length > 0 ?
	    	<Carousel
	        containerCustomStyle={{ paddingVertical: 10 }}
	        data={items}
	        renderItem={renderItem}
	        sliderWidth={width}
	        itemWidth={320}
	      /> : 
	      <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 15 }}>No Published DareMes</Text>
    	}
    </ScrollView>
  );
};

const FanwallTab = ({ items }) => {
	const width = Dimensions.get('window').width;

	const renderItem = ({ item }) => {
		return <FanwallCard data={item} />
	}

  return (
    <ScrollView styles={{ backgroundColor: '#FFF' }}>
    	<Carousel
        containerCustomStyle={{ paddingVertical: 10 }}
        data={items}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={320}
      />
    </ScrollView>
  );
};

const ProfileScreen = ({ navigation, route }) => {
	const { id, name, avatar } = route.params;
	const dispatch = useDispatch();
	const { daremes } = useSelector(state => state.dareme);
	
	const carouselItems = [
    {
        title:"Item 1",
    },
    {
        title:"Item 2",
    },
    {
        title:"Item 3",
    },
    {
        title:"Item 4",
    },
    {
        title:"Item 5",
    },
  ]

  const GetProfileScreenData = async () => {
  	try {
  		dispatch({ type: SET_LOADING, payload: true });
  		await Promise.all([GetDareMesByUser(id)])
  		dispatch({ type: SET_LOADING, payload: false });
  	} catch (err) {
  		dispatch({ type: SET_LOADING, payload: false });
  		console.log(err);
  	}
  }

  useFocusEffect(
    useCallback(() => {
      GetProfileScreenData();
    }, [id])
  );

	return (
		<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.profileMenu}>
        <View style={styles.avatarContainer}>
          <Avatar size={45} avatar={avatar ? avatar : undefined} />
          <Text style={styles.username}>{name ? name : ''}</Text>
        </View>
      </View>
      <Tab.Navigator
      	screenOptions={{
          tabBarStyle:{
      			backgroundColor:'#FFFFFF',
      			height: 45
    			},
          tabBarLabelStyle: {
            fontSize: 14,	
            fontWeight: 'bold'
          },
          tabBarActiveTintColor: '#EFA058',
    			tabBarInactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen 
        	name="DareMe"
        	children={() => <DareMeTab items={daremes}/>}
        	options={{ 
        		headerShown: false,
        		tabBarIcon: ({ focused }) => <SvgXml xml={DareIconSvg(focused ? '#EFA058' : 'gray')} />
        	}}
        />
        <Tab.Screen 
        	name="Fanwall"
        	children={() => <FanwallTab items={carouselItems} />}
        	options={{ 
        		headerShown: false,
        		tabBarIcon: ({ focused }) => <SvgXml xml={RewardIconSvg(focused ? '#EFA058' : 'gray')} />
        	}}
        />
      </Tab.Navigator>
    </View>
	);
};

const styles = StyleSheet.create({
	profileMenu: {
		width: '100%',
		paddingHorizontal: 24,
		paddingVertical: 15,
		backgroundColor: '#FFFFFF',
		shadowColor: 'rgb(0, 0, 0, 0.35)',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 2,
		flexDirection: 'row',
		marginBottom: 5
	},
	avatarContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	username: {
		marginLeft: 10,
		fontSize: 20,
		lineHeight: 24,
		fontWeight: 700
	},
});

export default ProfileScreen;