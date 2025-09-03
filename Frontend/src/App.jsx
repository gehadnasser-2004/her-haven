import { Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Homepage from './pages/Homepage';
import SelectSection from './pages/SelectSection';

function App() {
    return (
      <Routes>
      <Route index element={<Homepage />} />
      <Route path='select' element={<SelectSection />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
    </Routes>
  )
}

export default App;
