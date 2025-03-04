import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import React from 'react';

interface HeaderRightButtonProps {
  text: string;
  backGroundColor: string;
  textColor: string;
  borderLine: boolean;
  disabled: boolean;
  height?: number;
  width?: number;
  borderColor?: string;
  handlePress: () => void;
  pressableStyle?: StyleProp<ViewStyle>;
}

const HeaderRightButton = (props: HeaderRightButtonProps) => {
  const {
    text,
    backGroundColor,
    textColor,
    borderLine,
    borderColor,
    disabled,
    handlePress,
    height,
    width,
    pressableStyle,
  } = props;
  return (
    <>
      <Pressable
        onPress={() => handlePress()}
        style={[
          {
            padding: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backGroundColor,
            borderWidth: borderLine ? 1 : 0,
            borderColor: borderColor ?? '#121314',
            height: height ? height : 32,
            width: width ? width : 49,
            marginRight: 16,
          },
          styles.btn,
          pressableStyle,
        ]}
        disabled={disabled}
      >
        <Text style={{ ...styles.text, color: textColor, fontSize: 14 }}>{text}</Text>
      </Pressable>
    </>
  );
};

export default HeaderRightButton;

const styles = StyleSheet.create({
  btn: {
    padding: 0,
    borderRadius: 30,
  },
  text: {
    fontWeight: '600',
  },
});
