import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  followUserAction,
  getAllUsers,
  unfollowUserAction,
} from '../../redux/actions/userAction';
import {User, selectUser} from '../../redux/reducers/userReducer';
import Loader from '../common/Loader';

type Props = {
  navigation: any;
};

const SearchScreen = ({navigation}: Props) => {
  const [data, setData] = useState<User[]>([]);
  const {users, user, isLoading} = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      setData(users);
      console.log('[USERS] Set all users', users);
    }
  }, [users]);

  const handleSearchChange = (e: string) => {
    console.log('[USERS] Search change', e);
    if (e.length !== 0) {
      const filteredUsers =
        users &&
        users.filter(i => i.username?.toLowerCase().includes(e.toLowerCase()));
      console.log('[USERS] Filtered users', filteredUsers);
      setData(filteredUsers || []);
    } else {
      console.log('[USERS] Set all users', users);
      setData(users || []);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView>
          <View className="p-3">
            <Text className="text-[30px] text-[#000] font-[600]">Search</Text>
            <View className="relative">
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2811/2811806.png',
                }}
                height={20}
                width={20}
                className="absolute top-[20px] left-2"
              />
              <TextInput
                onChangeText={e => handleSearchChange(e)}
                placeholder="Search"
                placeholderTextColor={'#000'}
                className="w-full h-[38px] bg-[#0000000e] rounded-[8px] pl-8 text-[#000] mt-[10px]"
              />
            </View>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                const handleFollowUnfollow = async (e: any) => {
                  try {
                    if (e.followers.find((i: any) => i.userId === user?._id)) {
                      await unfollowUserAction({
                        userId: user?._id || '',
                        users,
                        followUserId: e._id,
                      })(dispatch);
                    } else {
                      await followUserAction({
                        userId: user?._id || '',
                        users,
                        followUserId: e._id,
                      })(dispatch);
                    }
                  } catch (error) {
                    console.log(error, 'error');
                  }
                };
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UserProfile', {
                        item: item,
                      })
                    }>
                    <View className="flex-row my-3">
                      <Image
                        source={{uri: item?.avatar?.url}}
                        width={30}
                        height={30}
                        borderRadius={100}
                      />
                      <View className="w-[90%] flex-row justify-between border-b border-[#00000020] pb-2">
                        <View>
                          <View className="flex-row items-center relative">
                            <Text className="pl-3 text-[18px] text-black">
                              {item.name}
                            </Text>
                            {item?.role === 'Admin' && (
                              <Image
                                source={{
                                  uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                                }}
                                width={18}
                                height={18}
                                className="ml-1"
                              />
                            )}
                          </View>

                          <Text className="pl-3 text-[18px] text-black">
                            {item.username}
                          </Text>
                          <Text className="pl-3 mt-1 text-[16px] text-[#444]">
                            {item.followers.length} followers
                          </Text>
                        </View>
                        <View>
                          <TouchableOpacity
                            className="rounded-[8px] w-[100px] flex-row justify-center items-center h-[35px] border border-[#0000004b]"
                            onPress={() => handleFollowUnfollow(item)}>
                            <Text className="text-black">
                              {item.followers.find((i: any) => {
                                console.log({user: i});
                                return i.userId === user?._id;
                              })
                                ? 'Following'
                                : 'Follow'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default SearchScreen;
