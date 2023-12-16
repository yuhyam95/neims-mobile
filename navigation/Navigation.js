import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login'; 
import Dashboard from '../screens/Dashboard';
import AssessmentDashboard from '../screens/AssessmentDashboard';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const {user} = useAuth();
  const userRole = user?.role.name;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Dashboard" component={userRole == "Store-officer" ? Dashboard : AssessmentDashboard} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
