

import Header from './Components/Header';
import Card from './Components/Card';
import { Route , Routes } from 'react-router-dom';
import Addmovie from './Components/Addmovie';
import Detail from './Components/Detail';
import { createContext, useState } from 'react';
import Login from './Components/Login'
import Signup from './Components/Signup'

const Appstate =createContext();

function App() {
  const[login,SetLogin]=useState(false);
  const[UserName,SetUsername]=useState("");
  
return(

  <Appstate.Provider value={{login,UserName,SetLogin,SetUsername}}>
  <div className="App relative">
    
    <Header/>
    <Routes>

   <Route path='/'element={<Card/>}/>
   <Route path='/addmovie'element={<Addmovie/>}/>
   <Route path='/detail/:id'element={<Detail/>}/>
   <Route path="/login" element={<Login />} />
   <Route path="/signup" element={<Signup />} />
    </Routes>

  </div>
  </Appstate.Provider>
 
)
  
  
  };

export default App;
export {Appstate}
