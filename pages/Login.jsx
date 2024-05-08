import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [isLender, setIsLender] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
     
      if (!validatePhoneNumber(phoneNumber)) {
        Alert.alert("Error", "Please enter a valid phone number.");
        return;
      }
      if (!validatePassword(password)) {
        Alert.alert(
          "Error",
          "Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 6 characters long."
        );
        return;
      }

    
      const apiUrl =
        "https://sapi.cicil.biz.id:8443/kancil/user/auth/apis/v2/user/login";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization:
            "Basic YmFjay1vZmZpY2UtaW50ZXJuYWw6Smt0dzNYSDBHRW9ZQzlyWmtWSzE=",
        },
        body: JSON.stringify({
          phoneNumber,
          password,
          type: `${isLender ? "lender" : "borrower"}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("userToken", `${data.token}`);
        navigation.navigate("splash", {
          userType: `${isLender ? "lender" : "borrower"}`,
        });
      } else {
        console.error("API error:", response.status);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
  
    const regex = /^[0-9]{8,14}$/;
    return regex.test(phoneNumber);
  };

  const validatePassword = (password) => {
    // Regular expression to validate password complexity
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headers}>
        <Image source={require("../assets/Cicil_Logo.png")} />
      </View>
      <View style={styles.hed}>
        <Image
          style={{ marginTop: 0 }}
          source={require("../assets/Login_Illustration.png")}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
        keyboardType="numeric"
        maxLength={14}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={styles.switcht}>
        <Switch
          value={isLender}
          onValueChange={() => {
            setIsLender(!isLender);
          }}
          ios_backgroundColor="purple"
          trackColor={{ false: "gray", true: "#F49817" }}
        />
        <Text style={{ color: "#919292", fontSize: 12 }}>Lender</Text>
      </View>
      <Text style={styles.textis}>the text is here</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 15 }}>
        Didn't have an account?
        <Text style={{ color: "#F49817" }}> Register</Text>
      </Text>
      <View style={styles.footer}>
        <Text style={{ fontSize: 10, color: "#797875" }}>
          whatever written on the page I can not read it
        </Text>
        <Text style={{ fontSize: 10 }}>on the page I can not read it</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 100,
            marginTop: 10,
          }}
        >
          <View>
            <Image
              style={{ height: 50, width: 50 }}
              source={require("../assets/thebu.jpg")}
            />
          </View>
          <View>
            <Image
              style={{ objectFit: "cover", height: 50, width: 50 }}
              source={require("../assets/AFPI-Logo.png")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    padding: 20,
  },
  textis: {
    fontSize: 12,
    color: "#F49817",
  },
  hed: {
    width: "100%",
    height: 175,
    alignItems: "center",
  },

  headers: {
    padding: 20,
    width: "100%",
    backgroundColor: "#D9EEF0",
    alignContent: "center",
    alignItems: "center",
  },
  switcht: {
    margin: 0,
    display: "flex",
    flexDirection: "row",
    fontSize: 10,
    color: "#919292",
  },
  input: {
    width: "100%",
    marginTop: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 10,
  },
  loginButton: {
    backgroundColor: "#F49817",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    width: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#D9EEF0",
    width: "100%",
    height: 150,
    padding: 20,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default LoginScreen;
