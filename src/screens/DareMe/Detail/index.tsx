import React, { useState, useRef, useCallback, useMemo, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../../../utils/AuthContext"
import Avatar from "../../../components/common/Avatar";
import { SET_LOADING, SET_OPTION } from "../../../redux/actionTypes";
import { GetDareMeById } from "../../../redux/actions/daremeAction";
import DareOption from "../../../components/DareOption";
import { PrimaryButton } from "../../../components/common/Button";
import { DonutIconSvg, UserGroupIconSvg } from "../../../assets/svg";

const DareMeDetailScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { dareme } = useSelector(state => state.dareme);
  const scrollViewRef = useRef(null);
  const { isAuthenticated } = useContext(AuthContext);

  const DareMeVoteScreen  = (index) => {
    if(isAuthenticated) {
      if(dareme.finished) {
        navigation.navigate('DareMe-Result');
      } else {
        dispatch({ type: SET_OPTION, payload: dareme.options[index] })
        navigation.navigate('DareMe-Vote', {
          daremeId: id,
          optionIndex: index,
          username: dareme.owner.name,
          ownerId: dareme.owner.id
        });
      }
    } else navigation.navigate('Auth')
    scrollToTop();
  }

  const ProfileScreen = () => {
    navigation.navigate('Profile', {
      id: dareme.owner.id,
      name: dareme.owner.name,
      avatar: dareme.owner.avatar
    });
    scrollToTop();
  }

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }

  const timeLeft = useMemo(() => {
    if(dareme.finished) return 'Ended';
    else {
      if(dareme.deadline && dareme.createdAt) {
        const values = [3600 * 24, 3600, 60];
        const units = ["day", "hour", "min"];
        const time = values[0] * dareme.deadline + Math.round(dareme.createdAt / 1000) - Math.round(Date.now() / 1000)

        if(time < 0) return 'less than 1 min left';

        const addUnit = (value, unit) => {
            return value.toString() + " " + (value === 1 ? unit : unit + "s");
        }

        let res = "";
        units.every((unit: string, index: number) => {
            const count = Math.ceil(time / values[index]);
            if (count >= 1) {
                res += addUnit(count, unit);
                return false;
            }
            return true;
        })
        res += ' left';
        return res;
      } else return '';
    }   
  }, [dareme]);

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

  const GetDareMeByDareMeId = async () => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      await GetDareMeById(id);
      dispatch({ type: SET_LOADING, payload: false });
    } catch (err) {
      dispatch({ type: SET_LOADING, payload: false });
      console.log(err);
    }
  }

  useFocusEffect(
    useCallback(() => {
      scrollToTop();
      GetDareMeByDareMeId();
    }, [id])
  );

  return (
    <ScrollView ref={scrollViewRef} vertical style={{ backgroundColor: '#FFFFFF' }}>
      <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10}}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>DareMe detail</Text>
        </View>
        {dareme.owner ? 
          <View style={styles.imageContainer}>
            <SliderBox
              images={dareme.photos.length > 0 ? dareme.photos : []}
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
                <Text style={styles.leftTime}>{timeLeft}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <SvgXml xml={DonutIconSvg('white')} />
                  <Text style={styles.voteInfoText}>{totalDonuts.toLocaleString()}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                  <SvgXml xml={UserGroupIconSvg('white')} />
                  <Text style={styles.voteInfoText}>{totalVoters.toLocaleString()}</Text>
                </View>
              </View>
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}>{dareme.title}</Text>
            </View>
          </View> : null }
          {dareme.owner ? 
          <View style={styles.toolContainer}>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={ProfileScreen}>
              <View style={styles.avatarContainer}>
                <Avatar avatar={dareme.owner.avatar} size={35} />
              </View>
              <View style={styles.username}>
                <Text>{dareme.owner.name}</Text>
              </View>
            </TouchableOpacity>
          </View> : null }
          {dareme.owner ? 
          <View style={styles.optionContainer}>
            <View style={{ marginVertical: 5 }}>
              <DareOption 
                title={dareme.options[0].title}
                username={dareme.owner.name}
                onPress={() => DareMeVoteScreen(0)} 
                voteInfo={dareme.options[0].voteInfo}
              />
            </View>
            <View style={{ marginVertical: 5 }}>
              <DareOption 
                title={dareme.options[1].title}
                username={dareme.owner.name}
                onPress={() => DareMeVoteScreen(1)}
                voteInfo={dareme.options[1].voteInfo}
              />
            </View>
          </View> : null }
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
  }
});

export default DareMeDetailScreen;