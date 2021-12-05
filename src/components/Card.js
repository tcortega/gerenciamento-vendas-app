import React, { useState } from "react";
import styled from "styled-components/native";
import { ProgressBar } from "react-native-paper";
import { Animated, Easing } from "react-native";

export default ({ title, amount, percentage, progressColor, iconBgColor, imageIcon }) => {
  const [left] = useState(new Animated.Value(-400));

  Animated.timing(left, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: false,
    easing: Easing.elastic(1.5),
  }).start();

  return (
    <Area style={{ left }}>
      <SubArea>
        <IconContainer style={{ backgroundColor: iconBgColor }}>
          <Avatar source={imageIcon}></Avatar>
        </IconContainer>
        <InfoArea>
          <Label>{title}</Label>
          <InfoAmount>{amount}</InfoAmount>
        </InfoArea>
      </SubArea>
      <ProgressBarArea>
        <ProgressBar
          style={{ borderRadius: 10, height: 6 }}
          progress={percentage}
          color={progressColor}
        />
      </ProgressBarArea>
    </Area>
  );
};

const Area = styled(Animated.View)`
  border-radius: 10px;
  background-color: #ffff;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #dcdfe8;
  margin: 10px 0;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  resize-mode: contain;
  margin: 15px;
`;

const SubArea = styled.View`
  background-color: #ffff;
  padding: 10px 0;
  flex-direction: row;
`;

const IconContainer = styled.View`
  border-radius: 10px;
`;

const InfoArea = styled.View`
  padding-left: 15px;
  justify-content: space-between;
`;

const Label = styled.Text`
  font-size: 16px;
  color: #676e8a;
`;

const InfoAmount = styled.Text`
  font-size: 24px;
  color: #676e8a;
  font-weight: 600;
`;

const ProgressBarArea = styled.TouchableOpacity`
  padding-top: 8px;
`;
