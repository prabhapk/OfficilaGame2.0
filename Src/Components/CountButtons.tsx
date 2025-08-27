import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React from 'react';

interface CountButtonsProps {
  count: number;
  setCount: (value: number) => void;
  onHide: () => void;
  minValue?: number;
  maxValue?: number;
}

const CountButtons: React.FC<CountButtonsProps> = ({ count, setCount, onHide, minValue = 0, maxValue = Infinity }) => {
  const handleIncrease = () => {
    setCount(Math.min(maxValue, count + 1));
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(0);
      onHide();
    }
  };

  const handleTextChange = (text: string) => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue)) {
      setCount(Math.min(maxValue, Math.max(minValue, numericValue)));
    } else if (text === "") {
      setCount(minValue);
    }
  };

  return (
    <View style={styles.showCountContainer}>
      <TouchableOpacity style={styles.button} onPress={handleDecrease}>
        <Text style={styles.symbol}>−</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={count.toString()}
        onChangeText={handleTextChange}
        keyboardType="numeric"
        textAlign="center"
      />
      <TouchableOpacity style={styles.button} onPress={handleIncrease}>
        <Text style={styles.symbol}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  showCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 2,
    height: 40,
    marginLeft: 20,
    backgroundColor:"rgba(0,0,0,0.2)",
  },
  button: {
    backgroundColor: '#E9EDF8',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbol: {
    fontSize: 15,
    color: 'black',
  },
  input: {
    width: 30,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default CountButtons;
