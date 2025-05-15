import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import OtpScreen from '../screens/OtpScreen/OtpScreen';
import ItemListScreen from '../screens/ItemListScreen/ItemListScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Otp" component={OtpScreen} />
            <Stack.Screen name="Items" component={ItemListScreen} />
        </Stack.Navigator>
    );
}
