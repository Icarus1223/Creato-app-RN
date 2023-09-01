import React, { useRef, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { PrimaryButton } from "../../../components/common/Button";
import { AddIconSvg } from "../../../assets/svg";
import DareOption from "../../../components/DareOption";

const CreateDareMeScreen = ({ navigation }) => {
	const scrollViewRef = useRef(null);

	const DareMeTitleScreen = () => {
		navigation.navigate('DareMe-Create-Title');
		scrollToTop();
	}

	const DareMeOptionScreen = () => {
		navigation.navigate('DareMe-Create-DareOption');
		scrollToTop();
	}

	const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

	return (
		<ScrollView ref={scrollViewRef} vertical style={{ backgroundColor: '#FFFFFF' }}>
			<View style={styles.container}>
				<View style={styles.screenHeader}>
					<Text style={styles.screenTitle}>Create DareMe</Text>
				</View>
				<View style={styles.mainBody}>
					<View style={styles.imageContainer}>
						<View style={styles.deadline}>
							<PrimaryButton text="Deadline" rounded={true} >
								<SvgXml xml={AddIconSvg} />
							</PrimaryButton>
						</View>
						<View style={styles.daremeTitle}>
							<PrimaryButton text="DareMe Title" rounded={true} onPress={DareMeTitleScreen} >
								<SvgXml xml={AddIconSvg} />
							</PrimaryButton>
						</View>
						<View style={styles.uploadButton} >
							<PrimaryButton text="Upload Photos" width={300} />
						</View>
					</View>
					<View style={styles.optionContainer}>
						<View style={{ marginVertical: 5 }}>
							<DareOption title="1st Dare Option" username="James" onPress={DareMeOptionScreen} />
						</View>
						<View style={{ marginVertical: 5 }}>
							<DareOption title="2nd Dare Option" username="James" onPress={DareMeOptionScreen} />
						</View>
					</View>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
					<PrimaryButton text="Publish" width={320}/>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 960,
		paddingVertical: 10,
		backgroundColor: '#FFFFFF'
	},
	screenHeader: {
		height: 50,
		paddingVertical: 10,
		paddingHorizontal: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	screenTitle: {
		fontSize: 20,
		lineHeight: 24,
		fontWeight: 600,
		color: '#EFA058',
		textAlign: 'center'
	},
	mainBody: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageContainer: {
		position: 'relative',
		width: 324,
		height: 576,
		borderRadius: 10,
		backgroundColor: '#BAB6B5'
	},
	deadline: {
		position: 'absolute',
		top: 10,
		left: 10
	},
	daremeTitle: {
		position: 'absolute',
		top: 75,
		left: 10
	},
	uploadButton: {
		position: 'absolute',
		bottom: 40,
		left: 12
	},
	optionContainer: {
		marginTop: -25,
		width: 324,
		paddingVertical: 20,
		paddingHorizontal: 10,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		shadowColor: 'rgb(0, 0, 0, 0.35)',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10,
	}
});

export default CreateDareMeScreen;