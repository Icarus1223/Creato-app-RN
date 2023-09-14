import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from 'react-native-image-crop-picker';
import DareOption from "../../../components/DareOption";
import { SET_LOADING } from "../../../redux/actionTypes";
import { CreateFanwall } from "../../../redux/actions/fanwallAction";
import { PrimaryButton } from "../../../components/common/Button";
import { AddIconSvg, RemoveIconSvg, BackIconSvg } from "../../../assets/svg";

const FanwallPostScreen = ({ navigation, route }) => {
	const [photo, setPhoto] = useState(null);
	const dispatch = useDispatch();
	const { daremeId, winTitle } = route.params;
	const { user } = useSelector(state => state.auth);

	const UploadPhoto = () => {
		ImagePicker.openPicker({
		  multiple: false,
		  mediaType: 'photo'
		}).then(image => {
			setPhoto(image.sourceURL);
		}).catch((err) => {
			console.log(err);
		});
  }

  const RemovePhoto = () => {
  	setPhoto(null);
  }

	const PostFanwall = async () => {
		try {
			dispatch({ type: SET_LOADING, payload: true });
			await CreateFanwall(daremeId, user.id ,photo);
			dispatch({ type: SET_LOADING, payload: false });
			navigation.navigate('Home');
		} catch(err) {
			dispatch({ type: SET_LOADING, payload: false });
			console.log(err)
		}
	}

	const DareMeResultScreen = () => {
		navigation.navigate('DareMe-Result', { id: daremeId });
	}

	return (
		<ScrollView vertical style={{ backgroundColor: '#FFFFFF' }}>
			<View style={{ width: '100%', alignItems: 'center', paddingVertical: 10}}>
        <View style={styles.screenHeader}>
        	<View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={DareMeResultScreen}>
              <SvgXml xml={BackIconSvg} />
            </TouchableOpacity>
          </View>
          <Text style={styles.screenTitle}>Posting on Fanwall 🎨️</Text>
          <View style={{ width: 40, height: 40 }}></View>
        </View>
				<View style={styles.title}>
					<Text style={styles.titleText}>{winTitle}</Text>
				</View>
				<View style={{ marginTop: 20 }}>
					{photo ?
						<View style={{ position: 'relative' }}>
							<Image
								style={{ width: 324, height: 576 }}
								source={{ uri: photo }}
							/>
							<TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }} onPress={RemovePhoto}>
								<SvgXml xml={RemoveIconSvg('grey')}/>
							</TouchableOpacity>
						</View>
					 :
					 	<PrimaryButton width={300} text="Upload Photo" onPress={UploadPhoto} outlined={true} onPress={UploadPhoto}>
							<SvgXml xml={AddIconSvg('#EFA058')} />
						</PrimaryButton>
					}
				</View>
        <View style={{ marginLeft: 'auto', marginRight: 'auto', marginVertical: 20}}>
        	<PrimaryButton width={300} text="Post Now" onPress={PostFanwall} disabled={photo ? false : true}/>
        </View>
      </View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
  screenHeader: {
  	width: '100%',
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
  	width: '100%',
  	paddingVertical: 10,
    paddingHorizontal: 20
  },
  titleText: {
    color: 'black',
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 800,
    textAlign: 'left'
  },
});

export default FanwallPostScreen;