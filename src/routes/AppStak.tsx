import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SingIn } from "../pages/SingIn";
import { SingUp } from "../pages/SingUp";
import { Splash } from "../pages/Splash";
import { Us } from "../pages/Us";
import { Eventos } from "../pages/Eventos";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStak() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="splash" component={Splash} />
      <Screen name="singIn" component={SingIn} />
      <Screen name="singUp" component={SingUp} />
      <Screen name="us" component={Us} />
      <Screen name="EVENTOS" component={Eventos} />
    </Navigator>
  );
}
