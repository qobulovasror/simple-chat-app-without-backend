/* eslint-disable no-unused-vars */
import {db} from '../../../firebase/firebase'
import {toast} from 'react-toastify';
import {useState} from 'react';
import { collection, addDoc } from "firebase/firestore";

function CreateChat(props) {
    const {close, setClose, userData, getChatList } = props;
    const [name, setName] = useState();
    const addChat = async()=>{
      try {
        const docRef = await addDoc(collection(db, "chats"), {
          name: name.trim(),
          createDate: new Date(),
          ownerId: userData.email
        });
        getChatList()
        toast.success("Chat success added")
      } catch (err) {
        toast.error(err+' 🙁')
      }
      setClose(false)
    }
    if(!close) return <></>
  return (
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add chat group</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={()=>setClose(false)}
            ></button>
          </div>
          <div className="modal-body">
            <input  
              type="text" 
              placeholder="Name..." 
              className="form-control" 
              onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="modal-footer">
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={addChat}
                >Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateChat;
