import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, StatusBar, Vibration } from "react-native";
import { Container, View, Text, Button, Icon } from "native-base";
import color from "color";
import * as Animatable from "react-native-animatable";

import { blixtTheme } from "../../native-base-theme/variables/commonColor";

export interface IPincode {
  textAction: string;
  onTryCode: (code: string) => Promise<boolean>;
}
export default ({ onTryCode, textAction }: IPincode) => {
  const pincodeText = useRef<Animatable.View>();
  const [code, setCode] = useState<number[]>([]);

  const onNumberPress = (n: number) => {
    setCode((code) => {
      if (code.length < 6) {
        return [...code, n];
      }
      return code;
    });
    Vibration.vibrate(32);
  };

  const onBackspacePress = () => {
    setCode((c) => {
      const tmp = c.slice(0);
      tmp.pop();
      return tmp;
    });
    Vibration.vibrate(32);
  };

  const onClearPress = () => {
    setCode([]);
    Vibration.vibrate(35);
  };

  useEffect(() => {
    if (code.length === 6) {
      (async () => {
        if (!await onTryCode(code.join(""))) {
          setTimeout(() => pincodeText!.current!.shake!(950), 1);
          Vibration.vibrate(300);
        }
        setCode([]);
      })();
    }
  }, [code]);

  const pincodeInput = "●".repeat(code.length);
  const pincodeInputPlaceholder = "●".repeat(6 - code.length);


  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        hidden={false}
        translucent={true}
        networkActivityIndicatorVisible={true}
        barStyle="light-content"
      />
      <View style={style.content}>
        <View style={style.pincodeInput}>
          <Text style={style.enterPincodeText}>{textAction}</Text>
          <View style={style.pincodeInputContainer}>
            <Animatable.Text style={style.pincodeInputText} ref={(pincodeText as any)}>
              <Text style={style.pincodeInputText}>{pincodeInput}</Text>
              <Text style={[style.pincodeInputText, style.pincodeInputPlaceholderText]}>
                {pincodeInputPlaceholder}
              </Text>
            </Animatable.Text>
          </View>
        </View>
        <View style={style.pincodeButtons}>
          <View style={style.buttonRow}>
            {[1, 2, 3].map((n) => (
              <Button key={n} onPress={() => onNumberPress(n)} style={style.pincodeButton} rounded={false}>
                <Text style={style.pincodeButtonText}>{n}</Text>
              </Button>
            ))}
          </View>
          <View style={style.buttonRow}>
            {[4, 5, 6].map((n) => (
              <Button key={n} onPress={() => onNumberPress(n)} style={style.pincodeButton}>
                <Text style={style.pincodeButtonText}>{n}</Text>
              </Button>
            ))}
          </View>
          <View style={style.buttonRow}>
            {[7, 8, 9].map((n) => (
              <Button key={n} onPress={() => onNumberPress(n)} style={style.pincodeButton}>
                <Text style={style.pincodeButtonText}>{n}</Text>
              </Button>
            ))}
          </View>
          <View style={style.buttonRow}>
            <Button onPress={onClearPress} style={[style.buttonDelete, style.pincodeButton]}>
              <Text style={style.pincodeButtonText}>
                <Icon style={style.buttonClearIcon} type="MaterialCommunityIcons" name="delete-forever" />
              </Text>
            </Button>
            <Button onPress={() => onNumberPress(0)} style={style.pincodeButton} rounded={false}>
              <Text style={style.pincodeButtonText}>0</Text>
            </Button>
            <Button onPress={onBackspacePress} style={[style.pincodeButton, style.buttonBackspace]}>
              <Text style={style.pincodeButtonText}>
                <Icon style={style.buttonBackspaceIcon} type="FontAwesome5" name="backspace" />
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Container>
  );
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "blue",
  },
  pincodeInput: {
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor:"yellow",
  },
  enterPincodeText: {
    textAlign: "center",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  pincodeInputContainer: {
    backgroundColor: blixtTheme.gray,
  },
  pincodeInputText: {
    textAlign: "center",
    fontSize: 44,
    lineHeight: 54,
  },
  pincodeInputPlaceholderText: {
    color: color(blixtTheme.lightGray).darken(0.6).hex(),
  },
  pincodeButtons: {
    // backgroundColor:"red",
    flex: 1.18,
    justifyContent: "center",
    paddingTop: 64,
    paddingRight: 64,
    paddingBottom: 16,
    paddingLeft: 64,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  pincodeButton: {
    margin: 10,
    width: 72,
    height: 72,
    justifyContent: "center",
    borderRadius: 12,
  },
  pincodeButtonText: {
    fontSize: 32,
    lineHeight: 42,
  },
  buttonBackspace: {
    elevation: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    backgroundColor: "transparent",
  },
  buttonDelete: {
    elevation: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    backgroundColor: "transparent",
  },
  buttonBackspaceIcon: {
    color: blixtTheme.light,
    fontSize: 23,
  },
  buttonClearIcon: {
    color: blixtTheme.light,
    fontSize: 34,
  },
});