import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ChallengeAPI, ChallengeQueryKeys } from '../../utils/api/ChallengeAPI';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ChallengeProfile from '../../components/profile/ChallengeProfile';
import BottomFixButton from '../../components/buttons/BottomFixButton';
import theme from '../../theme/light';
import { SvgXml } from 'react-native-svg';
import darkChevronRightSmallXml from '../../constants/Icons/Chevrons/darkChevronRightSmallXml';
import CurrentChallengeProfile from '../../components/profile/ChallengeProfileCurrent';
import { timeConverter } from './challenge/constant';
import TwoButtonModal from '../../components/modal/TwoButtonModal';
import { useFocusEffect } from '@react-navigation/native';

const ChallengesScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [participated, setParticipated] = useState<boolean>(false);
  const hideModal = () => setModalVisible(false);
  const queryClient = useQueryClient();

  const { data: participationCheck } = useQuery(
    ['challenge', 'participation', 'check'],
    () => ChallengeAPI.getParticipationCheck(),
    { onSuccess: () => setParticipated(true) },
  );

  const { data: challengeParticipation, isLoading: isChallengeParticipationLoading } = useQuery(
    ['challenge', 'participation'],
    ChallengeAPI.getChallengeParticipation,
    { enabled: participated },
  );

  const { data: count, isLoading: isCountLoading } = useQuery(
    ChallengeQueryKeys.getChallengeFriendsCount({
      challengeId: challengeParticipation?.challengeId ?? 0,
    }),
    () =>
      ChallengeAPI.getChallengeFriendsCount({
        challengeId: challengeParticipation?.challengeId ?? 0,
      }),
    {
      enabled: participated,
    },
  );

  const { data: challengeCurrent, isLoading: isChallengeCurrentLoading } = useQuery(
    ['challenge', 'current', { limit: 5 }],
    () => ChallengeAPI.getChallengeCurrent({ limit: 5 }),
  );

  const { data: challengeHistory, isLoading: isChallengeHIstoryLoading } = useQuery(
    ['challenge', 'history', { limit: 3 }],
    () => ChallengeAPI.getChallengeHistory({ limit: 3 }),
  );

  const { data: challengeHistoryCount, isLoading: isChallengeHIstoryCountLoading } = useQuery(
    ['challenge', 'count'],
    () => ChallengeAPI.getChallengeHistoryCount(),
  );

  useFocusEffect(
    React.useCallback(() => {
      setParticipated(false);
      queryClient.invalidateQueries(['challenge']);
    }, []),
  );

  return (
    <ScrollView>
      <TwoButtonModal
        dismissable={false}
        mainTitle={'새로운 챌린지를 만들까요?'}
        subTitle={
          '한 번에 하나의 챌린지에만 참여할 수 있어요.\n 현재 참여 중인 챌린지는 자동 탈퇴됩니다.'
        }
        visible={modalVisible}
        onDismiss={hideModal}
        leftButtonText={'취소'}
        rightButtonText={'만들러 가기'}
        leftButtonPress={() => setModalVisible(false)}
        rightButtonPress={() => {
          setModalVisible(false);
          navigation.navigate('CategorySelect');
        }}
      />
      {participationCheck?.participation ? (
        <View style={{ marginBottom: 8 }}>
          <Text
            style={{
              fontFamily: 'pretendardSemiBold',
              fontSize: 18,
              marginHorizontal: 16,
              marginTop: 24,
              marginBottom: 10,
            }}
          >
            참여중인 챌린지
          </Text>
          <View style={{ alignItems: 'center' }}>
            <Image
              style={{ width: 343, height: 140 }}
              source={require('../../../assets/images/challenge/ChallengeHome.png')}
            />
          </View>
          <ChallengeProfile
            name={challengeParticipation?.name ?? ''}
            challengeId={challengeParticipation?.challengeId ?? 0}
            participatingUserNumber={count?.challengerCount}
            interest={challengeParticipation?.interest ?? ''}
            Date={timeConverter(challengeParticipation?.startDate ?? '')}
            highlight={true}
            participate={true}
          />
        </View>
      ) : (
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Image
            style={{ width: 343, height: 140 }}
            source={require('../../../assets/images/challenge/challengeEmpty.png')}
          />
          <Text
            style={{
              marginTop: 20,
              fontFamily: 'pretendard',
              fontSize: 16,
              color: `${theme.colors.graphic.black}80`,
            }}
          >
            챌린지에 참여해보세요.
          </Text>
        </View>
      )}
      <BottomFixButton
        isActive={true}
        text={'새로운 챌린지 만들기'}
        width={100}
        onPress={() => setModalVisible(true)}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
      {!isChallengeHIstoryCountLoading && challengeHistoryCount?.count !== 0 && (
        <>
          <View style={{ backgroundColor: theme.colors.brand.surface.main, ...styles.divider }} />
          <View style={styles.title}>
            <Text style={{ fontFamily: 'pretendardSemiBold', fontSize: 16 }}>종료된 챌린지</Text>
            <Text
              style={{
                fontFamily: 'pretendardSemiBold',
                fontSize: 16,
                color: `${theme.colors.graphic.black}30`,
                marginLeft: 6,
              }}
            >
              {challengeHistoryCount?.count}
            </Text>
          </View>
          {!isChallengeHIstoryLoading &&
            challengeHistory?.map((history, index) => (
              <ChallengeProfile
                key={index}
                challengeId={history.challengeId}
                name={history.challengeName}
                interest={history.challengeCategory}
                Date={timeConverter(history.startDate + ' ~ ' + history.endDate)}
                participate={challengeParticipation?.challengeId === history.challengeId}
              />
            ))}
          <Pressable
            onPress={() =>
              navigation.navigate('ChallengeHistory', {
                currentChallenge: challengeParticipation?.challengeId,
              })
            }
            style={{ ...styles.borderContainer }}
          >
            <Text style={{ fontFamily: 'pretendard', fontSize: 16, marginRight: 4 }}>전체보기</Text>
            <SvgXml xml={darkChevronRightSmallXml} />
          </Pressable>
        </>
      )}
      {!isChallengeCurrentLoading && challengeCurrent?.length !== 0 && (
        <>
          <View style={{ backgroundColor: theme.colors.brand.surface.main, ...styles.divider }} />
          <View style={styles.title}>
            <Text style={{ fontFamily: 'pretendardSemiBold', fontSize: 16 }}>모든 챌린지</Text>
          </View>
          {challengeCurrent?.map((current, index) => (
            <CurrentChallengeProfile
              key={index}
              challengeId={current.challengeId}
              name={current.challengeName}
              interest={current.challengeCategory}
              challengeDescription={current.challengeIntroduction}
              insightNumber={current.insightCount}
              participate={challengeParticipation?.challengeId === current.challengeId}
            />
          ))}
          <Pressable
            onPress={() =>
              navigation.navigate('ChallengeCurrent', {
                currentChallenge: challengeParticipation?.challengeId,
              })
            }
            style={{ ...styles.borderContainer }}
          >
            <Text style={{ fontFamily: 'pretendard', fontSize: 16, marginRight: 4 }}>전체보기</Text>
            <SvgXml xml={darkChevronRightSmallXml} />
          </Pressable>
        </>
      )}
      <View style={{ backgroundColor: theme.colors.brand.surface.main, ...styles.divider }} />
    </ScrollView>
  );
};

export default ChallengesScreen;

const styles = StyleSheet.create({
  button: {
    width: 'auto',
    borderRadius: 12,
    backgroundColor: '#e0f6a2',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  buttonText: {
    color: '#486006',
  },
  divider: {
    height: 12,
  },
  title: {
    marginTop: 24,
    marginHorizontal: 16,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  borderContainer: {
    paddingVertical: 16,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
