import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'native-base';
import * as React from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider, useSelector} from 'react-redux';
import Auth from './Navigations/Auth';
import Main from './Navigations/Main';
import Store from './redux/Store';
import {loadUser} from './redux/actions/userAction';
import Loader from './src/common/Loader';
LogBox.ignoreAllLogs();

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={Store}>
        <AppStack />
      </Provider>
    </GestureHandlerRootView>
  );
}

const AppStack = () => {
  const {isAuthenticated, loading} = useSelector((state: any) => state.user);
  // const dispatch = useDispatch();

  React.useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <>
      <>
        <StatusBar
          animated={true}
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
          showHideTransition={'fade'}
        />
      </>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAuthenticated ? (
            <NavigationContainer>
              <Main />
            </NavigationContainer>
          ) : (
            <NavigationContainer>
              <Auth />
            </NavigationContainer>
          )}
        </>
      )}
    </>
  );
};

export default App;
