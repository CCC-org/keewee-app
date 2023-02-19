import { Pressable, Text } from 'react-native';
import React from 'react';
import { Snackbar, useTheme } from 'react-native-paper';

interface SnackBarProps {
  visible: boolean;
  actionText?: string;
  text: string;
  onDismiss?: () => void;
  onPressSnackBar?: () => void;
  onPressAction?: () => void;
  style?: any;
  duration?: number;
}

const SnackBar = (props: SnackBarProps) => {
  const theme = useTheme();
  const { visible, text, actionText, onDismiss, onPressSnackBar, onPressAction, duration } = props;
  return (
    <>
      <Pressable onPress={onPressSnackBar} style={[props.style, { marginBottom: 20 }]}>
        <Snackbar
          duration={duration ?? 3000}
          visible={visible}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onDismiss={onDismiss || (() => {})}
          action={{
            label: actionText || '',
            color: theme.colors.graphic.coral,
          }}
          style={{
            width: 343,
            height: 60,
            borderRadius: 8,
            paddingHorizontal: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: `${theme.colors.graphic.black}cc`,
          }}
        >
          <Text>{text}</Text>
        </Snackbar>
      </Pressable>
    </>
  );
};

export default SnackBar;
