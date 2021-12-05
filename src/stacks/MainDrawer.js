import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useHeaderShown } from "../context/HeaderShown";

import DrawerContent from "../screens/DrawerContent";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import NewProduct from "../screens/ProductScreen/newProduct";
import SellersScreen from "../screens/SellerScreen";
import NewSeller from "../screens/SellerScreen/newSeller";

const Drawer = createDrawerNavigator();

export default () => {
  const { headerShown } = useHeaderShown();

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={HomeScreen} />
      <Drawer.Screen name="Produtos" component={ProductScreen} />
      <Drawer.Screen name="Vendedores" component={SellersScreen} />
      <Drawer.Screen name="Novo Produto" component={NewProduct} />
      <Drawer.Screen name="Novo Vendedor" component={NewSeller} />
    </Drawer.Navigator>
  );
};
