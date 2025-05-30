import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/store';
import { assets } from '../../assets';
import { styles } from './styles';

const STORE_ID = '27bb8b72-d0e7-4da1-9bf0-58dc802931d7';
const CATEGORY_ID = '47c817e5-659b-4af3-8c5a-81ed50430711';

const ItemListScreen = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state: RootState) => state.product);
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(getProductList({ token, storeId: STORE_ID, categoryId: CATEGORY_ID }));
        } else {
            console.log('Token is missing, skipping product fetch');
            Alert.alert(assets.strings.ERROR_OCCURRED);
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
                >{assets.strings.INDIAN_CURRENCY_SYMBOL} {item.delivery_price}</Text>
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
            {assets.strings.ERROR_TEXT} {error}
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

export default ItemListScreen;
