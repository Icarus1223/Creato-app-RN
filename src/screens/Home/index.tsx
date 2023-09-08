import React, { useRef, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, Button, Dimensions, StyleSheet, Text } from "react-native";
import Carousel from 'react-native-snap-carousel';
import DareMeCard from "../../components/DareMeCard";
import FanwallCard from "../../components/FanwallCard";

const HomeScreen = ({ navigation }) => {
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

  const finishedDareme = [
    {
        title:"Finished Dareme Title 1",
        finished: true
    },
    {
        title:"Finished Dareme Title 2",
        finished: true
    },
    {
        title:"Finished Dareme Title 3",
        finished: true
    },
    {
        title:"Finished Dareme Title 4",
        finished: true
    },
    {
        title:"Finished Dareme Title 5",
        finished: true
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
        <Carousel
          containerCustomStyle={{ paddingVertical: 10 }}
          data={carouselItems}
          renderItem={renderDareMeCardItem}
          sliderWidth={width}
          itemWidth={320}
        />
      </View>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Finished DareMe</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Carousel
          containerCustomStyle={{ paddingVertical: 10 }}
          data={finishedDareme}
          renderItem={renderDareMeCardItem}
          sliderWidth={width}
          itemWidth={320}
        />
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