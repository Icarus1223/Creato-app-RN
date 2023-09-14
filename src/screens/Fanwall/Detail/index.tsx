import { useCallback, useMemo } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import DareOption from "../../../components/DareOption";
import Avatar from "../../../components/common/Avatar";
import { SET_LOADING } from "../../../redux/actionTypes";
import { GetFanwallById } from "../../../redux/actions/fanwallAction";
import { PrimaryButton } from "../../../components/common/Button";
import { DonutIconSvg, UserGroupIconSvg } from "../../../assets/svg";

const FanwallDetailScreen = ({ navigation, route }) => {
	const { id } = route.params;
	const { fanwall } = useSelector(state => state.fanwall);
	const dispatch = useDispatch();

	const DareMeDetailScreen = () => {
		navigation.navigate('DareMe-Result', { id: fanwall?.dareme?.id });
	}

	const ProfileScreen = () => {
		navigation.navigate('Profile', {
			id: fanwall.dareme.owner.id,
			name: fanwall.dareme.owner.name,
			avatar: fanwall.dareme.owner.avatar
		});
	}

	const GetFanwallByFanwallId = async () => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      await GetFanwallById(id);
      dispatch({ type: SET_LOADING, payload: false });
    } catch (err) {
      dispatch({ type: SET_LOADING, payload: false });
      console.log(err);
    }
  }

  useFocusEffect(
    useCallback(() => {
      GetFanwallByFanwallId();
    }, [id])
  );

  const winIndex = useMemo(() => {
    if(fanwall) {
    	const { dareme } = fanwall
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
    } return 0
  }, [fanwall])

  const totalDonuts = useMemo(() => {
    if(fanwall) {
    	const { dareme } = fanwall
      return dareme.options.reduce((count, current) => {
        if(current.voteInfo) {
          current.voteInfo.forEach((vote) => {
            count += vote.amount;
          })
          return count;
        } else return count;
      }, 0);
    } else return 0
  }, [fanwall]);

  const totalVoters = useMemo(() => {
    if(fanwall) {
    	const { dareme } = fanwall
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
  }, [fanwall]);

	return (
		<ScrollView vertical style={{ backgroundColor: '#FFF' }} >
			<View style={{ width: '100%', alignItems: 'center', paddingVertical: 10}} >
				<View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Post Detail</Text>
        </View>
				<View style={styles.container}>
					<View style={styles.containerHeader}>
						<View>
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
					</View>
					<View style={styles.title}>
						<Text style={styles.titleText}>{fanwall?.dareme?.title}</Text>
					</View>
					<Image
						style={{ width: 324, height: 576 }}
						source={{ uri: fanwall?.photo }}
					/>
					<View style={{ borderTopWidth: 0.5, borderTopColor: 'grey', width: '100%', marginVertical: 10}}></View>
					<View style={{ width: 304, marginLeft: 'auto', marginRight: 'auto' }}>
						<DareOption 
							username={fanwall ? fanwall.dareme.owner.name : ''} 
							title={fanwall ? fanwall.dareme.options[winIndex].title : ''}
							voteInfo={fanwall ? fanwall.dareme.options[winIndex].voteInfo : undefined} 
						/>
					</View>
					<View style={{ borderTopWidth: 0.5, borderTopColor: 'grey', width: '100%', marginVertical: 10}}></View>
					<View style={styles.toolContainer}>
						<TouchableOpacity style={{ flexDirection: 'row' }} onPress={ProfileScreen}>
							<View style={styles.avatarContainer}>
								<Avatar size={35} avatar={fanwall?.dareme?.owner?.avatar} />
							</View>
							<View style={styles.username}>
								<Text>{fanwall?.dareme?.owner.name}</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15, marginBottom: 10 }}>
						<PrimaryButton text="See DareMe" width={310} onPress={DareMeDetailScreen} />
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

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
	container: {
		width: 340,
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingHorizontal: 8,
		paddingVertical: 5,
		backgroundColor: '#FFFFFF',
		shadowColor: 'rgb(0, 0, 0, 0.15)',
	  shadowOffset: {
		  width: 2,
		  height: 4,
		 },
	  shadowOpacity: 0.15,
	  shadowRadius: 10,
		borderRadius: 10,
	},
	containerHeader: {
		marginVertical: 5,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	voteInfoText: {
		marginLeft: 3,
		fontSize: 14,
		lineHeight: 16,
		fontWeight: 'bold',
		color: 'grey'
	},
	title: {
		marginVertical: 10,
		paddingHorizontal: 5,

	},
	titleText: {
		color: 'black',
		fontSize: 24,
		lineHeight: 28,
		fontWeight: 800,
	},
	toolContainer: {
		width: '100%',
		height: 48,
		padding: 4,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
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

export default FanwallDetailScreen;