import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChallengeAPI } from '../../utils/api/ChallengeAPI';
import HeaderText from '../../components/texts/HeaderText';
import TextInputDetail from '../../components/texts/TextInputDetail';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import { useTheme } from 'react-native-paper';
import Stepper from '../../components/stepper/Stepper';
import { UserSpecificChallengeQueryKeys } from '../../utils/api/UserSpecificChallenge';

const ChallengeSubjectCreationScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [subject, setSubject] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const queryClient = useQueryClient();

  const createRequestParams = {
    participate: {
      duration: route.params.form.participationPerWeek[0],
      insightPerWeek: route.params.form.recordPerWeek[0],
      myTopic: subject,
    },
    interest: route.params.form.selectedCategory,
    name: route.params.form.challengeName,
    introduction: route.params.form.challengeInfo,
  };
  const joinRequestParams = {
    challengeId: route.params.form.challengeId,
    duration: route.params.form.participationPerWeek[0],
    insightPerWeek: route.params.form.recordPerWeek[0],
    myTopic: subject,
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerShadowVisible: false,
      headerRight: () => (
        <HeaderRightButton
          text="건너뛰기"
          backGroundColor="white"
          textColor={`${theme.colors.graphic.black}80`}
          borderLine={true}
          disabled={false}
          handlePress={handleSkipPress}
          width={73}
          borderColor={`${theme.colors.graphic.black}1a`}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (subject.length > 25) {
      setErrorMessage('25자 이내로 입력하세요.');
    } else {
      setErrorMessage('');
    }
  }, [subject]);

  const { mutate: createChallenge } = useMutation(ChallengeAPI.create, {
    onSuccess: (response) => {
      queryClient.invalidateQueries([
        ['challenge'],
        UserSpecificChallengeQueryKeys.getUserSpecificChallenge(),
      ]);
      navigation.navigate('ChallengeCreationApproved', {
        form: response,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: joinChallenge } = useMutation(ChallengeAPI.join, {
    onSuccess: (response) => {
      queryClient.invalidateQueries([
        ['challenge'],
        UserSpecificChallengeQueryKeys.getUserSpecificChallenge(),
      ]);

      navigation.navigate('ChallengeJoinApproved', {
        form: {
          challengeId: route.params.form.challengeId,
          challengeName: route.params.form.challengeName,
          ...response,
        },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSkipPress = () => {
    if (route.params.form.purpose === 'create') {
      createChallenge(createRequestParams);
    } else if (route.params.form.purpose === 'join') {
      joinChallenge(joinRequestParams);
    }
  };

  const handleCompletePress = () => {
    if (route.params.form.purpose === 'create') {
      createChallenge(createRequestParams);
    } else if (route.params.form.purpose === 'join') {
      joinChallenge(joinRequestParams);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 10 }}>
        <View style={{ marginHorizontal: 10, marginBottom: 24 }}>
          <HeaderText
            header="나만의 주제를 정해보세요"
            subTitle={
              route.params.form.selectedCategory !== undefined
                ? `"${route.params.form.selectedCategory}"에 관한 주제면 좋아요. `
                : `"${route.params.form.interest}"에 관한 주제면 좋아요. `
            }
          />
        </View>
        {route.params.form.purpose === 'join' ? (
          <View style={{ marginHorizontal: 6, marginBottom: 24 }}>
            <Stepper totalStep={2} currentStep={2} />
          </View>
        ) : null}
        <TextInputDetail
          inputValue={subject}
          setInputValue={setSubject}
          label={''}
          placeholder={'나의 주제'}
          letterLimit={25}
          errorMessage={errorMessage}
        />
      </View>
      <ConditionalButton
        isActive={!!subject.length}
        text={'완료'}
        width={343}
        onPress={handleCompletePress}
        keyboardResponsive={true}
      />
    </SafeAreaView>
  );
};

export default ChallengeSubjectCreationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
