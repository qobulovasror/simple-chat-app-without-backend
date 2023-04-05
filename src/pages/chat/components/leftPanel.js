function LeftPanel(props) {
    const {handleLogout, setMode, mode, userData} = props;
    const setModeHand = ()=>{
        if(mode==='light')
            setMode('dark')
        else
            setMode('light')
    } 
  return (
    <div className="card bg-primary text-light d-flex align-content-between p-2">
      <div className="col">
        <div className="profil text-light bg-info rounded-circle p-2">{userData?.email?.slice(0,2).toUpperCase()}</div>
      </div>
      <div className="col-1 d-flex flex-column" style={{ width: "100%" }}>
        <button className="btn btn-primary d-none">
          <i className="bx bxs-cog"></i>
        </button>
        <button 
            className="btn btn-primary"
            onClick={setModeHand}
            >
            {
                (mode!=='light')? <i className="bx bxs-moon"></i>:
                    <i className="bx bxs-sun"></i>
            }
        </button>
        <button className="btn btn-primary" onClick={handleLogout}>
          <i className="bx bxs-log-out"></i>
        </button>
      </div>
    </div>
  );
}

export default LeftPanel;
