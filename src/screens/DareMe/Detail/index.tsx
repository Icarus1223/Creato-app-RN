import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { SvgXml } from "react-native-svg";
import Avatar from "../../../components/common/Avatar";
import { PrimaryButton } from "../../../components/common/Button";
import { DonutIconSvg, UserGroupIconSvg } from "../../../assets/svg";


const DareMeDetailScreen = ({ navigation }) => {
  return (
    <ScrollView vertical style={{ backgroundColor: '#FFFFFF' }}>
      <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10}}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>DareMe detail</Text>
        </View>
        <View style={styles.imageContainer}>
            <SliderBox
              images={['https://loremflickr.com/324/576/flower', 'https://loremflickr.com/324/576/hongkong']}
              sliderBoxHeight={576}
              parentWidth={324}
              ImageComponentStyle={{ borderRadius: 10 }}
              paginationBoxStyle={{
                position: "absolute",
                bottom: 20,
                padding: 0,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                paddingVertical: 10
              }}
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
          <View style={styles.title}>
            <Text style={styles.titleText}>Dare me Title Dare Me Title Dare Me title</Text>
          </View>
        </View>
        <View style={styles.toolContainer}>
          <View style={styles.avatarContainer}>
            <Avatar />
          </View>
          <View style={styles.username}>
            <Text>James</Text>
          </View>
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

export default DareMeDetailScreen;