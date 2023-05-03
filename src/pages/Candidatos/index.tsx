import React from "react";
import fire from "@react-native-firebase/firestore";
import { Form } from "@unform/mobile";
import { FlatList } from "react-native";
import { Box, Center } from "native-base";
import * as Link from "expo-linking";
import { CandidatoComp } from "../../Components/CandidatoComp";
import { IUserInc } from "../../dtos";
import * as S from "./styles";
import { Input } from "../../Components/FormInput";
import { Buttom } from "../../Components/Buttom";
import { Header } from "../../Components/Header";

export function Candidatos() {
  const [response, setResponse] = React.useState<IUserInc[]>([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    fire()
      .collection("inscricao")
      .onSnapshot((h) => {
        const rs = h.docs.map((p) => {
          return {
            ...p.data(),
            id: p.id,
          } as IUserInc;
        });

        setResponse(rs);
      });
  }, []);

  const handleLinking = React.useCallback(async () => {
    Link.openURL("http://ibw-web.app");
  }, []);

  const list =
    search !== ""
      ? response.filter((h) => h.name.includes(search.toUpperCase()))
      : response;

  const handleUpdate = React.useCallback(async (id: string) => {
    fire().collection("inscricao").doc(id).update({
      status: "INSCRIÇÃO APROVADA",
    });
  }, []);

  const reprove = React.useCallback(async (id: string) => {
    fire().collection("inscricao").doc(id).update({
      status: "INSCRIÇÃO REPROVADO",
    });
  }, []);

  return (
    <S.Container>
      <Header icon="menu" />

      <Center>
        <S.title>Lista de Inscritos</S.title>
        <S.touch onPress={handleLinking}>
          <S.link>Baixar lista</S.link>
        </S.touch>
      </Center>

      <Box mt="5" px={10}>
        <Form>
          <Input
            onChangeText={setSearch}
            value={search}
            name="search"
            nome="Pesquisar por nome"
            icon="search"
          />
        </Form>
      </Box>

      <FlatList
        data={list}
        keyExtractor={(h) => h.id}
        renderItem={({ item: h }) => (
          <CandidatoComp
            reprovar={() => reprove(h.id)}
            pres={() => handleUpdate(h.id)}
            item={h}
          />
        )}
      />
    </S.Container>
  );
}