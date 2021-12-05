import React from "react";
import { Button } from "react-native-paper";

export default ({
  bgColor,
  width,
  label,
  onPress,
  icon = "plus",
  borderRadius = 10,
  mode = "contained",
  style,
}) => {
  return (
    <Button
      icon={icon}
      uppercase={false}
      style={[
        {
          backgroundColor: bgColor,
          borderRadius,
          paddingTop: 3,
          paddingBottom: 3,
          width,
        },
        style,
      ]}
      onPress={onPress}
      mode={mode}
    >
      {label}
    </Button>
  );
};
