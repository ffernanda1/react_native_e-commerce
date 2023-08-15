import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  ScrollView
} from 'react-native'
import React, { useState } from 'react'
import { amazon } from '../assets'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={styles.images}
            source={amazon}
          />
        </View>

        <KeyboardAvoidingView>
          <View style={styles.view1}>
            <Text style={styles.textLogin}>Register your Account</Text>
          </View>

          <View style={{ marginTop: 70 }}>

            <View style={styles.view2}>
              <Ionicons
                style={styles.materialIcon}
                name="person-sharp" size={24} color="black" />

              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.textInputEmail}
                placeholder={"enter your Name"}
              />

            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View style={styles.view2}>
              <MaterialIcons
                style={styles.materialIcon}
                name="email" size={24} color="black" />

              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.textInputEmail}
                placeholder={"enter your E-mail"}
              />

            </View>
          </View>


          <View style={{ marginTop: 10 }}>
            <View style={styles.view2}>
              <AntDesign
                style={styles.materialIcon}
                name="lock1" size={24} color="black" />

              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={styles.textInputPassword}
                placeholder={"enter your Password"}
              />
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View style={styles.view2}>
              <AntDesign
                style={styles.materialIcon}
                name="lock1" size={24} color="black" />

              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={styles.textInputPassword}
                placeholder={"enter your Password Again"}
              />
            </View>
          </View>

          <View style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Text>Keep me logged in</Text>

            <Text style={{ color: "#007FFF", fontWeight: "500" }}> Forgot Password</Text>
          </View>
          <View style={{ marginTop: 70 }} />

          <Pressable style={{
            width: 200,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15
          }}>
            <Text>
              Login
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()}>
            <Text style={{
              textAlign: "center",
              color: "grey",
              fontSize: 16
            }}
            >Already have an account ? Sign In</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  images: {
    width: 150,
    height: 100
  },
  textLogin: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42"
  },
  textInputEmail: {
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  textInputPassword: {
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  view1: {
    alignItems: "center",
  },
  view2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#D0D0D0",
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 30
  },
  materialIcon: {
    marginLeft: 8
  }

})