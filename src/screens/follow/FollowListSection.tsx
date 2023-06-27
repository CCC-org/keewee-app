import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  UseMutationResult,
} from '@tanstack/react-query';
import { FollowData } from '../../types/followerList/followers';
import { SvgXml } from 'react-native-svg';
import person from '../../constants/Icons/Avatar/personXml';
import { useTheme } from 'react-native-paper';
import FollowListFollowButton from './FollowListFollowButton';
import { useNavigation } from '@react-navigation/native';
import { getUserId } from '../../utils/hooks/asyncStorage/Login';
import { useGetUserId } from '../../utils/hooks/useGetUserId';
interface FollowListSectionProps {
  followList: InfiniteData<FollowData | undefined> | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<FollowData | undefined, unknown>>;
  mutation: UseMutationResult<unknown, unknown, string | number, void>;
}

const FollowListSection = ({ followList, mutation }: FollowListSectionProps) => {
  const userId = useGetUserId();
  const flattenData = useMemo(() => {
    return followList?.pages.flatMap((page) => {
      return page?.users;
    });
  }, [followList]);
  const theme = useTheme();
  const navigation = useNavigation();
  const handlePressForFollow = (id: string | number) => {
    mutation.mutate(id);
  };

  const handleGoToProfileOnImagePress = async (itemUserId: number) => {
    const localUserId = await getUserId();
    if (localUserId === String(itemUserId)) {
      navigation.navigate('MyProfile', { userId: localUserId, enteredByTab: false });
    } else {
      navigation.navigate('Profile', { userId: itemUserId });
    }
  };

  return (
    <FlatList
      data={flattenData}
      renderItem={({ item }) =>
        item ? (
          <View style={styles.container}>
            <Pressable onPress={() => handleGoToProfileOnImagePress(item.id)}>
              <View style={styles.profile}>
                <>
                  {item?.imageURL ? (
                    <Image
                      source={{ uri: item?.imageURL }}
                      style={{ width: 50, height: 50, borderRadius: 100 }}
                    />
                  ) : (
                    <SvgXml xml={person} width={48} height={48} />
                  )}
                  <View
                    style={{
                      marginLeft: 12,
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Text style={[theme.fonts.text.body1.bold]}>{item?.nickname}</Text>
                    <Text style={[theme.fonts.text.body2.regular, { color: '#12131480' }]}>
                      {item?.title || 'NO TITLE'}
                    </Text>
                  </View>
                </>
              </View>
            </Pressable>

            {/* <FollowListFollowButton
              onPress={() => handlePressForFollow(item.id)}
              isFollowing={item.follow}
            /> */}
            {item.id !== userId && (
              <FollowListFollowButton
                onPress={() => handlePressForFollow(item.id)}
                isFollowing={item.follow}
              />
            )}
          </View>
        ) : null
      }
      keyExtractor={(item) => item?.id.toString() as string}
    />
  );
};

export default FollowListSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
