import { FreckleFace_400Regular, useFonts } from '@expo-google-fonts/freckle-face';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function home() {
    const [fontsLoaded] = useFonts({
        FreckleFace_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View>
            <View>
                <View style={styles.logo}>
                    <MaterialDesignIcons name="paw" size={24} color="#3b3025" />
                    <Text style={styles.logoName}>DogDex</Text>
                </View>
                <View>
                    <Image source={require('../../../assets/images/dogpfp.jpg')} style={styles.profile}/>
                </View>
            </View>

            <View>
                
            </View>
        </View>
    );
} 

const styles =  StyleSheet.create ({
logo: {
    flexDirection: 'row',
    alignItems: 'center',
},

logoName: {
    fontFamily: 'FreckleFace_400Regular',
    color: '#3b3025',
},

profile: {
width: 20,
height: 20
}
});