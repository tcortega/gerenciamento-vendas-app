import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { styles } from "./styles";
import Api from "../../Api";

import { useUser } from "../../context/User";

export default ({ navigation }) => {
  const { setUserData } = useUser();

  const [data, setData] = React.useState({
    email: "",
    password: "",
    checkTextInputChange: false,
    secureTextEntry: true,
  });

  const handleEmailChange = (val) => {
    if (val.length <= 5)
      return setData({ ...data, email: val, checkTextInputChange: false });

    setData({ ...data, email: val, checkTextInputChange: true });
  };

  const handlePasswordChange = (val) => {
    setData({ ...data, password: val });
  };

  const updateSecureTextEntry = () => {
    setData({ ...data, secureTextEntry: !data.secureTextEntry });
  };

  const handleSignInClick = async () => {
    const { email, password } = data;
    if (!email || !password)
      return Alert.alert("Oops", "Você deve preencher todos campos corretamente!", [
        { text: "Tentar novamente" },
      ]);

    if (email.length < 5)
      return Alert.alert("Oops", "Seu email deve ter pelo menos 5 letras.", [
        { text: "Tentar novamente" },
      ]);
    if (password.length < 3)
      return Alert.alert("Oops", "Sua senha deve ter pelo menos 3 letras.", [
        { text: "Tentar novamente" },
      ]);

    const res = await Api.signIn(email, password);

    if (!res.id)
      return Alert.alert("Oops", "Email ou senha incorretos!", [
        { text: "Tentar novamente" },
      ]);

    setUserData({ email: res.email, name: res.name });

    navigation.navigate("DrawerScreen");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Bem Vindo!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.textFooter}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Seu Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleEmailChange(val)}
          />
          {data.checkTextInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={styles.textPassword}>Senha</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            secureTextEntry={data.secureTextEntry}
            placeholder="Sua Senha"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity
            hitSlop={{ top: 15, right: 15, left: 15, bottom: 15 }}
            onPress={updateSecureTextEntry}
          >
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={handleSignInClick} style={styles.signIn}>
            <LinearGradient style={styles.signIn} colors={["#08d4c4", "#01ab9d"]}>
              <Text style={styles.textSign}>Entrar</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={styles.signUp}
          >
            <Text style={[styles.textSign, styles.textSignUp]}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
