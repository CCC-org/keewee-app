import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

interface BlandTextInputProps {
  textVal?: string;
  placeHolder?: string;
  setTextVal: React.Dispatch<React.SetStateAction<string>>;
}

const BlandTextInput = ({ setTextVal, placeHolder }: BlandTextInputProps) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeHolder ?? '새 폴더의 이름을 적어주세요.'}
      placeholderTextColor={'#12131450'}
      onChangeText={(text) => setTextVal(text)}
      autoFocus={true}
    />
  );
};

export default BlandTextInput;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#12131410',
    paddingHorizontal: 16,
  },
});
