import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import { Container, Greeting, GreetingDesc } from "./styles";
import Card from "../../components/Card";
import { Colors } from "react-native-paper";
import Api from "../../Api";
import { useUser } from "../../context/User";

import * as Animatable from "react-native-animatable";

export default () => {
  const { userData } = useUser();

  const [dashboardData, setDashboardData] = React.useState({});
  const [isRefreshing, setRefreshing] = React.useState(false);

  const getDashboardData = async () => {
    setDashboardData({});

    const res = await Api.getDashboardData();
    setDashboardData(res);
  };

  React.useEffect(() => {
    getDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    getDashboardData();
  };

  const hour = new Date().getHours();
  const greetingTime =
    hour >= 4 && hour <= 11
      ? "Bom Dia"
      : hour >= 12 && hour <= 17
      ? "Boa Tarde"
      : "Boa Noite";

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      <Container>
        <Animatable.View animation="fadeInDownBig">
          <Greeting>
            Olá {userData.name.split(" ")[0]}, {greetingTime}
          </Greeting>
          <GreetingDesc>
            Seu dashboard te dá uma visualização da performance do seu negócio.
          </GreetingDesc>
        </Animatable.View>
        <Card
          title={"Total de Vendas"}
          amount={dashboardData.purchaseCount}
          iconBgColor={"#dbf7ff"}
          imageIcon={require("../../assets/img/purchase-icon.png")}
          percentage={dashboardData.purchaseCount > 0 ? 0.8 : 0}
          progressColor={Colors.cyan200}
        />
        <Card
          title={"Produtos Cadastrados"}
          amount={dashboardData.productCount}
          iconBgColor={"#7ebd94"}
          imageIcon={require("../../assets/img/product-icon.png")}
          percentage={dashboardData.productCount > 0 ? 0.3 : 0}
          progressColor={Colors.lightGreen400}
        />
        <Card
          title={"Vendedores Cadastrados"}
          amount={dashboardData.sellerCount}
          iconBgColor={"#b05681"}
          imageIcon={require("../../assets/img/seller-icon.png")}
          percentage={dashboardData.sellerCount > 0 ? 0.6 : 0}
          progressColor={Colors.purple600}
        />
      </Container>
    </ScrollView>
  );
};
