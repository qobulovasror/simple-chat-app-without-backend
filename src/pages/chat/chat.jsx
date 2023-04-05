import {useEffect, useState} from 'react'
import {signOut} from 'firebase/auth';
import {auth, db} from '../../firebase/firebase';
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';

import CreateChat from './components/createChat'

import './assets/chat.css';
import LeftPanel from './components/leftPanel';
import ChatList from './components/chatList';
import ChatBody from './components/chatBody/chatBody';

function Chat({setUserAuth}) {
    const navigate = useNavigate();
    const [close, setClose] = useState(false);
    const [mode, setMode] = useState('light');
    const [userData, setUserData] = useState("");
    const [chatList, setChatList] = useState([]);
    const [selectChat, setSelectChat] = useState("")
    const handleLogout = () => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Are you want log out? 🤨"))
          logout()
      };
    const logout = () => {
        signOut(auth)
          .then(() => {
            setUserAuth("")
            window.localStorage.setItem('userAuthTokin', "")
            navigate("/");
          })
          .catch((error) => {
            toast.error(error + "🙁");
          });
    };
    const getChatList = async()=>{
      await getDocs(collection(db, "chats"))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }));
                  setChatList(newData)
          })
          .catch(err=>{
            console.log(err)
            toast.error(err)
          })
    }
    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserData(user);
        } 
      });

      getChatList()
    }, [])
  return (
    <div className={`display-mode ${mode} m-0 p-0`}>
        <div className="container">
            <ToastContainer/>
            <CreateChat
                close={close}
                setClose={setClose}
                getChatList={getChatList}
                userData={userData}
            />
            <div className="card cardMain d-flex flex-row p-1  mt-4 mb-3 justify-content-between">
                <LeftPanel 
                    handleLogout={handleLogout}
                    setMode={setMode}
                    mode={mode}
                    userData={userData}
                    />
                <ChatList 
                    setClose={setClose}
                    chatList={chatList}
                    userData={userData}
                    setSelectChat={setSelectChat}
                    selectChat={selectChat}
                  />
                <div className="col-md-7 p-1 shadow">
                  {
                    selectChat && 
                    <ChatBody
                      setSelectChat={setSelectChat}
                      selectChat={selectChat}
                      userData={userData}
                      getChatList={getChatList}
                    />
                  }
                </div>
            </div>
        </div>
    </div>
  );
}

export default Chat;
