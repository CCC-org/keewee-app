import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Modal, Portal, useTheme } from 'react-native-paper';
import BottomFixButton from '../buttons/BottomFixButton';

interface TwoButtonModalProps {
  dismissable: boolean;
  visible: boolean;
  onDismiss: () => void;
  mainTitle: string;
  subTitle?: string;
  leftButtonText: string;
  rightButtonText: string;
  leftButtonPress: () => void;
  rightButtonPress: () => void;
  rightButtonColor?: string;
}

const TwoButtonModal = ({
  dismissable,
  leftButtonPress,
  leftButtonText,
  mainTitle,
  onDismiss,
  rightButtonPress,
  rightButtonText,
  rightButtonColor,
  subTitle,
  visible,
}: TwoButtonModalProps) => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        dismissable={dismissable}
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text style={{ ...theme.fonts.text.headline1, marginBottom: 8 }}>{mainTitle}</Text>
        {subTitle ? <Text style={theme.fonts.text.body1.regular}>{subTitle}</Text> : null}
        <View style={styles.modalButtonGroup}>
          <BottomFixButton
            isActive={true}
            text={leftButtonText}
            width={152}
            height={52}
            color={`${theme.colors.graphic.black}1a`}
            textColor={`${theme.colors.graphic.black}cc`}
            buttonStyle={styles.modalButton}
            onPress={leftButtonPress}
          />
          <BottomFixButton
            isActive={true}
            text={rightButtonText}
            width={152}
            height={52}
            color={rightButtonColor ?? theme.colors.graphic.black}
            textColor={theme.colors.graphic.white}
            buttonStyle={styles.modalButton}
            onPress={rightButtonPress}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default TwoButtonModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 28,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  modalButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalButton: {
    borderRadius: 12,
    marginHorizontal: 12,
  },
});
