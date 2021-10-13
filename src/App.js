import './App.css';
import { useState,useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';

function App() {
  const[pokemon,setPokemon] = useState([]);
  const[currentUrl,setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const[nextUrl,setNextUrl] = useState('');
  const[prevUrl,setPrevUrl] = useState('');
  const[loading,setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios.get(currentUrl,{
      cancelToken:new axios.CancelToken(c=>cancel = c)
    })
  .then(
    res=>{
      setPokemon(res.data.results.map(p=>p.name));
      setLoading(false);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
    }
    )
    return ()=> cancel();
  }, [currentUrl])

  function gotoNextPage(){
    setCurrentUrl(nextUrl);
  }
  function gotoPrevPage(){
    setCurrentUrl(prevUrl);
  }
  
  if (loading) return "Loading......"

  return (
    <div className="App">
      <PokemonList pokemon={pokemon}/>
      <Pagination
      gotoNextPage = {nextUrl ? gotoNextPage: null}
      gotoPrevPage = {prevUrl ? gotoPrevPage: null}
      />
    </div>
  );
}

export default App;
