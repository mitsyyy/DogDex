import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import GroupCard from './GroupCard';

const groups = [
    {
        name: 'Terrier',
        image: require('../../assets/images/groups/terrier.jpg'),
    },
    {
        name: 'Hound',
        image: require('../../assets/images/groups/hound.jpg'),
    },
    {
        name: 'Spaniel',
        image: require('../../assets/images/groups/spaniel.jpg'),
    },
    {
        name: 'Retriever',
        image: require('../../assets/images/groups/retriever.jpg'),
    },
    {
        name: 'Poodle',
        image: require('../../assets/images/groups/poodle.jpg'),
    },
    {
        name: 'Mastiff',
        image: require('../../assets/images/groups/mastiff.jpg'),
    },
]
export default function BrowseGroups() {
    return (
        <View>
            <View>
                <Text>Browse by Groups</Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={groups}
                    keyExtractor={(group) => group.name}
                    numColumns={3}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.container}
                    renderItem={({ item: group }) => (
                        <View style={styles.cardContainer}>
                            <GroupCard
                                name={group.name}
                                image={group.image}
                                onPress={() =>
                                    router.push({
                                        pathname: '../group/[group]',
                                        params: {
                                            group: group.name.toLowerCase(),
                                        }
                                    })
                                }
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    row: {

    },

    cardContainer: {

    }
})