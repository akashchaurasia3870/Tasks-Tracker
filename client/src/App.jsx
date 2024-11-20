import './App.css'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import SignIn from './module/auth/pages/SignIn'
import SignUp from './module/auth/pages/SignUp'
import ResetCreds from './module/auth/pages/ResetCreds';
import Home from './module/home/pages/Home';
import NotFound from './global/components/not_found/NotFound';
import Contact from './global/pages/contact/Contact';
import About from './global/pages/About/About';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact={true} path='/signup' element={<SignUp/>}/>
        <Route exact={true} path='/signin' element={<SignIn/>}/>
        <Route exact={true} path='/reset_creds' element={<ResetCreds/>}/>
        <Route exact={true} path='/' element={<Home/>}>
          <Route exact={true} path='*' element={<About/>}/>
          <Route exact={true} path='/about' element={<About/>}/>
          <Route exact={true} path='/contact' element={<Contact/>}/>
        </Route>
        <Route exact={true} path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
