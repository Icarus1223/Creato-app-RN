import { ScrollView, View, Button, Dimensions, StyleSheet, Text } from "react-native";
import Carousel from 'react-native-snap-carousel';
import DareMeCard from "../../components/DareMeCard";

const HomeScreen = ({ navigation }) => {
  const width = Dimensions.get('window').width;

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

  const renderItem = ({ item }) => {
    return <DareMeCard data={item} />;
  }

  return (
    <ScrollView style={{ backgroundColor: '#FFFFFF' }} >
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Ongoing DareMe 🙌🏻</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Carousel
          containerCustomStyle={{ paddingVertical: 10 }}
          data={carouselItems}
          renderItem={renderItem}
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
          data={carouselItems}
          renderItem={renderItem}
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
          renderItem={renderItem}
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