import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

export default function Input({
  placeholder,
  secureTextEntry,
  onChangeText,
  autoCapitalize,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
    />
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
