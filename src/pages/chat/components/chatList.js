import { useState } from "react";

function ChatList(props) {
    const {chatList, setClose, setSelectChat, selectChat} = props;
    const [searAct, setSearAct] = useState(false);
    const [chearch, setSearch] = useState("");
  return (
    <div className="col-md-4 p-1">
      <div
        className="d-flex flex-column px-1 shadow "
        style={{ height: "100%" }}
      >
        <button className="my-2 btn btn-primary" onClick={() => setClose(true)}>
          + Create new chat
        </button>
        <div className="d-flex flex-row justify-content-between">
          <h4 className="my-1 ms-1">Chats</h4>
          <button 
            className="btn btn-primary" 
            style={{ padding: "0 7px" }}
            onClick={()=>setSearAct(!searAct)}
            >
                {
                    (searAct)? <i className='bx bx-x fs-5'></i>:<i className="bx bx-search-alt fs-5"></i>
                }
          </button>
        </div>
        {
            searAct &&
                <div className="search m-1">
                <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    onChange={(e)=>setSearch(e.target.value)}
                />
                </div>
        }
        <div className="chat-list p-1">
          <ul className="list-group">
            {
                chatList.map((elem, index)=>{
                    if(searAct && elem.name.toLowerCase().indexOf(chearch.toLowerCase())===-1)
                        return <div className="d-none" key={index}></div>
                    return <li 
                            className={`list-group-item d-flex justify-content-between align-items-center ${(elem.id===selectChat?.id)? "bg-primary":""}`}
                            key={index}
                            onClick={()=>setSelectChat(elem)}
                        >
                        {elem.name}
                        <span className="d-none badge bg-primary rounded-pill"></span>
                    </li>
                })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
