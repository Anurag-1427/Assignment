import React, { useState } from 'react';
import { View, TextInput, Text, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setMobile } from '../../redux/slices/authSlice';
import { loginUser } from '../../api/services/authService';
import { assets } from '../../assets';
import CustomButton from '../../components/common/CustomButton';
import Icon from 'react-native-vector-icons/Feather';
import { AppDispatch } from '../../redux/store';
import { styles } from './styles';

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigation = useNavigation<NavigationProp<any>>();
    const dispatch = useDispatch<AppDispatch>();

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
                    <Icon name="phone" size={23} color={assets.colors.greyBorderColor} style={styles.phoneIconStyle} />
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
};

export default LoginScreen;
