import {
  Text,
  SafeAreaView,
  Platform,
  Image,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function SignIn({ navigation }) {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        paddingHorizontal: 25,
        flex: 1,
      }}
    >
      <Image
        source={require('../../assets/empty-state.png')}
        style={{ alignSelf: 'center', height: 250, width: 330 }}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
        Never forgat your notes
      </Text>
      <View style={{ paddingVertical: 25 }}>
        <Input placeholder="Email address" />
        <Input placeholder="Password" secureTextEntry />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 40,
          alignItems: 'center',
        }}
      >
        <Button
          title={'Login'}
          customStyle={{ alignSelf: 'center', marginBottom: 60 }}
        />
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text>
            Don't have an account?{' '}
            <Text style={{ color: 'green', fontWeight: 'bold' }}>Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 25,
  },
});
