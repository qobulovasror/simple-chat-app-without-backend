import { useEffect, useState } from "react";
import ChatHeader from "./chatHeader";
import Chatmsgs from "./chatmsgs";
import {db} from '../../../../firebase/firebase';
import { toast } from "react-toastify";
// import { collection, getDocs } from "firebase/firestore";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import SendMsgs from "./sendMsgs";

function ChatBody(props) {
  const {selectChat, setSelectChat, userData, getChatList} = props;
  const [call, setCall] = useState(false)
  const [msgs, setMsgs] = useState([])
  const getChatMessages = async(selectChat)=>{
    const q = query(collection(db, "messages"), where("chatId", "==", selectChat.id), orderBy("createDate", "desc"));
    await getDocs(q).then((querySnapshot)=>{
      setMsgs(querySnapshot.docs)
    })
    .catch((err)=>{
      setCall(true)
      toast.error(err)
    })
  }
  useEffect(()=>{
    if(!selectChat) return;
    if(!call) return;
    const interval = setInterval(() => {
      getChatMessages(selectChat)
    }, 5000);
    
    return () => clearInterval(interval);
  }, [call, selectChat])

  return (
    <div className="position-relative ">
      <ChatHeader
        selectChat={selectChat}
        msgs={msgs}
        userData={userData}
        getChatList={getChatList}
        setSelectChat={setSelectChat}
      />
      <Chatmsgs
        userData={userData}
        msgs={msgs}
        getChatMessages={getChatMessages}
        selectChat={selectChat}
      />
      <SendMsgs
        selectChat={selectChat}
        userData={userData}
        getChatMessages={getChatMessages}
      />
    </div>
  );
}

export default ChatBody;
