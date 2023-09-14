import { useRef, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, Button, Dimensions, StyleSheet, Text } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { useSelector, useDispatch } from "react-redux";
import { SET_LOADING } from "../../redux/actionTypes";
import { GetAllDareMes } from "../../redux/actions/daremeAction";
import { GetAllFanwalls } from "../../redux/actions/fanwallAction";
import DareMeCard from "../../components/DareMeCard";
import FanwallCard from "../../components/FanwallCard";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { daremes } = useSelector((state) => state.dareme);
  const { fanwalls } = useSelector(state => state.fanwall);
  const width = Dimensions.get('window').width;
  const scrollViewRef = useRef(null);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }

  const GetHomeScreenData = async () => {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      await Promise.all([GetAllDareMes(), GetAllFanwalls()]);
      dispatch({ type: SET_LOADING, payload: false });
    } catch (err) {
      console.log(err);
      dispatch({ type: SET_LOADING, payload: false });
    }
  }

  useFocusEffect(
    useCallback(() => {
      scrollToTop();
      GetHomeScreenData();
    }, [])
  );

  const renderDareMeCardItem = ({ item }) => {
    return <DareMeCard data={item} />;
  }

  const renderFanwallCardItem = ({ item }) => {
    return <FanwallCard data={item} />
  }

  return (
    <ScrollView ref={scrollViewRef} style={{ backgroundColor: '#FFFFFF' }} >
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Ongoing DareMe 🙌🏻</Text>
      </View>
      <View style={styles.sectionContainer}>
      {daremes.filter((dareme) => !dareme.finished).length > 0 ?
        <Carousel
          containerCustomStyle={{ paddingVertical: 10 }}
          data={daremes.filter((dareme) => !dareme.finished)}
          renderItem={renderDareMeCardItem}
          sliderWidth={width}
          itemWidth={320}
        /> : <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 8 }}>No Ongoing DareMes</Text>
     }
      </View>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Finished DareMe</Text>
      </View>
      <View style={styles.sectionContainer}>
      {daremes.filter((dareme) => dareme.finished).length > 0 ?
         <Carousel
          containerCustomStyle={{ paddingVertical: 10 }}
          data={daremes.filter((dareme) => dareme.finished)}
          renderItem={renderDareMeCardItem}
          sliderWidth={width}
          itemWidth={320}
        /> : <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 8 }}>No Finished DareMes</Text>
      }
      </View>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Posts on Fanwall</Text>
      </View>
      <View style={styles.sectionContainer}>
      {fanwalls.length > 0 ?
        <Carousel
          containerCustomStyle={{ paddingVertical: 10 }}
          data={fanwalls}
          renderItem={renderFanwallCardItem}
          sliderWidth={width}
          itemWidth={320}
        /> : <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 8 }}>No Posts</Text>
      }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionTitleContainer: {
    borderBottomColor: '#54504E',
    borderBottomWidth: 0.5,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: 600,
    marginTop: 10,
    color: '#54504E',
  },
  sectionContainer: {
    marginVertical: 10,
  }
})

export default HomeScreen;