import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { SET_DAREME } from "../../../redux/actionTypes";
import { PrimaryButton } from "../../../components/common/Button";
import { BackIconSvg } from "../../../assets/svg";
import Category from "../../../components/common/Category";
import Input from "../../../components/common/Input";

const suggests = [
	{ id: 0, text: 'What should I wear for my Bday party?' },
	{ id: 1, text: 'What type of song should I write?' },
	{ id: 2, text: 'What should I do for my next video?' },
	{ id: 3, text: 'Which beach would you like me to review?' },
	{ id: 4, text: 'What is the next challenge?' }
]

const CreateDareMeTitleScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { dareme } = useSelector((state) => state.dareme); 
	const [title, setTitle] = useState('');

	const CreateDareMeScreen = () => {
		navigation.navigate('DareMe-Create')
	}

	const SaveTitle = () => {
		navigation.navigate('DareMe-Create')
		dispatch({ type: SET_DAREME, payload: { ...dareme, title: title === '' ? null : title } });
	}

	useEffect(() => {
		if(dareme.title) {
			setTitle(dareme.title);
		}
	}, [dareme]);

	return (
		<ScrollView vertical style={{ backgroundColor: '#FFFFFF' }}>
			<View style={styles.container}>
				<View style={styles.screenHeader}>
					<View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
						<TouchableOpacity onPress={CreateDareMeScreen}>
							<SvgXml xml={BackIconSvg} />
						</TouchableOpacity>
					</View>
					<Text style={styles.screenTitle}>DareMe Title</Text>
					<View style={{ width: 40, height: 40 }}></View>
				</View>
				<View style={styles.title}>
					<Input value={title} setValue={setTitle} maxLength={20} placeholder="Tell us about the title..."/>
				</View>
				<View style={{ marginHorizontal: 35 }}>
					<Text style={{ fontSize: 18, lineHeight: 20, fontWeight: 600, color: '#54504E', marginVertical: 10 }}>Recent Titles:</Text>
				</View>
				<View style={styles.suggests}>
					{suggests.map(suggest => (
						<View key={suggest.id} style={styles.suggest}>
							<Category text={suggest.text} />
						</View>
					))}
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
					<PrimaryButton text="Save" width={320} onPress={SaveTitle}/>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		backgroundColor: '#FFFFFF'
	},
	screenHeader: {
		height: 50,
		paddingVertical: 10,
		paddingHorizontal: 15,
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
	title: {
		marginVertical: 10,
		width: 325,
		marginRight: 'auto',
		marginLeft: 'auto'
	},
	suggests: {
		marginHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	suggest: {
		maxWidth: 325,
		marginVertical: 5,
		width: '100%',
	}
});

export default CreateDareMeTitleScreen;