import { View, Text, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import InterestChooseSection from '../../onboarding/InterestChooseSection';
import { TOTAL_TAG } from '../../../constants/Interests';
import HeaderText from '../../../components/texts/HeaderText';
import NumberProgressBar from '../../../components/bars/NumberProgressBar';
import ConditionalButton from '../../../components/buttons/ConditionalButton';
import { useTheme } from 'react-native-paper';

const InterestEditingScreen = ({ navigation, route }) => {
  const totalCategory = TOTAL_TAG;
  const theme = useTheme();
  const [customCategory, setCustomCategory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [conditionalText, setConditionalText] = useState<string>('관심사를 선택하세요');
  const [title] = useState(route?.params?.title);
  const [introduction] = useState(route?.params?.introduction);
  const [nickname] = useState(route?.params?.nickname);
  const [image] = useState(route?.params?.image);
  const [userId] = useState(route?.params?.userId);
  const [btnActive, setBtnActive] = useState<boolean>(true);

  const handleSelectTag = (tag: string) => {
    if (!selectedCategory.includes(tag)) {
      setSelectedCategory([...selectedCategory, tag].sort());
    } else {
      const newArr = selectedCategory.filter((e) => e !== tag);
      setSelectedCategory(newArr.sort());
    }
  };

  const handleCreateCategory = () =>
    navigation.navigate('CategoryCreate', {
      selectedCategory,
      customCategory,
      toScreen: 'InterestEditing',
    });

  const handleNextScreen = () => {
    navigation.navigate('ProfileEdit', {
      nickname,
      image,
      title,
      selectedCategory,
      introduction,
      userId,
    });
  };

  useEffect(() => {
    if (selectedCategory.length < 1) setConditionalText('관심사를 선택하세요');
    else if (selectedCategory.length > 5) setConditionalText('5개 이하로 선택하세요');
    else setConditionalText('완료');
  }, [selectedCategory]);

  useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    if (!route.params.hasOwnProperty('customCategory')) return;
    const { customCategory: paramCustomArr, selectedCategory: paramSelectedArr } = route.params;
    if (customCategory) {
      const newCustomArr = paramCustomArr.filter((i) => !customCategory.includes(i));
      setCustomCategory([...newCustomArr, ...customCategory]);
      setSelectedCategory(paramSelectedArr.sort());
    } else {
      setCustomCategory([]);
    }
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 50,
          justifyContent: 'space-between',
          marginBottom: 20,
          marginTop: 10,
          paddingHorizontal: 16,
        }}
      >
        <HeaderText header={'관심사를 설정하세요'} />
        <Text
          style={{
            ...theme.fonts.text.footnote,
            color: `${theme.colors.graphic.black}99`,
            marginTop: 8,
            marginLeft: 1,
          }}
        >
          최대 5개까지 추가할 수 있어요
        </Text>
      </View>
      <InterestChooseSection
        totalCategory={totalCategory}
        customCategory={customCategory}
        selectedCategory={selectedCategory}
        onSelect={handleSelectTag}
        onCreateCategory={handleCreateCategory}
      />
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <NumberProgressBar progressValue={selectedCategory.length} max={5} />
        <View style={{ marginBottom: 12, marginTop: 15 }}>
          <ConditionalButton
            isActive={
              selectedCategory.length > 0 && selectedCategory.length < 6 && btnActive === true
            }
            onPress={handleNextScreen}
            text={conditionalText}
            width={343}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InterestEditingScreen;
