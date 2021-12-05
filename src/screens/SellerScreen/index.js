import React from "react";
import { RefreshControl, ScrollView, StatusBar } from "react-native";
import Api from "../../Api";
import AddButton from "../../components/CustomButton";
import { BtnContainer, Container, PageTitle, SubTitle } from "./styles";

import { useHeaderShown } from "../../context/HeaderShown";
import DataTableSellers from "../../components/DataTableSellers";
import * as Animatable from "react-native-animatable";

export default ({ navigation }) => {
  const { setHeaderShown } = useHeaderShown();

  const [sellerList, setSellerList] = React.useState([]);
  const [isRefreshing, setRefreshing] = React.useState(false);

  const getSellers = async () => {
    setSellerList([]);

    const res = await Api.getSellers();

    setSellerList(res);
  };

  React.useEffect(() => {
    getSellers();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    getSellers();
  };

  const handleClickNewSeller = () => {
    setHeaderShown(false);
    navigation.navigate("Novo Vendedor");
  };

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      <Container>
        <StatusBar backgroundColor="#009387" barStyle="dark-content" />
        <Animatable.View animation="fadeInDownBig">
          <PageTitle>Lista de Vendedores</PageTitle>
          <SubTitle>
            A listagem de vendedores dita efetivamente a apresentação de um vendedores e
            fornece espaço para listar seus empregados de maneira mais atraente.
          </SubTitle>
        </Animatable.View>
        <Animatable.View animation="fadeInUpBig">
          <BtnContainer>
            <AddButton
              width={165}
              bgColor="#32BDEA"
              label="Novo Vendedor"
              onPress={handleClickNewSeller}
            />
          </BtnContainer>
          <DataTableSellers sellers={sellerList} />
        </Animatable.View>
      </Container>
    </ScrollView>
  );
};
