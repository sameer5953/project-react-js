import React, { useEffect, useState } from 'react'
import { Audio ,ThreeDots} from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { getDocs } from 'firebase/firestore';
import { MoviesRef } from './Firebase/Firebase';
import { Link } from 'react-router-dom';

function Card() {
    const[Data,Setdata]=useState([]);
    const[Loading,Setloading]=useState(false);
    useEffect(()=>{
      async function getData(){
      Setloading(true);
      const _data =await getDocs(MoviesRef);
      _data.forEach((doc)=>{
        Setdata((prev)=>[...prev,{...(doc.data()),id:doc.id}])
      })
      console.log(_data);
      Setloading(false);
      }
      getData();
    },[])
  return (

    <div className='flex flex-wrap justify-between px-3 mt-2'> 
    {Loading ?<div className='w-full flex justify-center items-center h-96'><ThreeDots height={40} color='white'/></div>:
     Data.map((e,i)=>{
        return(
      <Link to={`/detail/${e.id}`}><div key={i} className='bg-slate-900 shadow-lg p-2  hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500'>
          <img className ='h-60 md:72'src={e.image} />
          <h1> <span className='text-gray-600'>Name:</span> {e.title}</h1>
          <h1  className='flex item-center mr-1'>
            <span className='text-gray-600'>Rating :</span>
            <ReactStars 
            size={20}
            half={true}
            value={5}
            edit={false}
            />
            </h1>
           
          <h1><span className='text-gray-600'> year :</span>{e.year}</h1>
        </div></Link> 
      )})
        }
        </div>
    
    
  )
}


export default Card