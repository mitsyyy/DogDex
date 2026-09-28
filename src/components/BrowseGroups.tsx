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
        image: require('../../assets/images/groups/terrier.jpg'),
    },
    {
        name: 'Spaniel',
        image: require('../../assets/images/groups/terrier.jpg'),
    },
    {
        name: 'Retriever',
        image: require('../../assets/images/groups/terrier.jpg'),
    },
    {
        name: 'Poodle',
        image: require('../../assets/images/groups/terrier.jpg'),
    },
    {
        name: 'Mestiff',
        image: require('../../assets/images/groups/terrier.jpg'),
    },
]
export default function BrowseGroups() {
    return (
        <View>
            <View>
                <Text>Browse by Groups</Text>
            </View>
            <View style={styles.container}>
                {groups.map((group) => (
                    <GroupCard
                        key={group.name}
                        name={group.name}
                        image={group.image}
                        onPress={() => router.push(`../group/${group.name}`)}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
})