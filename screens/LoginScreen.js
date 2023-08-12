import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Image
          style={styles.images}
          source={{
            url: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png"
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  images: {
    width: 150,
    height: 100
  }

})