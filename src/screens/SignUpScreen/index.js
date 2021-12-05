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

export default ({ navigation }) => {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkNameTextInputChange: false,
    checkEmailTextInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
  });

  const handleNameChange = (val) => {
    if (val.length < 3)
      return setData({ ...data, name: val, checkNameTextInputChange: false });

    setData({ ...data, name: val, checkNameTextInputChange: true });
  };

  const handleEmailChange = (val) => {
    if (val.length < 5)
      return setData({ ...data, email: val, checkEmailTextInputChange: false });

    setData({ ...data, email: val, checkEmailTextInputChange: true });
  };

  const handlePasswordChange = (val) => {
    setData({ ...data, password: val });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({ ...data, confirmPassword: val });
  };

  const updateSecureTextEntry = () => {
    setData({ ...data, secureTextEntry: !data.secureTextEntry });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({ ...data, confirmSecureTextEntry: !data.confirmSecureTextEntry });
  };

  const handleSignUpClick = async () => {
    const { name, email, password, confirmPassword } = data;
    if (!name || !email || !password)
      return Alert.alert("Oops", "Você deve preencher todos campos corretamente!", [
        { text: "Tentar novamente" },
      ]);

    if (password != confirmPassword)
      return Alert.alert("Oops", "As senhas informadas são diferentes!", [
        { text: "Tentar novamente" },
      ]);

    if (email.length < 5)
      return Alert.alert("Oops", "Seu email deve ter pelo menos 5 letras.", [
        { text: "Tentar novamente" },
      ]);
    if (name.length < 3)
      return Alert.alert("Oops", "Seu nome deve ter pelo menos 3 letras.", [
        { text: "Tentar novamente" },
      ]);
    if (password.length < 3)
      return Alert.alert("Oops", "Sua senha deve ter pelo menos 3 letras.", [
        { text: "Tentar novamente" },
      ]);

    const res = await Api.signUp(name, email, password);

    if (!res.id)
      return Alert.alert("Oops", "Aconteceu algum erro! :(", [
        { text: "Tentar novamente" },
      ]);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Cadastre-se agora!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.textFooter}>Nome</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Seu Nome"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleNameChange(val)}
          />
          {data.checkNameTextInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styles.textFooter, styles.textEmail]}>Email</Text>
        <View style={styles.action}>
          <Feather name="mail" color="#05375a" size={20} />
          <TextInput
            placeholder="Seu Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleEmailChange(val)}
          />
          {data.checkEmailTextInputChange ? (
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

        <Text style={styles.textPassword}>Confirme sua senha</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            secureTextEntry={data.confirmSecureTextEntry}
            placeholder="Sua Senha"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleConfirmPasswordChange(val)}
          />
          <TouchableOpacity
            hitSlop={{ top: 15, right: 15, left: 15, bottom: 15 }}
            onPress={updateConfirmSecureTextEntry}
          >
            {data.confirmSecureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={handleSignUpClick}>
            <LinearGradient style={styles.signIn} colors={["#08d4c4", "#01ab9d"]}>
              <Text style={styles.textSign}>Cadastrar</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.signUp}>
            <Text style={[styles.textSign, styles.textSignUp]}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
