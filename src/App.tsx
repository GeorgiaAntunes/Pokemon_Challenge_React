import { useEffect, useState } from 'react'
import './App.css'
/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

interface PokemonList {
  name: string;
  url: string;
}

interface DetailsProps {
  name: string;
  sprites: {
    front_default: string;
  };
  base_experience: number;
}

function App() {
  const [pokemons, setPokemons] = useState<PokemonList[]>([])
  
  useEffect(()=>{
    fetchPokemon();
  },[])

  const fetchPokemon = async() =>{
    const url = `https://pokeapi.co/api/v2/pokemon`;

    const result = await fetch(url)
    const parsedData = await result.json();
    const sortedArray = [...parsedData.results];
    sortedArray.sort((a,b) => {
      return a.name.localeCompare(b.name);
    })
    setPokemons(sortedArray);

  
  }

  

  return (
    <>
    <div>{pokemons.map((pokemon)=>{
      return (
        <Pokemon key={pokemon.name} detailsData={pokemon}/>
      )
    })}</div>
   
    </>
  )
}

interface PokemonProps {
  detailsData: PokemonList;
}

const Pokemon: React.FC<PokemonProps> = ({detailsData}) => {
  const [details, setDetails] = useState<DetailsProps| null>(null);

  useEffect(()=>{
    fetchDetails();
  },[])

  const fetchDetails = async() => {
   
    const result = await fetch(detailsData.url)
    const parsedData = await result.json();
    setDetails(parsedData);
   
  }

  if(!details){
    return <div>no Details</div>
  }

  return(
  <>
   <div>
    <img src={details.sprites.front_default} />
    <span>
        <b>{details.name}</b> - EXPERIENCE {details.base_experience}
      </span>
   </div>
  </>
  )
}

export default App
