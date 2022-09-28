import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

interface InsightLinkTriggerButtonProps {
  onPress: () => void;
}

const InsightLinkTriggerButton = ({ onPress }: InsightLinkTriggerButtonProps) => {
  const { fonts } = useTheme();
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Feather name="link-2" size={24} color="#12131450" />
      <Text style={{ ...fonts.text.body1.regular, ...styles.text }}>인사이트를 얻은 링크</Text>
    </Pressable>
  );
};

export default InsightLinkTriggerButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    paddingLeft: 16,
    borderColor: '#12131420',
  },
  text: {
    marginLeft: 8,
    color: '#12131450',
  },
});
