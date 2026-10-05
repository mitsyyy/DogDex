import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
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
];

export default function BrowseGroups() {
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>Browse by Group</Text>
            </View>

            <View style={styles.grid}>
                {groups.map((group) => (
                    <View key={group.name} style={styles.cardContainer}>
                        <GroupCard
                            name={group.name}
                            image={group.image}
                            onPress={() =>
                                router.push({
                                    pathname: '../group/[group]',
                                    params: {
                                        group: group.name.toLowerCase(),
                                    },
                                })
                            }
                        />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 24,
        marginBottom: 28,
    },

    header: {
        marginBottom: 14,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F1E1D',
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 14,
    },

    cardContainer: {
        width: '31%',
    },
});