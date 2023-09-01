import React, { useRef, useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import ActionSheet from "react-native-actionsheet";
import { SET_DAREME } from "../../../redux/actionTypes";
import { PrimaryButton } from "../../../components/common/Button";
import { AddIconSvg, EditIconSvg } from "../../../assets/svg";
import DareOption from "../../../components/DareOption";

const CreateDareMeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { dareme } = useSelector((state) => state.dareme);
	const [deadline, setDeadline] = useState(null);
	const [title, setTitle] = useState(null);
	const [options, setOptions] = useState({ option1: { title: null }, option2: { title: null } });
	const scrollViewRef = useRef(null);
	const actionSheet = useRef(null);

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
  }

	const showDeadlineActionSheet = () => {
    actionSheet.current.show();
  }

  const SelectDeadline = (index) => {
  	if(index < 5) {
  		setDeadline(index + 3);
  		dispatch({ type: SET_DAREME, payload: { ...dareme, deadline: index + 3 } });
  	}
  }

  useEffect(() => {
  	setDeadline(dareme.deadline);
  	setTitle(dareme.title);
  	setOptions(dareme.options);
  }, [dareme]);

	return (
		<ScrollView ref={scrollViewRef} vertical style={{ backgroundColor: '#FFFFFF' }}>
			<View style={styles.container}>
				<View style={styles.screenHeader}>
					<Text style={styles.screenTitle}>Create DareMe</Text>
				</View>
				<View style={styles.mainBody}>
					<View style={styles.imageContainer}>
						<View style={styles.deadline}>
							<PrimaryButton 
								text={deadline ? `${deadline} Days` : "Deadline"} 
								forceColor={deadline ? '#059669' : null} 
								outlined={true} 
								rounded={true} 
								onPress={showDeadlineActionSheet}
							>
								<SvgXml xml={deadline ? EditIconSvg('white') : AddIconSvg('#EFA058')} />
							</PrimaryButton>
						</View>
						<View style={styles.daremeTitle}>
							<PrimaryButton 
								text={title ? title.length >= 10 ? `${title.slice(0, 10)}...` : title : "DareMe Title"} 
								forceColor={title ? '#059669' : null}
								outlined={true} 
								rounded={true} 
								onPress={DareMeTitleScreen} 
							>
								<SvgXml xml={title ? EditIconSvg('white') : AddIconSvg('#EFA058')} />
							</PrimaryButton>
						</View>
						<View style={styles.uploadButton} >
							<PrimaryButton text="Upload Photos" width={300} outlined={true} />
						</View>
					</View>
					<View style={styles.optionContainer}>
						<View style={{ marginVertical: 5 }}>
							<DareOption title={options.option1.title ? options.option1.title : "1st Dare Option"} username="James" onPress={DareMeOptionScreen} />
						</View>
						<View style={{ marginVertical: 5 }}>
							<DareOption title={options.option2.title ? options.option2.title : "2nd Dare Option"} username="James" onPress={DareMeOptionScreen} />
						</View>
					</View>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
					<PrimaryButton text="Publish" width={320}/>
				</View>
			</View>
			<ActionSheet
        ref={actionSheet}
        title={'Deadline'}
        options={['3 Days', '4 Days', '5 days', '6 Days', '7 Days', 'Cancel']}
        cancelButtonIndex={5}
        onPress={SelectDeadline}
       />
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