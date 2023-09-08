import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import DareOption from "../../../components/DareOption";
import { PrimaryButton } from "../../../components/common/Button";
import { DonutIconSvg, UserGroupIconSvg } from "../../../assets/svg";

const DareMeResultScreen = ({ navigation }) => {
	const FanwallPostScreen = () => {
		navigation.navigate('Fanwall-Post');
	}

	return (
		<ScrollView vertical style={{ backgroundColor: '#FFFFFF' }}>
		 	<View style={{ width: '100%', alignItems: 'center', paddingVertical: 10}}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>DareMe results</Text>
        </View>
        <View style={styles.containerHeader}>
					<View>
						<Text style={styles.leftTime}>7 Days</Text>
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
					<Text style={styles.titleText}>Dare Me title</Text>
				</View>
        <View style={styles.optionContainer}>
          <View style={{ marginVertical: 5 }}>
            <DareOption 
              title={"1st Dare Option"}
              username="James"
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <DareOption 
              title={"2nd Dare Option"}
              username="James"
            />
          </View>
        </View>
        <View style={{ marginLeft: 'auto', marginRight: 'auto'}}>
        	<PrimaryButton width={280} text="Post on Fanwall" onPress={FanwallPostScreen}/>
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
  containerHeader: {
    paddingHorizontal: 20,
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
    color: 'grey'
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
  optionContainer: {
    marginTop: 5,
    marginBottom: 20,
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

export default DareMeResultScreen;