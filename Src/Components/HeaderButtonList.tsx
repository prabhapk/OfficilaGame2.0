import React, { useEffect, useRef, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';


import { HeaderButton } from '../types'
import Scale from "./Scale"

interface Props {
  buttonList: HeaderButton[]
  onButtonPressed: (button: HeaderButton) => void
  selectedButtonObject?: HeaderButton
}
const HeaderButtonList: React.FC<Props> = ({
  buttonList,
  onButtonPressed,
  selectedButtonObject,
}) => {
  const [selectedButton, setSelectedButton] = useState<number | null>(
    selectedButtonObject ? selectedButtonObject.id : null,
  )
  useEffect(() => {
    if (selectedButtonObject) {
      setSelectedButton(selectedButtonObject.id)
    }
  }, [selectedButtonObject])
  const scrollViewRef = useRef<ScrollView>(null)
  const itemRefs = useRef<(View | null)[]>([])

  const scrollToItem = (index) => {
    if (itemRefs.current[index] && scrollViewRef) {
      if (scrollViewRef.current) {
        itemRefs.current[index]?.measureLayout(
          scrollViewRef.current,
          (x) => {
            scrollViewRef.current?.scrollTo({ x, animated: true })
          },
          () => console.warn("Failed to measure layout"),
        )
      }
    }
  }
  return (
    <View style={styles.buttonsContainer}>
 <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  pagingEnabled
  ref={scrollViewRef}
>
  <View style={styles.buttonWrapper}>
    {buttonList.map((category, index) => {
      const isSelected = selectedButton === category.id

      return (
        <View key={"HeaderButton" + category.id}>
          {isSelected ? (
            <LinearGradient
              colors={['#FF4242', '#f6c976']}
              style={styles.gradientWrapper}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedButton(category.id);
                  scrollToItem(index);
                  onButtonPressed(category);
                }}
                style={[
                  styles.button,
                  { backgroundColor: 'transparent', borderWidth: 0 },
                ]}
                ref={(el) => (itemRefs.current[index] = el)}
              >
                <Text style={[styles.buttonText, styles.selectedButtonText]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSelectedButton(category.id);
                scrollToItem(index);
                onButtonPressed(category);
              }}
              style={styles.button}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <Text style={styles.buttonText}>{category.name}</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    })}
  </View>
</ScrollView>

    </View>
  )
}
const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: "transparent",
  },
  buttonWrapper: {
    marginTop: Scale(10),
    marginBottom: Scale(10),
    marginHorizontal: Scale(20),
    flexDirection: "row",
  },
  button: {
    backgroundColor: 'white',
    borderRadius: Scale(5),
    paddingHorizontal: Scale(25),
    marginVertical: Scale(10),
    borderColor: 'black',
    borderWidth: 1,
    marginRight: Scale(10),
    alignItems: "center",
    justifyContent: "center",
    height: Scale(40),
  },
  selectedButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'black',
    fontSize: Scale(14),
    fontFamily: "UniNeue-Bold",
    textAlign: "center",
  },
  selectedButtonText: {
    color: 'white',
  },
  gradientWrapper: {
    height: Scale(40),
    borderRadius: Scale(5),
    marginRight: Scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: Scale(10),
  },
})

export default HeaderButtonList
