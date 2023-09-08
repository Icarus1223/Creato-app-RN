import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import ImagePicker from 'react-native-image-crop-picker';
import DareOption from "../../../components/DareOption";
import { PrimaryButton } from "../../../components/common/Button";
import { AddIconSvg, RemoveIconSvg } from "../../../assets/svg";

const FanwallPostScreen = ({ navigation }) => {
	const [photo, setPhoto] = useState(null);

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

	const PostFanwall = () => {

	}

	return (
		<ScrollView vertical style={{ backgroundColor: '#FFFFFF' }}>
			<View style={{ width: '100%', alignItems: 'center', paddingVertical: 10}}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Posting on Fanwall 🎨️</Text>
        </View>
				<View style={styles.title}>
					<Text style={styles.titleText}>Winning DareMe option title</Text>
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
        	<PrimaryButton width={300} text="Post Now" onPress={PostFanwall}/>
        </View>
      </View>
		</ScrollView>
	);
};

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