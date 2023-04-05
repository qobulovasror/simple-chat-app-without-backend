import {db} from '../../../../firebase/firebase';
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import { useState } from 'react';

function SendMsgs(props) {
  const {selectChat, userData} = props;
  const [msg, setMsg] = useState("")
  const addChat = async(msgvalue)=>{
    setMsg("")
    if(!msg) return;
    try {
      await addDoc(collection(db, "messages"), {
        chatId: selectChat.id,
        msg: msgvalue.trim(),
        createDate: new Date(),
        ovner: userData.email
      }).then(()=>{
      })
    } catch (err) {
      toast.error(err+' 🙁')
    }
  }
  const changeHandler = (e)=>{
    setMsg(e.target.value);
  }
  return (
    <div className="position-static shadow p-1 d-flex flex-row justify-content-between fixed-bottom">
      <input 
        type="text" 
        placeholder="Message..." 
        className="form-control" 
        onChange={changeHandler}  
        onKeyDown={(e)=>{ if(e.key==="Enter") addChat(msg)}}
        value={msg}
      />
      <button 
        className="btn btn-primary ms-1"
        onClick={()=>addChat(msg)} 
      >
        <i className="bx bxs-send"></i>
      </button>
    </div>
  );
}

export default SendMsgs;
