import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Addmovie from './Addmovie';
import { Appstate } from '../App';



function Header() {
  const useAppstate =useContext(Appstate)
  return (
    
  <div className=' sticky z-10 top-0 header text-3xl flex justify-between  text-red-500 font-bold p-3 border-b-2 border-gray-500'>
      
    <Link to={'/'}> <span>Filmy <span className='text-white'>Verse</span></span> </Link>
    {useAppstate.login?
     <Link to={'/addmovie'}><h1 className='text-lg text-white flex items-center cursor-pointer'>
      
     <Button><AddIcon className='mr-2'/>  <span className='text-white'>Add New</span></Button>
       </h1></Link>
       :
       <Link to={'/login'}><h1 className='text-lg bg-green-600 text-white flex items-center cursor-pointer'>
      
     <Button> <span className='text-white font-medium capitalize'>login</span></Button>
       </h1></Link>
       
      }
      </div>
  )
}

export default Header