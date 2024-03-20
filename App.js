import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './screens/Dashboard';

export default function App() {
  return (
    <NavigationContainer>
    <AuthProvider>
    <AppNavigator />
    {/* <Dashboard /> */}
    </AuthProvider>
    </NavigationContainer>
  );
}

