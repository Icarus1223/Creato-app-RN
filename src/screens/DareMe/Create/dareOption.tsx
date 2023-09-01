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
	{ id: 0, text: 'Previous options from previous DareMe' },
	{ id: 1, text: 'Second highest Dare from previous DareMe' },
	{ id: 2, text: 'Previous suggestions from fans' },
	{ id: 3, text: 'Other suggestions from our database' },
	{ id: 4, text: 'Other suggestions' }
]

const CreateDareMeDareOptionScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { dareme } = useSelector((state) => state.dareme);
	const [option1, setOption1] = useState('');
	const [option2, setOption2] = useState('');

	const CreateDareMeScreen = () => {
		navigation.navigate('DareMe-Create')
	}

	const SaveTitle = () => {
		navigation.navigate('DareMe-Create');
		const { options } = dareme;
		options.option1.title = option1;
		options.option2.title = option2;
		dispatch({ type: SET_DAREME, payload: { ...dareme, options: options } });
	}

	useEffect(() => {
		const { options } = dareme;
		const { option1, option2 } = options;
		if(option1.title) setOption1(option1.title);
		if(option2.title) setOption2(option2.title);
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
					<Text style={styles.screenTitle}>Dare options</Text>
					<View style={{ width: 40, height: 40 }}></View>
				</View>
				<View style={styles.title}>
					<Input value={option1} setValue={setOption1} maxLength={20} placeholder="What is your 1st Dare?" />
				</View>
				<View style={styles.title}>
					<Input value={option2} setValue={setOption2} maxLength={20} placeholder="What is your 2nd Dare?" />
				</View>
				<View style={{ marginHorizontal: 35 }}>
					<Text style={{ fontSize: 18, lineHeight: 20, fontWeight: 600, color: '#54504E', marginVertical: 10 }}>Recent Dares:</Text>
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
		height: 630,
		paddingVertical: 10,
		backgroundColor: '#FFFFFF'
	},
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
	title: {
		marginVertical: 10,
		width: 335,
		marginRight: 'auto',
		marginLeft: 'auto'
	},
	suggests: {
		marginHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	suggest: {
		maxWidth: 335,
		marginVertical: 5,
		width: '100%',
	}
});

export default CreateDareMeDareOptionScreen;