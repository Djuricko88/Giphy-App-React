

import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header/Header';

const API_KEY = "veShZ6q0uMDlyNmVhFCOcMMV3Gg1r0Cu";

function App() {

  const[loading,setLoading] = useState(true);
  const[data,setData] = useState([]);
  const [query,setQuery] = useState("");
  const [title,setTitle] = useState("Popular");

  useEffect(()=>{

    axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=40`).then((result) =>{
   setData(result.data.data);
   setLoading(false)
    })
    .catch(e => console.log(e));
  },[]);

 if(loading){
  return ( <div className="Loading">Loading...</div>)
 }

const search = () => {
 if(query === ''){
  alert('Please enter a search phrase');
  return;
 }

 axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}`).then((result)=>{
  setData([...result.data.data]);
  setTitle(query);
 })
 
}

return (
  <div className="App">
  <Header/>
  <div className='search-area'>
  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder='Search...'/>
  <button onClick={search}
  >Search</button>
  </div>
  <div className='content'>
  <div className='container'>
  <h1>{title}</h1>

  <div className='row'>
  {data.map((item) =>(
    <div className='col-md-3 gif-item'>
    <a href={item.images.original.url} target='_blank' rel="noreferrer">
  <img src={item.images.original.url} alt="Image description" />
</a>
    <a href={item.user?.profile_url} target='_blank' className='user-area'>
    <img src={item.user?.avatar_url} style={{width:50,height:50,borderRadius:100}} />
    <span>{item.user?.display_name}</span>
    </a>
    
    </div>
      ))}
      </div>
      </div>
      </div>
     
      </div>
      
      );
      
}


export default App;




// return (
//   <div className="App">
 
//   <div className='search-area'>
//   <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder='Search...'/>
//   <button onClick={search}
//   >Search</button>
//   </div>
//   <div className='content'>
//   <div className='container'>
//   <h1>{title}</h1>

//   <div className='row'>
//   {data.map((item) =>(
//     <div className='col-md-3 gif-item'>
//     <a href={item.images.original.url} target='_blank'><img src={item.images.original.url}/></a>
//     <a href={item.user?.profile_url} target='_blank' className='user-area'/>
//     <img src={item.user?.avatar_url} style={{width:50,height:50,borderRadius:100}}>
//     <span>{item.user?.display_name}</span>
//     </a>
    
//     </div>
//       ))}
//       </div>
//       </div>
//       </div>
//       </div>
    
//       );
      
// }


// export default App;
