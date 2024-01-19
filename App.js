import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
    <AuthProvider>
    <AppNavigator />
    </AuthProvider>
    </NavigationContainer>
  );
}

