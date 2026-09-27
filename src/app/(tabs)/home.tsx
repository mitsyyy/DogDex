import { FreckleFace_400Regular, useFonts } from '@expo-google-fonts/freckle-face';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PopularBreeds from '../../components/PopularBreeds';

export default function Home() {
    const [fontsLoaded] = useFonts({
        FreckleFace_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.header}>
                <View style={styles.logo}>
                    <MaterialDesignIcons name="paw" size={25} color="#3b3025" />
                    <Text style={styles.logoName}>DogDex</Text>
                </View>
                <View>
                    <Image source={require('../../../assets/images/dogpfp.jpg')} style={styles.profile} />
                </View>
            </View>

            <View>
                <ImageBackground source={require('../../../assets/images/dog_banner.jpg')} style={styles.banner} >
                    <Text>EXPLORE</Text>
                    <Text>Meet Over 50+ Breeds</Text>
                </ImageBackground>
            </View>

            <PopularBreeds />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 15,
    },

    logo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },

    logoName: {
        fontFamily: 'FreckleFace_400Regular',
        color: '#3b3025',
        fontSize: 25
    },

    profile: {
        width: 40,
        height: 40,
        borderRadius: 50
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },

    banner: {
        height: 180,
        borderRadius: 30,
        overflow: 'hidden', 
    },
});