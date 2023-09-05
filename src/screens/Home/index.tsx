import { ScrollView, View, Button, Dimensions, StyleSheet, Image } from "react-native";
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
      <View style={styles.container1}>
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
  container1: {
    marginVertical: 10,
  }
})

export default HomeScreen;