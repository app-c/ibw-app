/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from "react";

import {
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";
import Firestore from "@react-native-firebase/firestore";
import Auth from "@react-native-firebase/auth";
import { useAuth } from "../../hooks/AuthContext";
import {
  Avatar,
  BoxDeleteProfile,
  Container,
  Header,
  LogOf,
  TextContainer,
  Title,
  TitleDeleteProfile,
  TitleName,
} from "./styles";
import theme from "../../global/styles/theme";

type Props = DrawerContentComponentProps;

export function DrawerContent({ ...props }: Props) {
  const { signOut, user, updateUser } = useAuth();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProfile = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setLoading(true);
    }

    const fileName = new Date().getTime();
    const reference = storage().ref(`/avatar/${fileName}.png`);

    await reference.putFile(result.uri);
    const photoUrl = await reference.getDownloadURL();

    Firestore()
      .collection("users")
      .doc(user.id)
      .update({
        avatar: photoUrl,
      })
      .then(() => Alert.alert("Avatar", "Avatar atualizado com sucesso"))
      .catch(() => {
        Alert.alert("Cadastro", "Não foi possível atualizar o avatar");
      })
      .finally(() => setLoading(false));
    setLoading(false);

    const upUser = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      avatar: photoUrl,
      adm: user.adm,
    };
    updateUser(upUser);
  }, [updateUser, user]);

  const deleteProfile = React.useCallback(() => {
    const user = Auth().currentUser;
    user.delete();
    signOut();
  }, [signOut]);

  const handleDeleteProfile = React.useCallback(() => {
    Alert.alert(
      "ATENÇÃO!",
      "Você está preste a excluir sua conta, após a confirmação você perderá todos os seus dados de acesso do IBW",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletear",
          onPress: async () => {
            deleteProfile();
          },
        },
      ]
    );
  }, [deleteProfile]);

  return (
    <Container>
      <Header>
        {user.avatar ? (
          <TouchableOpacity onPress={handleProfile}>
            {loading ? (
              <ActivityIndicator size="large" color={theme.colors.text[2]} />
            ) : (
              <Avatar source={{ uri: user.avatar }} />
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleProfile}
            style={{
              backgroundColor: theme.colors.text[4],
              height: RFValue(50),
              width: RFValue(50),
              borderRadius: RFValue(25),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator size="large" color={theme.colors.text[2]} />
            ) : (
              <Feather
                name="user"
                size={RFValue(35)}
                color={theme.colors.text[2]}
              />
            )}
          </TouchableOpacity>
        )}
        <TextContainer>
          <Text style={{ color: theme.colors.text[2], fontSize: RFValue(18) }}>
            Olá
          </Text>
          <TitleName>{user?.nome} </TitleName>
        </TextContainer>
      </Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <DrawerItemList {...props} />

        <BoxDeleteProfile onPress={handleDeleteProfile}>
          <TitleDeleteProfile>EXCLUIR CONTA</TitleDeleteProfile>
        </BoxDeleteProfile>

        <LogOf
          onPress={() => {
            signOut();
          }}
        >
          <Title>SAIR</Title>
        </LogOf>
      </ScrollView>
    </Container>
  );
}
