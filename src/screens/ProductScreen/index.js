import React from "react";
import { RefreshControl, ScrollView, StatusBar } from "react-native";
import Api from "../../Api";
import AddButton from "../../components/CustomButton";
import { BtnContainer, Container, PageTitle, SubTitle, Scroller } from "./styles";

import DataTableProducts from "../../components/DataTableProducts";
import { useHeaderShown } from "../../context/HeaderShown";
import * as Animatable from "react-native-animatable";

export default ({ navigation }) => {
  const { setHeaderShown } = useHeaderShown();

  const [productList, setProductList] = React.useState([]);
  const [isRefreshing, setRefreshing] = React.useState(false);

  const getProducts = async () => {
    setProductList([]);

    const res = await Api.getProducts();
    setProductList(res);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    getProducts();
  };

  const handleClickNewProduct = () => {
    setHeaderShown(false);
    navigation.navigate("Novo Produto");
  };

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      <Container>
        <StatusBar backgroundColor="#009387" barStyle="dark-content" />
        <Animatable.View animation="fadeInDownBig">
          <PageTitle>Lista de Produtos</PageTitle>
          <SubTitle>
            A listagem de produtos dita efetivamente a apresentação de um produto e
            fornece espaço para listar seus produtos de maneira mais atraente.
          </SubTitle>
        </Animatable.View>
        <Animatable.View animation="fadeInUpBig">
          <BtnContainer>
            <AddButton
              width={155}
              bgColor="#32BDEA"
              label="Novo Produto"
              onPress={handleClickNewProduct}
            />
          </BtnContainer>
          <DataTableProducts products={productList} />
        </Animatable.View>
      </Container>
    </ScrollView>
  );
};
