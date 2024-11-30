import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "./TabBarIcon";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home/Home";
import Settings from "../screens/settings";
import History from "../screens/history";
import Result from "../screens/result";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const HistoryStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

const HomeStackScreen = (props) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Result" component={Result} />
    </HomeStack.Navigator>
  );
};

const HistoryStackScreen = (props) => {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Result" component={Result} />
    </HistoryStack.Navigator>
  );
};

function SettingsScreenFunc() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
    </SettingsStack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeFunc"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} route={route} />
        ),
        tabBarActiveTintColor: "#006CF4",
        tabBarInactiveTintColor: "#D0D2D2",
      })}
    >
      <Tab.Screen
        name="HomeFunc"
        component={HomeStackScreen}
        options={{ title: "Create", tabBarLabel: "New Emoji" }}
      />
      <Tab.Screen
        name="HistoryFunc"
        component={HistoryStackScreen}
        options={{ title: "History", tabBarLabel: "History" }}
      />
      <Tab.Screen
        name="SettingsFunc"
        component={SettingsScreenFunc}
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
