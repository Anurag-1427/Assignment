import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
            console.log(`res: `, res)
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
                <Text style={styles.otpScreenHeadingText}>Almost ready to pour!</Text>
            </View>
            <View style={styles.otpScreenSubHeadingContainer}>
                <Text style={styles.otpScreenSubHeadingText}>Please enter the otp sent to your mobile no. {maskIndianMobileNumber(mobile)}</Text>
            </View>

            {/* <Text>Mobile: {mobile}</Text> */}
            <TextInput
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                style={styles.input}
            />
            <CustomButton btnText={'Verify'} btnPress={handleVerify} />
            {/* <Button title="Verify OTP" onPress={handleVerify} /> */}
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // borderWidth: 1,
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
        // borderWidth: 1,
        width: '70%',
    },
    otpScreenHeadingText: {
        // borderWidth: 1,
        fontWeight: '800',
        fontSize: 24,
        textTransform: 'uppercase',
        color: assets.colors.headingColor,
        lineHeight: 42,
    },
    otpScreenSubHeadingContainer: {
        // borderWidth: 1,
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
        // marginBottom: 10
    },
    error: { color: 'red' },
});
