import React from "react";
import { View, Text, StatusBar, TextInput, Alert } from "react-native";

import * as Animatable from "react-native-animatable";
import MaterialComIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./newSeller.styles";
import Api from "../../Api";
import CustomButton from "../../components/CustomButton";
import { useHeaderShown } from "../../context/HeaderShown";

export default ({ navigation }) => {
  const { setHeaderShown } = useHeaderShown();

  const [name, setName] = React.useState();

  const handleAddSeller = async () => {
    if (!name)
      return Alert.alert("Oops", "Você deve preencher todos campos corretamente!", [
        { text: "Tentar novamente" },
      ]);

    const res = await Api.addSeller(name);

    if (!res.name)
      return Alert.alert("Oops", "Algo deu errado! :(", [{ text: "Tentar novamente" }]);

    goBack();
  };

  const resetFields = () => {
    setName("");
  };

  const goBack = () => {
    resetFields();
    setHeaderShown(true);
    navigation.navigate("Vendedores");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInDownBig" style={styles.header}>
        <Text style={styles.textHeader}>Novo Vendedor</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.textFooter}>Nome</Text>
        <View style={styles.action}>
          <MaterialComIcons name="account-tie-outline" color="#05375a" size={20} />
          <TextInput
            placeholder="Nome do Vendedor"
            style={styles.textInput}
            autoCapitalize="words"
            onChangeText={(val) => setName(val)}
            value={name}
          />
        </View>

        <View style={styles.button}>
          <CustomButton
            onPress={handleAddSeller}
            bgColor="#00C851"
            width={140}
            label="Adicionar"
          />

          <CustomButton
            style={styles.backBtn}
            onPress={goBack}
            bgColor="#ff4444"
            width={140}
            icon="arrow-left"
            label="Voltar"
          />
        </View>
      </Animatable.View>
    </View>
  );
};
