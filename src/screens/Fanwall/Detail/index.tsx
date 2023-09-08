import React from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import DareOption from "../../../components/DareOption";
import Avatar from "../../../components/common/Avatar";
import { PrimaryButton } from "../../../components/common/Button";
import { DonutIconSvg, UserGroupIconSvg } from "../../../assets/svg";

const FanwallDetailScreen = ({ navigation }) => {
	const DareMeDetailScreen = () => {
		navigation.navigate('DareMe-Result');
	}

	const ProfileScreen = () => {
		navigation.navigate('Profile');
	}

	return (
		<ScrollView vertical style={{ backgroundColor: '#FFF' }} >
			<View style={{ width: '100%', alignItems: 'center', paddingVertical: 10}} >
				<View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Post Detail</Text>
        </View>
				<View style={styles.container}>
					<View style={styles.containerHeader}>
						<View>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<View style={{ flexDirection: 'row' }}>
								<SvgXml xml={DonutIconSvg('grey')} />
								<Text style={styles.voteInfoText}>1,000</Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
								<SvgXml xml={UserGroupIconSvg('grey')} />
								<Text style={styles.voteInfoText}>20</Text>
							</View>
						</View>
					</View>
					<View style={styles.title}>
						<Text style={styles.titleText}>Fanwall title</Text>
					</View>
					<Image
						style={{ width: 324, height: 576 }}
						source={{ uri: 'https://loremflickr.com/324/576/hongkong' }}
					/>
					<View style={{ borderTopWidth: 0.5, borderTopColor: 'grey', width: '100%', marginVertical: 10}}></View>
					<View style={{ width: 304, marginLeft: 'auto', marginRight: 'auto' }}>
						<DareOption username="James" title="Dare Option title" />
					</View>
					<View style={{ borderTopWidth: 0.5, borderTopColor: 'grey', width: '100%', marginVertical: 10}}></View>
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
					<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15, marginBottom: 10 }}>
						<PrimaryButton text="See DareMe" width={310} onPress={DareMeDetailScreen} />
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screenHeader: {
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 600,
    color: '#EFA058',
    textAlign: 'center'
  },
	container: {
		width: 340,
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingHorizontal: 8,
		paddingVertical: 5,
		backgroundColor: '#FFFFFF',
		shadowColor: 'rgb(0, 0, 0, 0.15)',
	  shadowOffset: {
		  width: 2,
		  height: 4,
		 },
	  shadowOpacity: 0.15,
	  shadowRadius: 10,
		borderRadius: 10,
	},
	containerHeader: {
		marginVertical: 5,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	voteInfoText: {
		marginLeft: 3,
		fontSize: 14,
		lineHeight: 16,
		fontWeight: 'bold',
		color: 'grey'
	},
	title: {
		marginVertical: 10,
		paddingHorizontal: 5,

	},
	titleText: {
		color: 'black',
		fontSize: 24,
		lineHeight: 28,
		fontWeight: 800,
	},
	toolContainer: {
		width: '100%',
		height: 48,
		padding: 4,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
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

export default FanwallDetailScreen;