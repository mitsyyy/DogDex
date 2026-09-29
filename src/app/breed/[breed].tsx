import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { getBreedImage, getSubBreedImage } from '../../api/dogApi';

export default function BreedDetails() {

    const { breed, group } = useLocalSearchParams();

    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        async function loadImage() {
            let breedImage;

            if (group) {
                breedImage = await getSubBreedImage(
                    group as string,
                    breed as string
                );

            } else {
                breedImage = await getBreedImage(
                    breed as string
                );
            }
            setImage(breedImage);
        }
        loadImage();
    }, [breed, group]);
    return (

        <SafeAreaView style={styles.mainContainer}>
            {image && (
                <ImageBackground source={{ uri: image }} style={styles.imageBackground} imageStyle={styles.image}>
                    <View style={styles.space}>
                        <View style={styles.iconContainer}>
                            <Pressable style={styles.icon}>
                                <MaterialDesignIcons name="arrow-left" size={24} color="black" />
                            </Pressable>
                            <Pressable style={styles.icon}>
                                <MaterialDesignIcons name="heart-outline" size={24} color="black" style={{ marginTop: 2 }} />
                            </Pressable >
                        </View>
                        <View style={styles.textContainer}>
                            <Text>{breed}</Text>
                        </View>
                    </View>
                </ImageBackground>
            )}
            <View style={styles.bottomContainer}>
            <Pressable>
                <Text>Save to Favorites</Text>
            </Pressable>
            </View>
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    icon: {
        backgroundColor: 'white',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },

    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    textContainer: {

    },

    space: {
        height: '100%',
        width: '100%',
        padding: 15,
        justifyContent: 'space-between',
    },

    imageBackground: {
        height: '45%',
        width: '100%',
    },

    image: {
        width: '100%',
        height: '100%'
    },

    bottomContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -15
    }
});