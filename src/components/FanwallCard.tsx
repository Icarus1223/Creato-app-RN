import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from "react-native-svg";
import Avatar from "./common/Avatar";
import { PrimaryButton } from "./common/Button";
import { DonutIconSvg, UserGroupIconSvg } from "../assets/svg";

const FanwallCard = ({ data }) => {
	const navigation = useNavigation();
	const [index, setIndex] = useState(0);
	const { dareme, photo, id } = data;

	const FanwallHandleClick = () => {
		navigation.navigate('Fanwall-Detail', { id: id });
	}

	const ProfileScreen = () => {
		navigation.navigate('Profile', {
			id: dareme.owner.id,
			name: dareme.owner.name,
			avatar: dareme.owner.avatar
		});
	}

	const totalDonuts = useMemo(() => {
		if(dareme.options) {
			return dareme.options.reduce((count, current) => {
				if(current.voteInfo) {
					current.voteInfo.forEach((vote) => {
						count += vote.amount;
					})
					return count;
				} else return count;
			}, 0);
		} else return 0
	}, [dareme]);

	const totalVoters = useMemo(() => {
		if(dareme.options) {
			const voters = new Set();
			dareme.options.forEach((option) => {
				if(option.voteInfo) {
					option.voteInfo.forEach((vote) => {
						voters.add(vote.voter);
					})
				}
			});
			return voters.size;
		} else return 0;
	}, [dareme]);

	return (
		<View>
			<View style={styles.imageContainer}>
				<Image
					style={{ position: 'absolute',  width: 324, height: 576, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
					source={{ uri: photo }}
				/>
				<View style={styles.containerHeader}>
					<View>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ flexDirection: 'row' }}>
							<SvgXml xml={DonutIconSvg('white')} />
							<Text style={styles.voteInfoText}>{totalDonuts.toLocaleString()}</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
							<SvgXml xml={UserGroupIconSvg('white')} />
							<Text style={styles.voteInfoText}>{totalVoters.toLocaleString()}</Text>
						</View>
					</View>
				</View>
				<View style={styles.title}>
					<Text style={styles.titleText}>{dareme?.title}</Text>
				</View>
				<View style={styles.buttonContainer}>
					<PrimaryButton text="View Post" width={280} onPress={FanwallHandleClick} />
				</View>
			</View>
			<View style={styles.toolContainer}>
				<TouchableOpacity style={{ flexDirection: 'row' }} onPress={ProfileScreen}>
					<View style={styles.avatarContainer}>
						<Avatar size={35} avatar={dareme?.owner?.avatar}/>
					</View>
					<View style={styles.username}>
						<Text>{dareme?.owner?.name}</Text>
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
		top: 1,
		paddingVertical: 8,
		paddingHorizontal: 12,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
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

export default FanwallCard;