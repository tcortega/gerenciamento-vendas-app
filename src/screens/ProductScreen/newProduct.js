import React from "react";
import { View, Text, StatusBar, TextInput, Alert } from "react-native";

import * as Animatable from "react-native-animatable";
import MaterialComIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { styles } from "./newProduct.styles";
import Api from "../../Api";
import CustomButton from "../../components/CustomButton";
import { useHeaderShown } from "../../context/HeaderShown";

export default ({ navigation }) => {
  const { setHeaderShown } = useHeaderShown();

  const [name, setName] = React.useState();
  const [category, setCategory] = React.useState();
  const [price, setPrice] = React.useState();
  const [quantity, setQuantity] = React.useState();

  const handleAddProduct = async () => {
    const newPrice = price ? price.toString().replace(",", ".") : "0,0";

    if (!name || !category || parseFloat(newPrice) <= 0 || quantity <= 0)
      return Alert.alert("Oops", "Você deve preencher todos campos corretamente!", [
        { text: "Tentar novamente" },
      ]);

    const res = await Api.addProduct(name, category, newPrice, quantity);

    if (!res.name)
      return Alert.alert("Oops", "Algo deu errado! :(", [{ text: "Tentar novamente" }]);

    goBack();
  };

  const resetFields = () => {
    setName("");
    setCategory("");
    setPrice();
    setQuantity();
  };

  const goBack = () => {
    resetFields();
    setHeaderShown(true);
    navigation.navigate("Produtos");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Animatable.View animation="fadeInDownBig" style={styles.header}>
        <Text style={styles.textHeader}>Novo Produto</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.textFooter}>Produto</Text>
        <View style={styles.action}>
          <MaterialComIcons name="ornament" color="#05375a" size={20} />
          <TextInput
            placeholder="Nome do Produto"
            style={styles.textInput}
            autoCapitalize="words"
            onChangeText={(val) => setName(val)}
            value={name}
          />
        </View>
        <Text style={styles.subTexts}>Categoria</Text>
        <View style={styles.action}>
          <MaterialIcons name="category" color="#05375a" size={20} />
          <TextInput
            placeholder="Categoria do Produto"
            style={styles.textInput}
            autoCapitalize="words"
            onChangeText={(val) => setCategory(val)}
            value={category}
          />
        </View>

        <Text style={styles.subTexts}>Preço</Text>
        <View style={styles.action}>
          <Entypo name="price-tag" color="#05375a" size={20} />
          <TextInput
            placeholder="19.99"
            style={styles.textInput}
            keyboardType="decimal-pad"
            onChangeText={(val) => setPrice(val)}
            value={price}
          />
        </View>

        <Text style={styles.subTexts}>Quantidade</Text>
        <View style={styles.action}>
          <MaterialComIcons name="numeric" color="#05375a" size={20} />
          <TextInput
            placeholder="100"
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={(val) => setQuantity(val)}
            value={quantity}
          />
        </View>

        <View style={styles.button}>
          <CustomButton
            onPress={handleAddProduct}
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
