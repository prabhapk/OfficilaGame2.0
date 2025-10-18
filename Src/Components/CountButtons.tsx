import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { useContainerScale } from '../hooks/useContainerScale';

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
  const { Scale, verticalScale } = useContainerScale();
  const styles = createStyles(Scale);

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
        maxLength={3} 
        selectTextOnFocus={true} 
      />
      <TouchableOpacity style={styles.button} onPress={handleIncrease}>
        <Text style={styles.symbol}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (Scale: any) =>
  StyleSheet.create({
  showCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 4, // Increased padding for better spacing
    height: 40,
    marginLeft: 20,
    backgroundColor:"rgba(0,0,0,0.2)",
    minWidth: 110, // Increased minimum width for better 3-digit display
    justifyContent: 'space-between', // Better distribution of elements
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
    minWidth: 40, // Minimum width for 3-digit numbers
    maxWidth: 60, // Maximum width to prevent excessive expansion
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 8, // Add horizontal padding for better spacing
    outlineWidth: 0,
  },
});

export default CountButtons;
