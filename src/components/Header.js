import '../css/Header.css';
import AppsIcon from '@material-ui/icons/Apps';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
const Header = () => {
    return ( 
        <>
        <div className="header">
            <div className="header_leftmenu">
                <Router>
                    <a href="https://about.google/">About</a>
                    <a href="https://chrome.google.com/webstore/category/extensions">Store</a>
                </Router>
            </div>
            <div className="header_rightmenu">
            <Router>
                    <a href="https://mail.google.com/mail/u/0/">Gmail</a>
                    <a href="https://www.google.co.in/imghp?hl=en&tab=ri&authuser=0&ogbl">Image</a>
                </Router>
                <AppsIcon />
                <AccountCircleIcon />
            </div>
        </div>
        </>
     );
}
 
export default Header;