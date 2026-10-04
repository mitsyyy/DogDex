import type { ComponentProps } from 'react';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IconName = ComponentProps<typeof MaterialDesignIcons>['name'];

interface TabItemConfig {
    name: string;
    label: string;
    activeIcon: IconName;
    inactiveIcon: IconName;
}

function CustomTabBar({ state, navigation }: any) {
    const insets = useSafeAreaInsets();

    const mainTabs: TabItemConfig[] = [
        {
            name: 'home',
            label: 'Home',
            activeIcon: 'home',
            inactiveIcon: 'home-outline',
        },
        {
            name: 'favorite',
            label: 'Favorites',
            activeIcon: 'heart',
            inactiveIcon: 'heart-outline',
        },
        {
            name: 'save',
            label: 'Saved',
            activeIcon: 'bookmark',
            inactiveIcon: 'bookmark-outline',
        },
    ];

    const currentRoute = state.routes[state.index]?.name;
    const isSearchActive = currentRoute === 'search';

    return (
        <View style={[styles.tabBarWrapper, { bottom: Math.max(insets.bottom, 12) }]}>
            <View style={styles.dock}>
                {mainTabs.map((tab) => {
                    const isFocused = currentRoute === tab.name;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: tab.name,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(tab.name);
                        }
                    };

                    return (
                        <Pressable
                            key={tab.name}
                            onPress={onPress}
                            style={[
                                styles.tabItem,
                                isFocused && styles.tabItemActive,
                            ]}
                            hitSlop={6}
                            accessibilityRole="button"
                            accessibilityState={{ selected: isFocused }}
                            accessibilityLabel={tab.label}
                        >
                            <MaterialDesignIcons
                                name={isFocused ? tab.activeIcon : tab.inactiveIcon}
                                size={22}
                                color={isFocused ? '#3B3025' : '#9E9084'}
                            />

                            <Text
                                style={[
                                    styles.tabLabel,
                                    isFocused && styles.tabLabelActive,
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            <Pressable
                onPress={() => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: 'search',
                        canPreventDefault: true,
                    });

                    if (!isSearchActive && !event.defaultPrevented) {
                        navigation.navigate('search');
                    }
                }}
                style={[
                    styles.searchButton,
                    isSearchActive && styles.searchButtonActive,
                ]}
                hitSlop={6}
                accessibilityRole="button"
                accessibilityState={{ selected: isSearchActive }}
                accessibilityLabel="Search"
            >
                <MaterialDesignIcons
                    name="magnify"
                    size={24}
                    color={isSearchActive ? '#3B3025' : '#9E9084'}
                />
            </Pressable>
        </View>
    );
}

export default function MainLayout() {
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="home" />

            <Tabs.Screen name="favorite" />

            <Tabs.Screen name="save" />

            <Tabs.Screen name="search" />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarWrapper: {
        position: 'absolute',
        left: 16,
        right: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },

    dock: {
        flex: 1,
        height: 64,
        backgroundColor: '#FFFFFF',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#EFEBE4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        shadowColor: '#3B3025',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 6,
    },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 22,
    },

    tabItemActive: {
        backgroundColor: '#F4ECE4',
    },

    tabLabel: {
        fontSize: 11,
        fontWeight: '500',
        color: '#9E9084',
        marginTop: 3,
    },

    tabLabelActive: {
        color: '#3B3025',
        fontWeight: '700',
    },

    searchButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EFEBE4',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        shadowColor: '#3B3025',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 6,
    },

    searchButtonActive: {
        backgroundColor: '#F4ECE4',
        borderWidth: 1.5,
        borderColor: '#C87D55',
    },
});