import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './pages/Home';
import SurveyList from './components/survey/SurveyList';
import TakeSurvey from './components/survey/TakeSurvey';

// PrimeReact CSS
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="surveys"
              element={
                <PrivateRoute>
                  <SurveyList />
                </PrivateRoute>
              }
            />
            <Route
              path="surveys/take/:id"
              element={
                <PrivateRoute>
                  <TakeSurvey />
                </PrivateRoute>
              }
            />
          </Route>
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
