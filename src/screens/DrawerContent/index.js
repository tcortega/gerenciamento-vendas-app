import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  useTheme,
} from "react-native-paper";
import { View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./styles";
import { useUser } from "../../context/User";

export default (props) => {
  const { userData, setUserData } = useUser();

  const logout = () => {
    setUserData({ name: "", email: "" });

    props.navigation.navigate("SplashScreen");
  };

  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.userInfoWrapper}>
              <Avatar.Image
                source={require("../../assets/img/business-man.jpg")}
                size={50}
              />
              <View style={styles.userInfoData}>
                <Title style={styles.title}>{userData.name}</Title>
                <Caption style={styles.caption}>{userData.email}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="view-dashboard-outline" color={color} size={size} />
              )}
              label="Dashboard"
              onPress={() => {
                props.navigation.navigate("Dashboard");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="purse-outline" color={color} size={size} />
              )}
              label="Produtos"
              onPress={() => {
                props.navigation.navigate("Produtos");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-tie-outline" color={color} size={size} />
              )}
              label="Vendedores"
              onPress={() => {
                props.navigation.navigate("Vendedores");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="store-outline" color={color} size={size} />
              )}
              label="Vendas"
              onPress={() => {}}
            />
          </Drawer.Section>
          {/* <Drawer.Section title="Preferências">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Modo Escuro</Text>
                <View pointerEvent="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sair"
          onPress={logout}
        />
      </Drawer.Section>
    </View>
  );
};
