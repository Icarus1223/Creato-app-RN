import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import DareOption from "../../../components/DareOption";
import { VoteDareMe } from "../../../redux/actions/daremeAction";
import { SET_LOADING, SET_USER } from "../../../redux/actionTypes";
import { PrimaryButton } from "../../../components/common/Button";
import CustomMoal from "../../../components/common/Modal";
import { DonutIconSvg, UserGroupIconSvg, BackIconSvg } from "../../../assets/svg";

const DareMeVoteScreen = ({ navigation, route }) => {
  const { daremeId, optionIndex, username, ownerId } = route.params;
  const [visible, setVisible] = useState(false);
  const [votable, setVotable] = useState(false);
  const [donut, setDonut] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { option } = useSelector(state => state.dareme);

  const DareMeDetailScreen = () => {
    navigation.navigate('DareMe-Detail', { id: daremeId });
  }

  const VoteModalOpen = (count) => {
    if(ownerId === user.id) setVotable(true);
    else {
      setDonut(count);
      setVisible(true);
    }
  }

  const VoteDareOption = async () => {
    try {
      setVisible(false);
      dispatch({ type: SET_LOADING, payload: true });
      await VoteDareMe(daremeId, optionIndex, user, donut);
      dispatch({ type: SET_LOADING, payload: false });
    } catch (err) {
      dispatch({ type: SET_LOADING, payload: false });
      console.log(err);
    }
  }

  return (
    <ScrollView vertical style={{ backgroundColor: '#FFFFFF' }}>
      <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10}}>
        <View style={styles.screenHeader}>
          <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={DareMeDetailScreen}>
              <SvgXml xml={BackIconSvg} />
            </TouchableOpacity>
          </View>
          <Text style={styles.screenTitle}>Vote in Dare Option</Text>
          <View style={{ width: 40, height: 40 }}></View>
        </View>
        <View style={styles.optionContainer}>
          <View style={{ marginVertical: 5 }}>
            <DareOption 
              title={option?.title}
              username={username}
              onPress={() => {}}
              voteInfo={option.voteInfo ? option.voteInfo : undefined}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <PrimaryButton
              text="Vote (1 donut)" 
              outlined={true}
              width={'100%'}
              onPress={() => VoteModalOpen(1)}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <PrimaryButton
              text="Vote (10 donuts)"
              outlined={true}
              width={'100%'}
              onPress={() => VoteModalOpen(10)}
            />
          </View>
        </View>
      </View>
      <CustomMoal 
        visible={visible}
        setVisible={setVisible}
        title={"Vote"}
      >
        <Text style={styles.donutCount}>{donut ? donut : ''} donut{donut === 10 ? 's' : ''} For:</Text>
        <Text style={styles.optionTitle}>{option?.title}</Text>
        <View style={{ marginTop: 10, justifyContent: 'center', flexDirection: 'row' }}>
          <PrimaryButton width={200} text="Confirm" onPress={VoteDareOption} />
        </View>
      </CustomMoal>
      <CustomMoal
        visible={votable}
        setVisible={setVotable}
        title={"Oops!"}
      >
        <Text style={styles.donutCount}>You can not vote in own DareMe.</Text>
        <View style={{ marginTop: 10, justifyContent: 'center', flexDirection: 'row' }}>
          <PrimaryButton width={200} text="Cancel" onPress={() => setVotable(false)} />
        </View>
      </CustomMoal>
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
  optionContainer: {
    marginTop: 5,
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
  },
  donutCount: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 400,
    textAlign: 'center',
    marginTop: 5,
  },
  optionTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default DareMeVoteScreen;