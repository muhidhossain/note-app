import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RadioInput({
  label,
  value,
  handleInfoChange,
  size = 'big',
  valueType,
  color,
}) {
  const isSelected = value === label;
  return (
    <TouchableOpacity onPress={() => handleInfoChange(label, valueType)}>
      <View style={styles.container}>
        <View
          style={[
            styles.outerCircle,
            isSelected && !color && styles.selectedOuterCircle,
            size === 'big' && styles.bigOuterCircle,
            isSelected && color && { borderColor: color },
          ]}
        >
          <View
            style={[
              styles.innerCircle,
              isSelected && !color && styles.selectedInnerCircle,
              size === 'big' && styles.bigInnerCircle,
              isSelected &&
                color && { backgroundColor: color, borderColor: color },
            ]}
          />
        </View>
        <Text
          style={{
            marginLeft: 10,
            fontWeight: 'bold',
            color: `${color ? color : ''}`,
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CFCFCF',
  },
  bigOuterCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  bigInnerCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
  },
  selectedOuterCircle: {
    borderColor: 'orange',
  },
  selectedInnerCircle: { borderColor: 'orange', backgroundColor: 'orange' },
});
