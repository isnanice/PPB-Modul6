import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { MonitoringScreen } from "./src/screens/MonitoringScreen.js";
import { ControlScreen } from "./src/screens/ControlScreen.js";
import { ProfileScreen } from "./src/screens/ProfileScreen.js";
import { assertConfig } from "./src/services/config.js";
import { tokens } from "./src/theme/tokens.js";

// Keep the native splash visible until we're ready
SplashScreen.preventAutoHideAsync().catch(() => {});

const Tab = createBottomTabNavigator();
const { color } = tokens;

enableScreens(true);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        assertConfig();
        // Brief delay so the splash is visible
        await new Promise((resolve) => setTimeout(resolve, 1200));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: color.bg,
      card: color.surface,
      text: color.text,
      border: color.border,
      primary: color.primary,
    },
  };

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer theme={theme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: true,
              headerTitle: "LiveTemp",
              headerTitleAlign: "left",
              headerTintColor: color.text,
              headerStyle: {
                backgroundColor: color.surface,
                borderBottomWidth: 1,
                borderBottomColor: color.border,
              },
              headerTitleStyle: {
                fontWeight: "600",
                fontSize: 17,
                fontFamily: "monospace",
                letterSpacing: -0.5,
              },
              tabBarActiveTintColor: color.primary,
              tabBarInactiveTintColor: color.text2,
              tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
              tabBarStyle: {
                backgroundColor: color.surface,
                borderTopWidth: 1,
                borderTopColor: color.border,
              },
              tabBarHideOnKeyboard: true,
              tabBarIcon: ({ color: iconColor }) => {
                let iconName;
                if (route.name === "Monitoring") iconName = "pulse";
                else if (route.name === "Control") iconName = "options";
                else iconName = "person";
                return <Ionicons name={iconName} size={24} color={iconColor} />;
              },
            })}
          >
            <Tab.Screen name="Monitoring" component={MonitoringScreen} />
            <Tab.Screen name="Control" component={ControlScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
