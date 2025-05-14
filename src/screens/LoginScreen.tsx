import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setMobile } from '../redux/slices/authSlice';
import { loginUser } from '../api/services/authService';
import { assets } from '../assets';
import CustomButton from '../components/common/CustomButton';

export default function LoginScreen() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            await loginUser(phoneNumber);
            dispatch(setMobile(phoneNumber));
            navigation.navigate('Otp' as never);
        } catch (err) {
            setError('Failed to request OTP');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={assets.images.logo} style={styles.imageStyle} />
                <Text style={styles.textStyle}>{assets.strings.LOGIN_SCREEN_HEADING_TEXT}</Text>
            </View>
            <View style={styles.signInContainer}>
                <Text style={styles.signInText}>{assets.strings.LOGIN_SCREEN_SIGN_IN_TEXT}</Text>
                <Text
                    style={styles.signInSubHeadingText}
                >{assets.strings.LOGIN_SCREEN_SIGN_IN_SUB_HEADING_TEXT} </Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder={assets.strings.LOGIN_SCREEN_TEXT_INPUT_PLACEHOLDER}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />
                </View>
                <View style={styles.btnContainer}>
                    <CustomButton btnText={assets.strings.PROCEED_TEXT} btnPress={handleLogin} />
                </View>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View >
    );
}

const styles = StyleSheet.create({
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
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 35,
    },
    btnContainer: {
        marginTop: 28,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});
