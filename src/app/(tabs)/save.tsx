import { router } from 'expo-router';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SavedBreedCard from '../../components/SavedBreedCard';
import { useDog } from '../../context/dogContext';


export default function Save() {
    const {
        savedDogs,
        removeSavedDog,
    } = useDog();

    return (
        <SafeAreaView>
            <Text>Saved Dogs</Text>
            <FlatList
                data={savedDogs}
                keyExtractor={(dog) => dog.name}
                renderItem={({ item }) => (
                    <SavedBreedCard
                        name={item.name}
                        image={item.image}
                        onPress={() => {
                            router.push({
                                pathname: '/breed/[breed]',
                                params: {
                                    breed: item.name,
                                    group: item.image,
                                },
                            });
                        }}
                        onRemove={() => {
                            removeSavedDog(item.name);
                        }}
                    />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})