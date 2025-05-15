import { StyleSheet } from 'react-native';
import { assets } from '../../assets';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: assets.colors.appBgColor,
    },
    logoContainer: {
        borderColor: 'orange',
        alignItems: 'center',
        marginTop: 94,
    },
    imageStyle: {
        width: 200,
        height: 200,
    },
    textStyle: {
        fontSize: 24,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: 10,
    },
    signInContainer: {
        marginTop: 210,
    },
    signInText: {
        textTransform: 'uppercase',
        fontSize: 24,
        color: assets.colors.headingColor,
        fontWeight: '800',

    },
    signInSubHeadingText: {
        fontWeight: '400',
        fontSize: 14,
        marginTop: 15,
    },
    textInputContainer: {
        borderWidth: 1,
        borderColor: assets.colors.greyBorderColor,
        borderRadius: 50,
        paddingVertical: 5,
        alignItems: 'center',
        marginTop: 35,
        flexDirection: 'row',
    },
    phoneIconStyle: {
        paddingLeft: 22,
        paddingRight: 10,
    },
    btnContainer: {
        marginTop: 28,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});
