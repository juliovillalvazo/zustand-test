import {
    StyleSheet,
    View,
    Text,
    ListRenderItem,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import data from '@/assets/data.json';
import { memo, useCallback, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '@/store/cartStore';

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => `${item.id}`}
                renderItem={RenderItem}
            />
        </View>
    );
}
const RenderItem: ListRenderItem<DataElement> = ({ item }) => (
    <Item item={item} />
);

const Item = memo(({ item }: { item: DataElement }) => {
    const { reduceProduct, addProduct, products } = useCartStore();

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
                <TouchableOpacity onPress={() => addProduct(item)}>
                    <Ionicons name='add' size={20} color='#8e0300' />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 16,
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
});
