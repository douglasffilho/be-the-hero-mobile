import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import IncidentsView from "./pages/Incidents";
import IncidentDetailsView from "./pages/IncidentDetails";

const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}} >
                <AppStack.Screen name="Incidents" component={IncidentsView} />
                <AppStack.Screen name="IncidentDetails" component={IncidentDetailsView} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
