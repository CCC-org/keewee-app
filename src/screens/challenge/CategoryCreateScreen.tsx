import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTheme } from 'react-native-paper';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import SmallTextInput from '../../components/texts/SmallTextInput';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const CategoryCreateScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [input, setInput] = useState<string>('');

  const handleComplete = () => {
    navigation.navigate(route.params?.toScreen, {
      selectedCategory: [input, ...selectedCategory],
      customCategory: [input, ...customCategory],
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '직접 추가',
    });
  }, []);

  useEffect(() => {
    if (input.length > 8) {
      setErrorMessage('8자 이내로 입력하세요.');
    } else if (input.includes(' ')) {
      setErrorMessage('띄어쓰기는 입력할 수 없어요.');
    } else if (!/^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(input) && input !== '') {
      setErrorMessage('한글, 영문만 입력할 수 있어요.');
    } else setErrorMessage('');
  }, [input]);

  useEffect(() => {
    setSelectedCategory(route.params?.selectedCategory ?? []);
    setCustomCategory(route.params?.customCategory ?? []);
  }, [route.params]);

  const active = useMemo(() => {
    return errorMessage.length === 0 && input.length > 0 && !/([^가-힣\x20])/i.test(input);
  }, [errorMessage, input]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          text="완료"
          backGroundColor={
            active ? theme.colors.brand.primary.main : `${theme.colors.graphic.black}33`
          }
          textColor={active ? theme.colors.graphic.black : theme.colors.graphic.white}
          borderLine={false}
          disabled={!active}
          handlePress={() => handleComplete()}
        />
      ),
    });
  }, [input, errorMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 20, paddingHorizontal: 17 }}>
        <SmallTextInput
          inputValue={input}
          setInputValue={setInput}
          placeholder={'관심사를 입력하세요'}
          errorMessage={errorMessage}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CategoryCreateScreen;
