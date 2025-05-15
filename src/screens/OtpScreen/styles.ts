import { StyleSheet } from 'react-native';
import { assets } from '../../assets';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderColor: 'red',
        backgroundColor: assets.colors.appBgColor,
    },
    backbtnContainer: {
        borderWidth: 1, // important as per design
        width: '10%',
        borderRadius: '50%',
        padding: 7,
        borderColor: assets.colors.greyBorderColor,
        marginTop: 63,
        alignItems: 'center',
        justifyContent: 'center',
    },
    otpScreenHeadingContainer: {
        width: '70%',
    },
    otpScreenHeadingText: {
        fontWeight: '800',
        fontSize: 24,
        textTransform: 'uppercase',
        color: assets.colors.headingColor,
        lineHeight: 42,
        marginTop: 21,
    },
    otpScreenSubHeadingContainer: {
        width: '60%',
    },
    otpScreenSubHeadingText: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
    },
    otpInputContainer: {
        marginTop: 15,
        marginBottom: 32,
    },
    otpInputPinCodeContainerStyle: { width: '22%' },
    otpInputPinCodeTextStyle: {
        fontSize: 21,
    },
    resendCodeContainer: { marginTop: 32 },
    resendCodeText: {
        fontWeight: '500',
        fontSize: 12,
        textAlign: 'center',
        color: assets.colors.headingColor,
    },
    resendCodeCounterContainer: { marginTop: 32 },
    resendCodeCounterText: {
        fontWeight: '500',
        fontSize: 12,
        textAlign: 'center',
    },
    errorResendingCodeText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    error: {
        color: 'red',
    },
});
