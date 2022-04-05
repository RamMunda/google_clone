import GoogleIcon from '../assest/google_icon.png';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Link,
    useHistory
  } from "react-router-dom";
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import HistoryIcon from '@material-ui/icons/History';
import ClearIcon from '@material-ui/icons/Clear';
import { uid} from './uid';
const speechrecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 

console.log(window.indexedDB);
var db = null;
var objectStore = null;
var DBOpenReq = indexedDB.open("Historydb", 1);

//Error occurred while trying to open DB
DBOpenReq.addEventListener("error", (err) => {
//Error occurred while trying to open DB
  console.warn(err);
});

DBOpenReq.addEventListener("success", (ev) => {
//DB has been opened... after upgradeneeded
  db = ev.target.result;
  console.log("success", db);
});
DBOpenReq.addEventListener("upgradeneeded", (ev) => {
    //first time opening this DB
    //OR a new version was passed into open()
    db = ev.target.result;
    let oldVersion = ev.oldVersion;
    let newVersion = ev.newVersion || db.version;
    console.log("DB updated from version", oldVersion, "to", newVersion);

    console.log("upgrade", db);
    console.log("upgradeneeded", db);
    objectStore = db.createObjectStore("HistotyStore", {
    keyPath: "id"
    });
});

function makeTX(storeName, mode) {
    let tx = db.transaction(storeName, mode);
    tx.onerror = (err) => {
    console.warn(err);
    };
    return tx;
}

function addHistorydata(ev,query){
    ev.preventDefault();
    //one of the form buttons was clicked

    let HistoryObject = {
    id: uid(),
    history:query,
    web:"url"
    };

    let tx = makeTX("HistotyStore", "readwrite");
    tx.oncomplete = (ev) => {
    console.log(ev);
    };

    let store = tx.objectStore("HistotyStore");
    let request = store.add(HistoryObject); //request an insert/add

    request.onsuccess = (ev) => {
        console.log("successfully added an object");
        //move on to the next request in the transaction or
        //commit the transaction
    };
    request.onerror = (err) => {
        console.log("error in request to add");
    };
};

function buildList() {
    //use getAll to get an array of objects from our store

    let tx = makeTX("HistotyStore", "readonly");
    // tx.oncomplete = (ev) => {
    //   //transaction for reading all objects is complete
    // };
    let store = tx.objectStore("HistotyStore");
    let getReq = store.getAll();
    //returns an array
    //option can pass in a key or a keyRange
    getReq.onsuccess = (ev) => {
      //getAll was successful
      let request = ev.target; //request === getReq === ev.target
      console.log({ request });
      let completeHistory = [];
    //   completeHistory = request.result.map((whiskey) => whiskey)

    };
    getReq.onerror = (err) => {
      console.warn(err);
    };
}

const Searchcontainer = () => {
    const [{}, dispatch] = useStateValue();
    useEffect(()=>{
        // buildList();
    },[]);
    const history = useHistory();
    const [input,setInput] = useState("");
    const [focusdetail,setfocus] = useState(false);
    const searchhandler = e =>{
       e.preventDefault();
       console.log(input);
       if(input){
        localStorage.setItem('term', input);
        addHistorydata(e,input);
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
    const spechstarthandler = () =>{

        if(speechrecognition){
            const recognition = new speechrecognition();
            recognition.continuous = true;
            recognition.start();
            recognition.addEventListener("result", function(e){
                e.preventDefault();
                const transcript = e.results[0][0].transcript;
                if(transcript){
                    localStorage.setItem('term', transcript);
                    dispatch({
                        type: actionTypes.SET_SEARCH_TERM,
                        term: transcript
                    });
                    history.push('/searchpage');
                   }
                   else{
                    //    alert('Invalid Voice text!');
                   }
                console.log(transcript);
            });
        }
    }
    const focusHandler = () =>{
        console.log("Now input field is focused");
        setfocus({focusdetail:true});

    }
    const blurHandler = () =>{
        console.log("Now input field is blured");
        setfocus({focusdetail:false});
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
                    <input type="text" className="searchtext" onChange={e =>setInput(e.target.value)} onFocus={focusHandler} onBlur={blurHandler} />
                    <MicIcon onClick={spechstarthandler}/>
                    <div className={focusdetail ? `Historydata`:`HistorydatawithoutFocus`}>
                        <div className="history_content">
                            <div className="historyandContent">
                                <HistoryIcon />
                                <p>flipkart</p>
                            </div>
                            <ClearIcon />
                        </div>
                        <div className="history_content">
                            <div className="historyandContent">
                                <HistoryIcon />
                                <p>flipkart</p>
                            </div>
                            <ClearIcon />
                        </div>
                        <div className="history_content">
                            <div className="historyandContent">
                                <HistoryIcon />
                                <p>flipkart</p>
                            </div>
                            <ClearIcon />
                        </div>
                    </div>
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