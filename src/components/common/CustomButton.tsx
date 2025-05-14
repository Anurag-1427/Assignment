import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { assets } from '../../assets';

interface CustomButtonProps {
    btnText: string,
    btnPress: Function,
}

const CustomButton = ({ btnText, btnPress }: CustomButtonProps) => {
    return (
        <Pressable style={styles.btnContainer} onPress={() => btnPress()}>
            <Text style={styles.btnText}>{btnText}</Text>
        </Pressable>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    btnContainer: {
        paddingVertical: 15,
        backgroundColor: assets.colors.orangeColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    btnText: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 16,
        letterSpacing: 1,
    },
});