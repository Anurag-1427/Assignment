import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { setToken } from '../../redux/slices/authSlice';
import { loginUser, verifyOtp } from '../../api/services/authService';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { assets } from '../../assets';
import CustomButton from '../../components/common/CustomButton';
import Icon from 'react-native-vector-icons/Feather';
import { OtpInput } from 'react-native-otp-entry';
import { styles } from './styles';

const OtpScreen = () => {
    const [otp, setOtp] = useState<string>('');
    const [errorResendingCode, setErrorResendingCode] = useState<string>('');
    const [secondsLeft, setSecondsLeft] = useState<number>(60);
    const [isResendActive, setIsResendActive] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const mobile = useSelector((state: RootState) => state.auth.mobile);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NavigationProp<any>>();

    const handleVerify = async () => {
        try {
            const res = await verifyOtp(mobile, otp);
            dispatch(setToken(res.data.token));
            navigation.navigate('Items' as never);
        } catch (err) {
            setError(assets.strings.INVALID_OTP_CODE);
        }
    };

    const maskIndianMobileNumber = (number: string): string => {
        if (number.length !== 10) {
            Alert.alert('Invalid Number', 'Mobile number must be exactly 10 digits');
            return number;
        }

        return `+91${number.substring(0, 2)}******${number.substring(8)}`;
    };

    useEffect(() => {
        if (secondsLeft === 0) {
            setIsResendActive(true);
            return;
        }

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft]);

    const handleResend = async (mobile) => {
        if (!isResendActive) {
            return;
        }
        console.log('Resending OTP...');
        try {
            await loginUser(mobile);
            setErrorResendingCode('');

        } catch (error) {
            setErrorResendingCode('Failed to request OTP');
        }

        setSecondsLeft(60);
        setIsResendActive(false);
        setErrorResendingCode('');
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backbtnContainer}>
                <Icon name="arrow-left" size={20} color="#0D1318" />;
            </Pressable>

            <View style={styles.otpScreenHeadingContainer}>
                <Text style={styles.otpScreenHeadingText}>{assets.strings.OTP_SCREEN_HEADING_TEXT}</Text>
            </View>
            <View style={styles.otpScreenSubHeadingContainer}>
                <Text style={styles.otpScreenSubHeadingText}>{assets.strings.OTP_SCREEN_SUB_HEADING_TEXT} {maskIndianMobileNumber(mobile)}</Text>
            </View>

            <View style={styles.otpInputContainer}>
                <OtpInput
                    numberOfDigits={4}
                    onTextChange={setOtp}
                    type="numeric"
                    placeholder={'----'}
                    theme={{
                        pinCodeContainerStyle: styles.otpInputPinCodeContainerStyle,
                        pinCodeTextStyle: styles.otpInputPinCodeTextStyle,
                    }}
                />
                {
                    secondsLeft === 0 ?
                        <Pressable
                            onPress={() => handleResend(mobile)}
                            style={styles.resendCodeContainer}
                        >
                            <Text style={styles.resendCodeText}>
                                {assets.strings.RESEND_CODE_TEXT}
                            </Text>
                        </Pressable>
                        :
                        <View style={styles.resendCodeCounterContainer}>
                            <Text style={styles.resendCodeCounterText}>
                                {`Resend code in 00:${secondsLeft < 10 ? `0${secondsLeft}` : `${secondsLeft}`}`}
                            </Text>
                        </View>
                }
                {errorResendingCode && secondsLeft === 0 ? <Text style={styles.errorResendingCodeText}>{errorResendingCode}</Text> : null}
            </View>
            <CustomButton btnText={assets.strings.VERIFY_TEXT} btnPress={handleVerify} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

export default OtpScreen;

