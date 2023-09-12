import React, { useRef, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, Button, Dimensions, StyleSheet, Text } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { useSelector } from "react-redux";
import { GetAllDareMes } from "../../redux/actions/daremeAction";
import DareMeCard from "../../components/DareMeCard";
import FanwallCard from "../../components/FanwallCard";

const HomeScreen = ({ navigation }) => {
  const { daremes } = useSelector((state) => state.dareme);
  const width = Dimensions.get('window').width;
  const scrollViewRef = useRef(null);

  const carouselItems = [
    {
        title:"Item 1",
    },
    {
        title:"Item 2",
    },
    {
        title:"Item 3",
    },
    {
        title:"Item 4",
    },
    {
        title:"Item 5",
    },
  ]

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      scrollToTop();
      GetAllDareMes();
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
        <Carousel
          containerCustomStyle={{ paddingVertical: 10 }}
          data={carouselItems}
          renderItem={renderFanwallCardItem}
          sliderWidth={width}
          itemWidth={320}
        />
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