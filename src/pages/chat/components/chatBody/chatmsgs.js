import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";

import { toast } from "react-toastify";
function Chatmsgs(props) {
  const  {msgs, userData, getChatMessages, selectChat} = props;
  const deleteMsg = async(elem)=>{
    console.log(elem);
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Delete "${elem.msg.stringValue}" item ?`)) {
      await deleteDoc(doc(db, "messages", elem.id))
        .then((res) => {
          toast.success("delete success !")
          getChatMessages(selectChat);
        })
        .catch((err) => toast.error(err));
    }
  }
  const editMsg = async(elem)=>{
    const msgvalue = prompt("Edit selected message", elem.msg.stringValue)
    try{
      await updateDoc(doc(db, 'messages', elem.id), {
        msg: msgvalue.trim()
      }).then(()=>{
        toast.success("Edit success 😄");
        getChatMessages(selectChat);
      })
    } catch (err) {
      toast.error(err + " 🙁");
    } 
  }
  return (
    <div className="chat-msgs position-relative">
      {
        msgs.map((elem, index)=>{
          elem = {...elem._document.data.value.mapValue.fields, id: elem.id}
          return <div 
            key={index}
            className={`msg ${(elem.ovner.stringValue===userData.email)? "right flex-row-revers": "left"} d-flex align-items-end`}>
            <div className="img me-2 text-light bg-primary rounded-circle p-2">
              {elem.ovner.stringValue.slice(0, 1).toUpperCase()}
            </div>
            <div className="msg-txt p-2">
              <div className="userinfo d-flex justify-content-between p-0 m-0">
                <span className="userName m-0">{elem.ovner.stringValue.slice(0,-10)}</span>
                <div className="d-flex flex-row">
                  <span className="date">{elem.createDate.timestampValue.slice(0,10) +" "+ elem.createDate.timestampValue.slice(11, 19)}</span>
                  {
                    (elem.ovner.stringValue===userData.email)? 
                      <span className="d-flex flex-row">
                        <i className='bx bx-message-edit mx-1' onClick={()=>editMsg(elem)}></i>
                        <i className='bx bxs-eraser' onClick={()=>deleteMsg(elem)}></i>
                      </span>:
                      <></>
                  }
                </div>
              </div>
              {elem.msg.stringValue}
            </div>
          </div>
        })
      }
    </div>
  );
}

export default Chatmsgs;
