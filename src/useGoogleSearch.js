import { useState, useEffect} from 'react';
import API_KEY from './key';

const CONTEXT_KEY = "6d760e1bcdc952b13";
const useGoogleSearch = (term) => {
   const [data, setData] = useState(null);

   useEffect(() => {
       const fetchdata = async() =>{
        fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}`)
        .then(response =>response.json())
        .then(result =>setData(result))
        .catch(err =>console.log("error",err))
        console.log(data);
       }
       fetchdata();
   }, [term])
   console.log(data);
   return {data};
};
 
export default useGoogleSearch;