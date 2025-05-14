import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setToken } from '../redux/slices/authSlice';
import { verifyOtp } from '../api/services/authService';
import { useNavigation } from '@react-navigation/native';
import { assets } from '../assets';
import CustomButton from '../components/common/CustomButton';

export default function OtpScreen() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const mobile = useSelector((state: RootState) => state.auth.mobile);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleVerify = async () => {
        try {
            const res = await verifyOtp(mobile, otp);
            dispatch(setToken(res.data.token));
            navigation.navigate('Items' as never);
        } catch (err) {
            setError('Invalid OTP');
        }
    };

    const maskIndianMobileNumber = (number: string): string => {
        if (number.length !== 10) {
            Alert.alert('Invalid Number', 'Mobile number must be exactly 10 digits');
            return number;
        }

        return `+91${number.substring(0, 2)}******${number.substring(8)}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.backbtnContainer}>
                <Text>Back</Text>
            </View>

            <View style={styles.otpScreenHeadingContainer}>
                <Text style={styles.otpScreenHeadingText}>{assets.strings.OTP_SCREEN_HEADING_TEXT}</Text>
            </View>
            <View style={styles.otpScreenSubHeadingContainer}>
                <Text style={styles.otpScreenSubHeadingText}>{assets.strings.OTP_SCREEN_SUB_HEADING_TEXT} {maskIndianMobileNumber(mobile)}</Text>
            </View>

            <TextInput
                placeholder={assets.strings.OTP_SCREEN_TEXT_INPUT_PLACEHOLDER}
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                style={styles.input}
            />
            <CustomButton btnText={assets.strings.VERIFY_TEXT} btnPress={handleVerify} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderColor: 'red',
        backgroundColor: assets.colors.appBgColor,
    },
    backbtnContainer: {
        borderWidth: 1, // important as per design
        width: '10%',
        borderRadius: 50,
        padding: 5,
        borderColor: assets.colors.greyBorderColor,
        marginTop: 63,
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
    },
    otpScreenSubHeadingContainer: {
        width: '60%',
    },
    otpScreenSubHeadingText: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
    },
    error: { color: 'red' },
});
