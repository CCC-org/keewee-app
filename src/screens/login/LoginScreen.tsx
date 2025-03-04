import React from 'react';
import { expo } from '../../../app.json';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LoginQueryKeys, LoginAPI } from '../../utils/api/LoginAPI';
import * as Notifications from 'expo-notifications';
import { getExpoToken, setAccessToken, setUserId } from '../../utils/hooks/asyncStorage/Login';
// eslint-disable-next-line quotes
const INJECTED_JAVASCRIPT = "window.ReactNativeWebView.postMessage('login start')";

function Login({ navigation, route }) {
  const params: LoginRequest = {
    oauth: route.params.oauth,
    code: undefined,
    state: undefined,
  };
  const { mutate: tokenPush } = useMutation(LoginAPI.tokenPush);
  const { refetch } = useQuery(LoginQueryKeys.login(params), () => LoginAPI.login(params), {
    onSuccess: async (response) => {
      setAccessToken(response?.data?.accessToken ?? '');
      setUserId(response?.data?.userId ?? 0);
      let token = await getExpoToken();
      if (token === null) {
        token = (await Notifications.getExpoPushTokenAsync({ projectId: expo.extra.eas.projectId }))
          .data;
      }
      tokenPush({ pushToken: token ?? '' });
      if (response?.data.alreadySignedUp) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });
        navigation.navigate('Feed');
      } else navigation.navigate('NicknameCreation');
    },
    onError: (e) => {
      alert('인증에 실패했습니다.');
      navigation.navigate('SignUp');
    },
    enabled: params.code !== undefined,
  });

  function getCode(target: string) {
    const codeExp = 'code=';
    const codeCondition = target.indexOf(codeExp);
    const stateExp = 'state=';
    const stateCondition = target.indexOf(stateExp);
    if (codeCondition !== -1) {
      const requestCode = target.substring(
        codeCondition + codeExp.length,
        stateCondition === -1 ? target.length : stateCondition - 1,
      );
      params.code = requestCode;
      if (stateCondition !== -1) {
        const requestState = target.substring(stateCondition + stateExp.length);
        params.state = requestState;
      }
      refetch();
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        userAgent="Chrome"
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        style={{ flex: 1 }}
        source={{
          uri: `https://api-keewe.com/api/v1/oauth/${route.params.oauth}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </SafeAreaView>
  );
}

export default Login;
