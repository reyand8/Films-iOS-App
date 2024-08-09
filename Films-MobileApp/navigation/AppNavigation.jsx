import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import FilmScreen from "../screens/FilmScreen";
import SearchScreen from "../screens/SearchScreen";
import PersonScreen from "../screens/PersonScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home"  options={{headerShown: false }} component={HomeScreen} />
                <Stack.Screen name="Film" options={{headerShown: false}} component={FilmScreen} />
                <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
                <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;