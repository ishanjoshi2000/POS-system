
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import LoginPage from './loginpage';
import DashboardPage from './dashboard';

function App() {
  return (
    <BrowserRouter>
   
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  
    </BrowserRouter>
  );
}

export default App;
