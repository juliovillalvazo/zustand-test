import React, { useMemo } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useCartStore } from '@/store/cartStore';
import { Ionicons } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const CartButton = () => {
    const colorScheme = useColorScheme();
    const { items } = useCartStore();

    return (
        <Link href='/modal' asChild>
            <Pressable style={{ marginRight: 15 }}>
                {({ pressed }) => (
                    <View>
                        <Ionicons name='cart' size={28} />

                        <View style={styles.countContainer}>
                            <Text>{items()}</Text>
                        </View>
                    </View>
                )}
            </Pressable>
        </Link>
    );
};

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Tab One',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name='shopping-bag' color={color} />
                    ),
                    headerRight: () => <CartButton />,
                }}
            />
            <Tabs.Screen
                name='two'
                options={{
                    title: 'Tab Two',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name='shopping-cart' color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    countContainer: {
        position: 'absolute',
        bottom: -3,
        right: -3,
        backgroundColor: 'dodgerblue',
        borderRadius: 50,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
    },
});
