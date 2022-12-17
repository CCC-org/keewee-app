import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import MypageProfile from '../../../components/profile/MypageProfile';
import { useTheme } from 'react-native-paper';
import { Feather, Ionicons } from '@expo/vector-icons';
import MypageTitle from '../../../components/title/MypageTitle';
import DividerBar from '../../../components/bars/DividerBar';
import InterestIcon from './InterestIcon';
//import RNFadedScrollView from 'rn-faded-scrollview';

const MyPageScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  if (userId === null || userId === undefined) {
    //alert('userId를 인식할 수 없었습니다.');
    //return null;
  }
  const theme = useTheme();
  const [interests, setInterests] = useState([
    '관심사1',
    '관심사2',
    '관심사3',
    '관심사4',
    '관심사5',
  ]);
  const [iconColor, setIconColor] = useState([
    ['#9350E9', '#9350E91a'],
    ['#19A9FA', '#19A9FA1a'],
    ['#FF42B2', '#FF42B21a'],
    ['#7545FF', '#7545FF1a'],
    ['#09CE84', '#09CE841a'],
  ]);
  return (
    <ScrollView>
      <View style={styles.top}>
        <View style={styles.setting}>
          <Pressable onPress={() => alert('setting')}>
            <Ionicons name="settings-outline" size={24} color={`${theme.colors.graphic.black}cc`} />
          </Pressable>
          <Pressable onPress={() => alert('more')}>
            <Feather name="more-vertical" size={24} color={`${theme.colors.graphic.black}cc`} />
          </Pressable>
        </View>
        <View style={{ marginLeft: 16, marginBottom: 24 }}>
          <MypageProfile />
        </View>
        <View
          style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, marginHorizontal: 14 }}
        >
          {interests.map((cur, idx) => (
            <InterestIcon
              key={idx}
              title={cur}
              textColor={iconColor[idx][0]}
              backgroundColor={iconColor[idx][1]}
            />
          ))}
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <Text
            style={{ ...theme.fonts.text.body2.regular, color: `${theme.colors.graphic.black}cc` }}
          >
            암더 코리안 탑클래스 힙합모범 노블레스 페뷸러스 터뷸렌스 고져스 벗 댕저러스 난 비트를
            비틀어 제껴버리는 셔브미션 챔피욘
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Pressable style={styles.editBtn} onPress={() => navigation.navigate('ProfileEdit')}>
            <Text
              style={{ ...theme.fonts.text.body1.bold, color: `${theme.colors.graphic.black}cc` }}
            >
              프로필 수정
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.mid}>
        <View style={styles.title}>
          <Text style={{ ...theme.fonts.text.headline2, color: theme.colors.graphic.black }}>
            타이틀{' '}
          </Text>
          <Text style={{ ...theme.fonts.text.headline2, color: `${theme.colors.graphic.black}4d` }}>
            8
          </Text>
        </View>
        <MypageTitle label="타이틀 제목" condition="획득 방법" date="2023.01.01" />
      </View>
      <Pressable
        onPress={() => alert('view every title!')}
        style={{ ...styles.viewAll, borderTopColor: `${theme.colors.graphic.black}1a` }}
      >
        <Text
          style={{ ...theme.fonts.text.body1.regular, color: `${theme.colors.graphic.black}cc` }}
        >
          전체보기
        </Text>
        <Feather name="chevron-right" size={24} color={`${theme.colors.graphic.black}cc`} />
      </Pressable>
      <DividerBar style={styles.divider} />
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.group}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={theme.fonts.text.headline2}>All </Text>
        <Text style={theme.fonts.text.headline2}>
          Group1 Group2 Group3 Group4 Group5 Group6 Group7 Group8
        </Text>
      </ScrollView>
      <View style={styles.insight}>
        <Text style={{ ...theme.fonts.text.headline2, color: theme.colors.graphic.black }}>
          인사이트{' '}
        </Text>
        <Text style={{ ...theme.fonts.text.headline2, color: `${theme.colors.graphic.black}4d` }}>
          581
        </Text>
      </View>
    </ScrollView>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#F1F1E9',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  editBtn: {
    backgroundColor: '#e1e1d0',
    marginVertical: 32,
    borderRadius: 12,
    width: 343,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mid: {
    marginHorizontal: 16,
  },
  title: {
    flexDirection: 'row',
    paddingTop: 24,
    paddingBottom: 10,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  divider: {
    backgroundColor: '#f8f8f4',
    borderBottomColor: '#f8f8f4',
    height: 12,
    width: '150%',
    left: -50,
  },
  group: {
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 10,
  },
  insight: {
    flexDirection: 'row',
    paddingTop: 24,
    paddingBottom: 10,
    marginLeft: 16,
  },
});
