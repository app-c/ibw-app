/* eslint-disable camelcase */
import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, Platform, ScrollView } from "react-native";
import { Box, HStack, Image, Button } from "native-base";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Device from "expo-constants";
import { Buttom } from "../../Components/Buttom";
import { Input } from "../../Components/Input";
import { useAuth } from "../../hooks/AuthContext";
import {
  BoxCreateAcc,
  BoxInput,
  Container,
  CreateAccount,
  IconAcc,
  ImageFundo,
  Title,
  Up,
} from "./styles";

import imageFundo from "../../assets/onda1.jpeg";
import fundo from "../../assets/logo-signIn.png";
import { LoginSocial } from "../../Components/LoginSocial";
import theme from "../../global/styles/theme";

interface PropsSignIn {
  email: string;
  senha: string;
}

export function SingIn() {
  const { navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const { signIn, loginSocial } = useAuth();

  const w = Dimensions.get("window").width;

  const [loading, setLoading] = useState(false);

  const device = React.useMemo(() => {
    if (Platform.OS === "ios") {
      const device = Device.platform.ios.buildNumber;
      return Number(device);
    }
  }, []);

  // ?? face .................................................................

  const handleSubmit = useCallback(
    (data: PropsSignIn) => {
      setLoading(true);

      setTimeout(() => {
        signIn({
          email: data.email,
          senha: data.senha,
        })
          .then(() => setLoading(false))
          .catch((err) => {
            // if (err.code === "auth/user-not-found") {
            //   Alert.alert("Erro na autenticação", "Usuaŕio nao encontrado");
            // }
          });
      }, 1500);
    },
    [signIn]
  );

  return (
    <>
      <Container>
        <ImageFundo resizeMode="contain" source={imageFundo} />

        <Box
          left="5"
          top={Platform.OS === "ios" ? w * 0.1 : 15}
          position="absolute"
        >
          <Image resizeMode="contain" alt="logo" source={fundo} size="110" />
        </Box>
        {/* <Box mt={5} ml={40}>
          <HStack
            top={Platform.OS === "ios" ? getStatusBarHeight() : 15}
            space="10%"
          >
            <Button
              bg={theme.colors.secundary[2]}
              onPress={() => navigate("EVENTOS")}
              fontFamily={theme.fonts.Bold}
            >
              EVENTOS
            </Button>
            <Button
              bg={theme.colors.secundary[2]}
              onPress={() => navigate("us")}
              fontFamily={theme.fonts.Bold}
            >
              QUEM SOMOS
            </Button>
          </HStack>
        </Box> */}
        <ScrollView
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            alignItems: "center",
            marginTop: 100,
            height: 600,
          }}
        >
          <Title>LOGIN</Title>
          <BoxInput>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                nome="E-MAIL"
                type="custom"
                name="email"
                icon="user"
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Input
                nome="SENHA"
                secureTextEntry
                type="cel-phone"
                name="senha"
                icon="lock"
              />
            </Form>
          </BoxInput>

          <Buttom
            load={loading}
            nome="ENTRAR"
            pres={() => formRef.current?.submitForm()}
          />
        </ScrollView>

        {/* <LoginSocial pres={() => prompAsync()} /> */}
      </Container>

      <CreateAccount>
        <BoxCreateAcc onPress={() => navigate("singUp")}>
          <IconAcc name="log-in" />
          <Up>CRIE UMA CONTA</Up>
        </BoxCreateAcc>
      </CreateAccount>
    </>
  );
}
