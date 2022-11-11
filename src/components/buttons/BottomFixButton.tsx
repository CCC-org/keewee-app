import {
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  LayoutChangeEvent,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';

interface BottomFixButtonProps {
  style?: ViewStyle;
  isActive: boolean;
  text: string;
  color?: string;
  textColor?: string;
  width: number;
  onPress: () => void;
}

const BottomFixButton = ({
  isActive,
  text,
  color,
  textColor,
  width,
  onPress,
  ...props
}: BottomFixButtonProps) => {
  const theme = useTheme();
  return (
    <Pressable
      style={{
        ...styles.Button,
      }}
      onPress={() => {
        if (!isActive) return;
        onPress();
      }}
    >
      <View
        style={[
          {
            ...styles.Bottom,
            width: width,
            backgroundColor: color || theme.colors.graphic.black,
            opacity: isActive ? 1 : 0.2,
          },
          props.style,
        ]}
      >
        <Text style={{ ...styles.text, color: textColor ? textColor : 'white' }}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default BottomFixButton;

const styles = StyleSheet.create({
  Bottom: {
    height: 56,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    margin: 12,
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
});
