import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { LoginPage } from './pages/Login/Login.page'
import { Home } from './pages/Home/Home.page'
import { ProtectedRoute } from './routes/protectedRoute/ProtectedRoute.route'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>home</div>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path='dashboard' element={<ProtectedRoute/>}>
        <Route path='users' element={<div>here is users page</div>}/> 
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
