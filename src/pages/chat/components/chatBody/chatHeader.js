import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { toast } from "react-toastify";

function ChatHeader(props) {
  const {selectChat, setSelectChat, msgs,userData, getChatList, getChatMessages} = props;
  const deleteChat = async(id)=>{
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Delete is "${selectChat.name}" chat ?`)) {
      // Create a query to filter the documents with the value to delete
      const query = db.collection('messages').where('chatId', '==', id);
      query.get().then((querySnapshot) => {
        // Create a batch operation to delete the documents
        const batch = db.batch();
        // Loop through the documents and add a delete operation to the batch for each document
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        // Commit the batch operation to delete the documents
        return batch.commit();
      }).then(async() => {
          await deleteDoc(doc(db, "chats", id))
          .then((res) => {
            toast.success("delete success !")
            setSelectChat({id: -1})
            getChatList()
          })
          .catch((err) => toast.error(err));
      }).catch((error) => {
        console.error('Error deleting documents: ', error);
      });
      
    }

  }
  return (
    <div className="position-static shadow p-1 d-flex flex-row justify-content-between">
      <div className="d-flex flex-row">
        <div className="chat-img me-2 text-light bg-primary rounded-circle p-2">
          {selectChat.name.slice(0,3).toUpperCase()}
        </div>
        <div className="d-flex flex-column">
          <div className="fs-6 bold">{selectChat.name}</div>
          <span className="text-info">{msgs.length} messages</span>
        </div>
      </div>
      <div className="d-flex flex-row py-1">
        <button className="btn btn-primary me-1 p-2" disabled={true}>
          <i className="bx bx-search-alt fs-5"></i>
        </button>
        <button 
          className="btn btn-primary me-1" 
          disabled={userData?.email!==selectChat?.ownerId}
          onClick={()=>{
            if(userData?.email===selectChat?.ownerId){
              deleteChat(selectChat.id)
            }
          }}
          >
          <i className="bx bxs-message-alt-x"></i>
        </button>
        <button className="btn btn-primary" onClick={getChatMessages}>
          <i className='bx bx-refresh fs-5'></i>
        </button>
        <button className="btn btn-primary ms-1">
          <i className="bx bx-dots-vertical-rounded"></i>
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
