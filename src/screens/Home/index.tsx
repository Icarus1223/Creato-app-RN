import { SafeAreaView, View, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Auth', {name: 'Jane'})
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;