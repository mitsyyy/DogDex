import { FreckleFace_400Regular, useFonts } from '@expo-google-fonts/freckle-face';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

export default function home() {
  const [fontsLoaded] = useFonts({
    FreckleFace_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <ImageBackground source={require('../../assets/images/dog_bg.png')}
      style={styles.mainContainer}
      resizeMode="cover"
    >
      <View style={styles.headerContent}>
        <View style={styles.logo}>
          <MaterialDesignIcons name="paw" size={55} color="white" />
          <Text style={styles.logoName}>DogDex</Text>
        </View>
        <View>
          <Text style={styles.text}>Discover. Learn. Love.</Text>
        </View>
      </View>

      <View style={styles.bottomContent}>
        <Text style={styles.text}>Explore thSousands of dog breeds, find your favorites, and learn more about your furry friends.</Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
          <MaterialDesignIcons name="arrow-right" />
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 50
  },

  headerContent: {
    gap: 15
  },

  bottomContent: {
    gap: 30
  },

  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  logoName: {
    color: 'white',
    fontFamily: 'FreckleFace_400Regular',
    fontSize: 60,
  },

  text: {
    color: 'white',
    textAlign: 'center'
  },

  button: {
    color: 'black',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  buttonText: {
    fontSize: 15,
    textAlign: 'center'
  },

})