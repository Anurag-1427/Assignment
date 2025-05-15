import { StyleSheet } from 'react-native';
import { assets } from '../../assets';

export const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: assets.colors.appBgColor,
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
