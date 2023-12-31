import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/Navigation';
import AddProduct from './screens/AddProduct';
import { AssessmentForm } from './screens/AssesmentForm';
import Login from './screens/Login';

export default function App() {
  return (
    <AuthProvider>
    <AppNavigator />
    </AuthProvider>
  );
}

