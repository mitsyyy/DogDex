import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { getBreedImage, getSubBreedImage } from '../../api/dogApi';

export default function BreedDetails() {

    const { breed, group } = useLocalSearchParams();

    const [image, setImage] = useState<string>('');

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
                <ImageBackground source={{ uri: image }} style={styles.imageBackground}>
                    <MaterialDesignIcons name="arrow-left" size={24} color="white"/>
                    <Text>{breed}</Text>
                </ImageBackground>
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    imageBackground: {
        height: '70%',
        width: '100%',
    }
});