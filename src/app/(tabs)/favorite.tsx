import { router } from 'expo-router';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FavoriteBreedCard from '../../components/FavoriteBreedCard';
import { useDog } from '../../context/dogContext';

export default function Favorite() {
    const {
        favoriteDogs,
        removeFavoriteDog,
    } = useDog();

    return (
        <SafeAreaView>
            <Text>Favorites</Text>

            <FlatList
            data={favoriteDogs}
            keyExtractor={(dog) => dog.name}
            renderItem={({ item }) => (
                <FavoriteBreedCard
                name={item.name}
                image={item.image}
                onPress={() => {
                    router.push({
                        pathname: '../breed/[breed]',
                        params: {
                            breed: item.name,
                            group: item.group,
                        },
                    });
                }}

                onFavoritePress={() => {
                    removeFavoriteDog(item.name);
                }}
                />
            )}

            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({

})