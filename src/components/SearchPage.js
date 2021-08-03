import {useState,useRef} from 'react';
import { useStateValue } from "../StateProvider";
import useGoogleSearch from "../useGoogleSearch";
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import icon from '../assest/google_icon.png';
import AppsIcon from '@material-ui/icons/Apps';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { actionTypes } from '../reducer';

const SearchPage = () => {
    const [{term},dispatch] = useStateValue();
    const inputref = useRef("");
    const {data} = useGoogleSearch(term);
    const submitHandler =(e) => {
        e.preventDefault();
        dispatch({
            type: actionTypes.SET_SEARCH_TERM,
            term: inputref.current.value
        });
        console.log('Enter Press');
        console.log(inputref.current.value);
    }
    return ( 
        <>
         <div className="searchpage">
            <div className="searchpage_header">
                <div className="Search_iconAndBar">
                    <div className="search_google_icon">
                        <NavLink to="/"><img src={icon} alt="google"/></NavLink>
                    </div>
                    <div className="searchBar2">
                        <form onSubmit={submitHandler}>
                            <input ref={inputref} type="text" className="searchtext" />
                        </form>
                         <MicIcon />
                         <SearchIcon />

                   </div>
                </div>
                <div className="header_rightmenu">
                       <AppsIcon />
                       <AccountCircleIcon />
                 </div>
            </div>
            <div className="searchpage_content_wrapper">
                <div className="content1">
                    {data ? data.items.map(item=><div className="content">
                        <h4>{item.link}</h4>
                        <a href={item.link}>{item.title}</a>
                        <p>{item.snippet}</p>
                    </div>) :<CircularProgress className="circularprogress"/>}
                </div>

            </div>
         </div>
        </>
     );
}
 
export default SearchPage;