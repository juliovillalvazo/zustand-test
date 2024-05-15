import { StatusBar } from 'expo-status-bar';
import {
    Platform,
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
    ListRenderItem,
    FlatList,
    Button,
    Alert,
} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function ModalScreen() {
    const { products } = useCartStore();
    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => `${item.id}`}
                renderItem={RenderItem}
                ListFooterComponent={Footer}
                ListEmptyComponent={EmptyComponent}
            />
        </View>
    );
}

const RenderItem: ListRenderItem<DataElement & { quantity: number }> = ({
    item,
}) => <Item item={item} />;

const Item = memo(({ item }: { item: DataElement & { quantity: number } }) => {
    const { reduceProduct, addProduct } = useCartStore();

    return (
        <View style={styles.cartItemContainer}>
            <Image style={styles.cartItemImage} src={item.image} />
            <View style={styles.itemContainer}>
                <Text>{item.title}</Text>
                <Text>{item.price}</Text>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={() => reduceProduct(item)}>
                    <Ionicons name='remove' size={20} color='#000' />
                </TouchableOpacity>
                <Text>{item.quantity}</Text>
                <TouchableOpacity onPress={() => addProduct(item)}>
                    <Ionicons name='add' size={20} color='#8e0300' />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const Footer = memo(() => {
    const { clearCart, total } = useCartStore();

    const handleClearCart = () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to clear the cart?',
            [
                {
                    text: 'cancel',
                    style: 'cancel',
                },
                {
                    text: 'clear',
                    style: 'destructive',
                    onPress: clearCart,
                },
            ],
            {
                cancelable: true,
            },
        );
    };
    return (
        <View style={styles.footer}>
            <Text>Total: {total()}</Text>
            <Button title='clear cart' onPress={handleClearCart} />
        </View>
    );
});

const EmptyComponent = memo(() => {
    return (
        <View style={[styles.container, styles.alignCenter]}>
            <Text>Cart is empty</Text>
            <Ionicons name='cart-sharp' size={64} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 16,
    },
    alignCenter: {
        alignItems: 'center',
    },
    cartItemContainer: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    cartItemImage: {
        width: 50,
        height: 50,
        objectFit: 'contain',
    },
    itemContainer: {
        flex: 1,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
});
