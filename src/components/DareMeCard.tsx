import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from "react-native-svg";
import Avatar from "./common/Avatar";
import { PrimaryButton } from "./common/Button";
import { DonutIconSvg, UserGroupIconSvg, NextArrowIconSvg, PreviousArrowIconSvg } from "../assets/svg";

const DareMeCard = ({ data }) => {
	const navigation = useNavigation();
	const [index, setIndex] = useState(0);
	const { title, finished } = data;
	const photos = ['https://loremflickr.com/324/576/flower', 'https://loremflickr.com/324/576/hongkong'];

	const DareMeHandleClick = () => {
		navigation.navigate(finished ? 'DareMe-Result' : 'DareMe-Detail');
	}

	const ProfileScreen = () => {
		navigation.navigate('Profile');
	}

	return (
		<View>
			<View style={styles.imageContainer}>
				<Image
					style={{ position: 'absolute',  width: 324, height: 576, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
					source={{ uri: photos[index] }}
				/>
				<View style={styles.containerHeader}>
					<View>
						<Text style={styles.leftTime}>7 Days</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ flexDirection: 'row' }}>
							<SvgXml xml={DonutIconSvg('white')} />
							<Text style={styles.voteInfoText}>1,000</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
							<SvgXml xml={UserGroupIconSvg('white')} />
							<Text style={styles.voteInfoText}>20</Text>
						</View>
					</View>
				</View>
				{photos.length === 2 ?
					<View style={styles.arrowContainer}>
						{index === 1 ?
							<TouchableOpacity onPress={() => setIndex((i) => (i - 1)%2)}>
								<SvgXml xml={PreviousArrowIconSvg} />
							</TouchableOpacity> : <View></View> 
						}
						{index === 0 ?
							<TouchableOpacity onPress={() => setIndex((i) => (i + 1)%2)}>
								<SvgXml xml={NextArrowIconSvg} />
							</TouchableOpacity> : <View></View>
						}
					</View>	: null 
				}
				<View style={styles.title}>
					<Text style={styles.titleText}>{title}</Text>
				</View>
				<View style={styles.buttonContainer}>
					<PrimaryButton text={finished ? "See Results" : "See More"} width={280} onPress={DareMeHandleClick} />
				</View>
			</View>
			<View style={styles.toolContainer}>
				<TouchableOpacity style={{ flexDirection: 'row' }} onPress={ProfileScreen}>
					<View style={styles.avatarContainer}>
							<Avatar />
					</View>
					<View style={styles.username}>
						<Text>James</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		position: 'relative',
		width: 324,
		height: 576,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		backgroundColor: '#BAB6B5',
		shadowColor: 'rgb(0, 0, 0, 0.35)',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10,
	},
	containerHeader: {
		position: 'absolute',
		top: 0,
		paddingVertical: 8,
		paddingHorizontal: 12,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	leftTime: {
		fontSize: 16,
		fontWeight: 'bold',
		lineHeight: 18,
		color: '#E17253'
	},
	voteInfoText: {
		marginLeft: 3,
		fontSize: 14,
		lineHeight: 16,
		fontWeight: 'bold',
		color: '#FFFFFF'
	},
	title: {
		position: 'absolute',
		top: 35,
		paddingHorizontal: 12
	},
	titleText: {
		color: '#FFFFFF',
		fontSize: 24,
		lineHeight: 28,
		fontWeight: 800,
	},
	arrowContainer: {
		position: 'absolute',
		top: 230,
		width: '100%',
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 84,
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 15,
		left: 22
	},
	toolContainer: {
		width: 324,
		height: 48,
		padding: 4,
		backgroundColor: '#FFFFFF',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		shadowColor: 'rgb(0, 0, 0, 0.35)',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10,
		flexDirection: 'row'
	},
	avatarContainer: {
		height: 40,
		width: 35,
		justifyContent: 'center'
	},
	username: {
		height: 40,
		marginLeft: 5,
		justifyContent: 'center',
		fontSize: 12,
		lineHeight: 14,
		fontWeight: 300
	}
});

export default DareMeCard;