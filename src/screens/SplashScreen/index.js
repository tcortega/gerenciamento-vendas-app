import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";

export default ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          style={styles.logo}
          resizeMode="stretch"
          source={require("../../assets/img/logo.png")}
        />
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.title}>Gerencie seus negócio do seu celular!</Text>
        <Text style={styles.text}>Entre com sua conta</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <LinearGradient style={styles.signIn} colors={["#08d4c4", "#01ab9d"]}>
              <Text style={styles.textSign}>Começar agora</Text>
              <Icon name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      {/* <Text>SplashScreen</Text> */}
    </View>
  );
};
