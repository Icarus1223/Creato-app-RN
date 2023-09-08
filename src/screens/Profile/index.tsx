import React from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Carousel from 'react-native-snap-carousel';
import DareMeCard from "../../components/DareMeCard";
import FanwallCard from "../../components/FanwallCard";
import Avatar from "../../components/common/Avatar";
import { CreatoLogoSvg, DonutIconSvg, AddIconSvg, DareIconSvg, RewardIconSvg } from "../../assets/svg";

{/*
<View style={{ backgroundColor: '#FFFFFF' }}>
	<View style={styles.profileMenu}>
		<View style={styles.avatarContainer}>
			<Avatar size={70} />
			<Text style={styles.username}>James</Text>
		</View>
	</View>
	<ScrollView vertical>
		<View>
			<Text>Profile Screen</Text>
		</View>
	</ScrollView>
</View>
*/}

const Tab = createBottomTabNavigator();


const DareMeTab = ({ items }) => {
	const width = Dimensions.get('window').width;

	const renderItem = ({ item }) => {
    return <DareMeCard data={item} />;
  }

  return (
    <ScrollView>
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

const FanwallTab = ({ items }) => {
	const width = Dimensions.get('window').width;

	const renderItem = ({ item }) => {
		return <FanwallCard data={item} />
	}

  return (
    <ScrollView>
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

const ProfileScreen = ({ navigation }) => {
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

	return (
		<View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.profileMenu}>
        <View style={styles.avatarContainer}>
          <Avatar size={70} />
          <Text style={styles.username}>James</Text>
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
        	children={() => <DareMeTab items={carouselItems}/>}
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
	//	justifyContent: 'space-between',
	//	alignItems: 'center',
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