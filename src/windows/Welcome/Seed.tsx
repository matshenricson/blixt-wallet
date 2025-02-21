import React from "react";
import { StatusBar } from "react-native";
import { Container, Text, View, Button, H1, Card, CardItem, Content } from "native-base";

import { useStoreState } from "../../state/store";
import { NavigationScreenProp } from "react-navigation";
import { blixtTheme } from "../../../native-base-theme/variables/commonColor";
import style from "./style";

interface IProps {
  navigation: NavigationScreenProp<{}>;
}
export default ({ navigation }: IProps) => {
  const seed = useStoreState((state) => state.walletSeed);

  if (!seed) {
    return (<></>);
  }

  return (
    <Container>
      <StatusBar
        backgroundColor={blixtTheme.dark}
        hidden={false}
        translucent={false}
        networkActivityIndicatorVisible={true}
        barStyle="light-content"
      />
      <Content contentContainerStyle={style.content}>
        <View style={style.upperContent}>
          <Card style={style.card}>
            <CardItem style={style.cardItem}>
              <>
                <View style={style.wordColumn}>
                  {seed.slice(0, 8).map((word, i) => (
                    <Text key={word + i}>{i + 1}. {word}</Text>
                  ))}
                </View>
                <View style={style.wordColumn}>
                {seed.slice(8, 16).map((word, i) => (
                    <Text key={word + i + 8}>{i + 9}. {word}</Text>
                  ))}
                </View>
                <View style={style.wordColumn}>
                {seed.slice(16, 24).map((word, i) => (
                    <Text key={word + i + 16}>{i + 17}. {word}</Text>
                  ))}
                </View>
              </>
            </CardItem>
          </Card>
        </View>
        <View style={style.lowerContent}>
          <View style={style.text}>
            <H1 style={style.textHeader}>Welcome to Blixt Wallet!</H1>
            <Text>
              This is your backup seed.{"\n"}{"\n"}
              Write it down on a piece of paper and store it in a safe place.{"\n"}
              Should you lose access to your wallet,{"\n"}you may be able to recover your funds by using your backup seed.{"\n"}{"\n"}
              The seed standard being used is aezeed.
            </Text>
          </View>
          <View style={style.buttons}>
            <Button style={style.button} block={true} onPress={() => navigation.navigate("Confirm")}>
              <Text>I have written it down</Text>
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
}
