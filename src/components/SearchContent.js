import GoogleIcon from '../assest/google_icon.png';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Link,
    useHistory
  } from "react-router-dom";
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
const Searchcontainer = () => {
    const [{}, dispatch] = useStateValue();

    const history = useHistory();
    const [input,setInput] = useState("");
    const searchhandler = e =>{
       e.preventDefault();
       console.log(input);
       if(input){
        dispatch({
            type: actionTypes.SET_SEARCH_TERM,
            term: input
        });
        history.push('/searchpage');
       }
       else{
           alert('Invalid Input!');
       }
    }
    return ( 
        <>
        <div className="search_content">
            <div className="Google_icon">
               <img src={GoogleIcon} alt="" />
            </div>
            <form onSubmit={searchhandler}>
                <div className="serachbar">
                <SearchIcon />
                    <input type="text" className="searchtext" onChange={e =>setInput(e.target.value)}/>
                    <MicIcon />
                </div>
                <div className="search_button_wrapper">
                    <Router>
                        {/* <Link onClick={searchhandler}>Google Search</Link> */}
                        <button type="submit" onClick={searchhandler}>Google Search</button>
                        <Link>I'm Felling Lucky</Link>
                    </Router>
                </div>
            </form>
           <div className="change_language">
               <p>Google offered in: <a href="/sdfdfs">हिन्दी</a> <a href="/sdfdfs">বাংলা</a> <a href="/sdfdfs">తెలుగు</a> <a href="/sdfdfs">मराठी</a> <a href="/sdfdfs">தமிழ்</a> <a href="/sdfdfs">ગુજરાતી</a> <a href="/sdfdfs">ಕನ್ನಡ</a> <a href="/sdfdfs">മലയാളം</a> <a href="/sdfdfs">ਪੰਜਾਬੀ</a></p>
           </div>
        </div>
        </>
     );
}
 
export default Searchcontainer;