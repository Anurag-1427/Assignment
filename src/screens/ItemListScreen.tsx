import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../redux/slices/productSlice';
import { RootState } from '../redux/store';
import { assets } from '../assets';

const STORE_ID = '27bb8b72-d0e7-4da1-9bf0-58dc802931d7';
const CATEGORY_ID = '47c817e5-659b-4af3-8c5a-81ed50430711';

export default function ItemListScreen() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state: RootState) => state.product);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(getProductList({ token, storeId: STORE_ID, categoryId: CATEGORY_ID }));
        } else {
            console.log('Token is missing, skipping product fetch');
        }
    }, [token]);

    const renderHorizontalItem = ({ item }: any) => (
        <View style={styles.horizontalListContainer}>
            {
                item.image_link ?
                    <Image source={{ uri: item.image_link }} style={styles.horizontalListImage} /> :
                    <Image source={assets.images.horizontalListDefaultImage} style={styles.horizontalListImage} />
            }
            <View style={styles.horizontalListDetailContainer}>
                <Text
                    numberOfLines={1}
                    style={styles.horizontalListDetailItemTitleText}
                >{item.title}</Text>
                <Text
                    style={styles.horizontalListDetailItemCategoryNameText}
                >{item.category_name}</Text>
                <Text
                    style={styles.horizontalListDetailItemDeliveryPriceText}
                >₹ {item.delivery_price}</Text>
            </View>
        </View >
    )

    const renderVerticalItem = ({ item }: any) => (
        <View style={styles.item}>
            <Text
                style={styles.itemText}
            >{item.name}</Text>
            <FlatList
                data={item.products}
                keyExtractor={(item) => item.id}
                renderItem={renderHorizontalItem}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    if (loading) {
        return <View style={styles.center}>
            <ActivityIndicator size="large" />
        </View>;
    }
    if (error) {
        return <Text style={styles.center}>
            Error: {error}
        </Text >;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.itemListScreenHeadingText}>{products[0]?.name}</Text>
                <View style={styles.verticalListContainer}>
                    <FlatList
                        data={products[0]?.sub_categories}
                        keyExtractor={(item) => item.id}
                        renderItem={renderVerticalItem}
                    />
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    container: {
        flex: 1,
        // borderWidth: 1,
        backgroundColor: assets.colors.appBgColor,
        // padding: 20,
    },
    itemListScreenHeadingText: {
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 20,
        color: assets.colors.headingColor,
        marginTop: 40,
    },
    verticalListContainer: { marginTop: 12 },
    item: {
        borderTopWidth: 1, // important as per design
        borderTopColor: assets.colors.greyBorderColor,
        padding: 10,
        marginBottom: 10,
    },
    itemText: {
        fontWeight: '600',
        fontSize: 20,
        letterSpacing: 1,
        marginTop: 21,
    },
    horizontalListContainer: {
        // borderWidth: 1,
        marginHorizontal: 10,
        width: 168,
        borderRadius: 20,
        marginTop: 16,
        backgroundColor: assets.colors.darkOrangeColor,
    },
    horizontalListImage: {
        width: 165,
        height: 165,
        borderRadius: 20,
    },
    horizontalListDetailContainer: {
        marginTop: 14,
        marginHorizontal: 12,
        marginBottom: 13,
    },
    horizontalListDetailItemTitleText: {
        fontWeight: '500',
        fontSize: 16,
    },
    horizontalListDetailItemCategoryNameText: {
        fontWeight: '400',
        fontSize: 14,
        color: assets.colors.greyishTextColor,
    },
    horizontalListDetailItemDeliveryPriceText: {
        fontWeight: '700',
        fontSize: 16,
        marginTop: 12,
    },
});
