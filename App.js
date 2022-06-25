import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import SignIn from './src/screens/signin';
import SignUp from './src/screens/signup';
import Edit from './src/screens/edit';
import Create from './src/screens/create';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDvbxWrMbJcm7uLSfwK1YRPaw-msUtIcOI',
  authDomain: 'note-app12.firebaseapp.com',
  projectId: 'note-app12',
  storageBucket: 'note-app12.appspot.com',
  messagingSenderId: '839046131873',
  appId: '1:839046131873:web:8f9cf1a514d0e16ebac0e0',
};

const app = initializeApp(firebaseConfig);

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const user = false;

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Edit" component={Edit} />
            <Stack.Screen name="Create" component={Create} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="signin"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Signup" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
