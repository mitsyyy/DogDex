import { Tabs } from 'expo-router';

export default function MainLayout() {
    return (
        <Tabs>
            <Tabs.Screen 
            name="home" 
            options={{
                headerShown: false,
            }} />
            <Tabs.Screen 
            name="save"
            options={{
                headerShown: false,
            }}
            />
        </Tabs>
    );
}