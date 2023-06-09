import React from "react";
import { Image } from "native-base";
import { format } from "date-fns";
import { IUserInc } from "../../dtos";
import theme from "../../global/styles/theme";
import * as S from "./styles";

interface Props {
  item: IUserInc;
  pres: () => void;
  reprovar: () => void;
}

export function CandidatoComp({ item, pres, reprovar }: Props) {
  return (
    <S.Container>
      <S.bx>
        <S.title>Candidato: </S.title>
        <S.sub>{item?.name}</S.sub>
      </S.bx>

      <S.bx>
        <S.title>E-mail: </S.title>
        <S.sub>{item?.email}</S.sub>
      </S.bx>

      <S.bx>
        <S.title>Sexo: </S.title>
        <S.sub>{item?.sexo}</S.sub>
      </S.bx>

      <S.bx>
        <S.title>Data de nascimento: </S.title>
        <S.sub>{item.birthday}</S.sub>
      </S.bx>

      <S.bx>
        <S.title>CPF / Passaporte: </S.title>
        <S.sub>{item.cpf}</S.sub>
      </S.bx>

      <Image src={item.photo} alt="photo" size="md" m="1" />

      <S.bx style={{ marginTop: 10 }}>
        <S.title style={{ color: theme.colors.focus[1] }}>MODALIDADES:</S.title>
      </S.bx>

      {item.bodyboarding !== "" && (
        <S.bx
          style={{
            backgroundColor: theme.colors.secundary[2],
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.colors.secundary[1],
            padding: 5,
            flexDirection: "column",
            marginTop: 3,
            alignItems: "flex-start",
          }}
        >
          <S.sub>{item.bodyboarding}</S.sub>
        </S.bx>
      )}

      {item.cinegrafista !== "" && (
        <S.bx
          style={{
            backgroundColor: theme.colors.secundary[2],
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.colors.secundary[1],
            padding: 5,
            flexDirection: "column",
            marginTop: 3,
            alignItems: "flex-start",
          }}
        >
          <S.sub>{item.cinegrafista}</S.sub>
        </S.bx>
      )}

      {item.category.map((p) => (
        <S.bx
          style={{
            backgroundColor: theme.colors.secundary[2],
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.colors.secundary[1],
            padding: 5,
            flexDirection: "column",
            marginTop: 3,
            alignItems: "flex-start",
          }}
          key={p.type}
        >
          <S.sub>{p.type}</S.sub>

          {p.type !== "BODYBOARDING" && p.type !== "CINEGRAFISTA" && (
            <S.sub>EXPERIÊNCIA: {p.exp}</S.sub>
          )}
        </S.bx>
      ))}

      <S.bx>
        <S.title>Data de Inscriçao: </S.title>
        <S.sub>{format(Number(item?.created_at), "dd/MM/yy - HH:mm")}h</S.sub>
      </S.bx>

      <S.bx>
        <S.title>Status: </S.title>
        <S.sub
          style={{
            color:
              item.status === "INSCRIÇÃO APROVADA"
                ? theme.colors.secundary[1]
                : "#861818",
          }}
        >
          {" "}
          {item?.status}
        </S.sub>
      </S.bx>

      {item.status === "Inscrição solicitada" && (
        <S.row>
          <S.buttonB onPress={reprovar}>
            <S.textButton>REPROVAR</S.textButton>
          </S.buttonB>

          <S.buttonA onPress={pres}>
            <S.textButton>APROVAR</S.textButton>
          </S.buttonA>
        </S.row>
      )}
    </S.Container>
  );
}
