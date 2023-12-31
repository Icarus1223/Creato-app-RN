import React, { useState, useMemo, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import DareOption from "../../../components/DareOption";
import { useSelector, useDispatch } from "react-redux";
import { PrimaryButton } from "../../../components/common/Button";
import { SET_LOADING } from "../../../redux/actionTypes";
import { GetDareMeById } from "../../../redux/actions/daremeAction";
import { GetFanwallByDareMeId } from "../../../redux/actions/fanwallAction";
import CustomMoal from "../../../components/common/Modal";
import { DonutIconSvg, UserGroupIconSvg } from "../../../assets/svg";

const DareMeResultScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { dareme } = useSelector(state => state.dareme);
  const { fanwall } = useSelector(state => state.fanwall);
  const { user } = useSelector(state => state.auth);
  const [visible, setVisible] = useState(false);

	const FanwallPostScreen = () => {
    if((dareme.owner && user && dareme.owner.id == user.id && fanwall == null)) {
		  navigation.navigate('Fanwall-Post', { daremeId: id, winTitle: dareme.options[winIndex].title });
    } else {
      if(fanwall) navigation.navigate('Fanwall-Detail', { id: fanwall.id });
      else setVisible(true);    
    }
	}

  const totalDonuts = useMemo(() => {
    if(dareme.options) {
      return dareme.options.reduce((count, current) => {
        if(current.voteInfo) {
          current.voteInfo.forEach((vote) => {
            count += vote.amount;
          })
          return count;
        } else return count;
      }, 0);
    } else return 0
  }, [dareme]);

  const totalVoters = useMemo(() => {
    if(dareme.options) {
      const voters = new Set();
      dareme.options.forEach((option) => {
        if(option.voteInfo) {
          option.voteInfo.forEach((vote) => {
            voters.add(vote.voter);
          })
        }
      });
      return voters.size;
    } else return 0;
  }, [dareme]);

  const winIndex = useMemo(() => {
    if(dareme.options) {
      const firstOptionDonuts = dareme.options[0].voteInfo ? dareme.options[0].voteInfo.reduce((sum, current) => sum + current.amount, 0) : 0;
      const secondOptionDonuts = dareme.options[1].voteInfo ? dareme.options[1].voteInfo.reduce((sum, current) => sum + current.amount, 0) : 0;
      if(firstOptionDonuts > secondOptionDonuts) return 0
      else if(secondOptionDonuts > firstOptionDonuts) return 1
      else {
        const firstVoters = new Set();
        if(dareme.options[0].voteInfo) {
          dareme.options[0].voteInfo.forEach((vote) => {
              firstVoters.add(vote.voter);
          })
        }
        const secondVoters = new Set();
        if(dareme.options[1].voteInfo) {
          dareme.options[1]?.voteInfo.forEach((vote) => {
              secondVoters.add(vote.voter);
          })
        }
        if(firstVoters.size >= secondVoters.size) return 0
        else return 1
      }
    }
  }, [dareme])

  const GetDareMeResult = async () => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      await Promise.all([GetDareMeById(id), GetFanwallByDareMeId(id)]);
      dispatch({ type: SET_LOADING, payload: false });
    } catch (err) {
      dispatch({ type: SET_LOADING, payload: false });
      console.log(err);
    }
  }

  useFocusEffect(
    useCallback(() => {
      GetDareMeResult();
    }, [id])
  );

	return (
		<ScrollView vertical style={{ backgroundColor: '#FFFFFF' }}>
		 	<View style={{ width: '100%', alignItems: 'center', paddingVertical: 10}}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>DareMe results</Text>
        </View>
        {dareme.owner ?
        <View style={styles.containerHeader}>
					<View>
						<Text style={styles.leftTime}>Ended</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<View style={{ flexDirection: 'row' }}>
							<SvgXml xml={DonutIconSvg('grey')} />
							<Text style={styles.voteInfoText}>{totalDonuts.toLocaleString()}</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
							<SvgXml xml={UserGroupIconSvg('grey')} />
							<Text style={styles.voteInfoText}>{totalVoters.toLocaleString()}</Text>
						</View>
					</View>
				</View> : null }
        {dareme.owner ?
				<View style={styles.title}>
					<Text style={styles.titleText}>{dareme.title}</Text>
				</View> : null }
        {dareme.owner ?
        <View style={styles.optionContainer}>
          <View style={{ marginVertical: 5 }}>
            <DareOption 
              title={dareme.options[0].title}
              username={dareme.owner.name}
              voteInfo={dareme.options[0].voteInfo}
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <DareOption 
              title={dareme.options[1].title}
              username={dareme.owner.name}
              voteInfo={dareme.options[1].voteInfo}
            />
          </View>
        </View> : null }
        {dareme.owner ?
        <View style={{ marginLeft: 'auto', marginRight: 'auto'}}>
        	<PrimaryButton 
            width={280} 
            text={(dareme.owner && user && dareme.owner.id == user.id && fanwall == null) ? "Post on Fanwall" : "View on Fanwall"} 
            onPress={FanwallPostScreen}
          />
        </View>: null }
      </View>
      <CustomMoal
        visible={visible}
        setVisible={setVisible}
        title={"Stay tuned!"}
      >
        <Text style={styles.donutCount}>Creator is working on it 🎯.</Text>
        <View style={{ marginTop: 10, justifyContent: 'center', flexDirection: 'row' }}>
          <PrimaryButton width={200} text="Cancel" onPress={() => setVisible(false)} />
        </View>
      </CustomMoal>
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
  },
  donutCount: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 400,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default DareMeResultScreen;