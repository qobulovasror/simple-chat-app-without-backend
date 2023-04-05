import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import {auth} from '../../firebase/firebase';
import {useNavigate} from 'react-router-dom';
import { filterEmail } from "../../config/filterInput";

function Regis({setUserAuth}) {
const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    rePass: "",
  });
  const inputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const formSubmit = async(e) => {
    e.preventDefault();
    if (!userData.email || userData.email.length < 4 || !filterEmail.test(userData.email))
      return toast.error("Email is invalid");
    if (!userData.password || userData.password.length < 6)
      return toast.error("Password is invalid");
    if (!userData.password || userData.password !== userData.rePass)
      return toast.error("Password and Conforim password not equil");

    await createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserAuth(user.uid);
        window.localStorage.setItem("userAuthTokin", user.uid);
        navigate("/chat")
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  return (
    <div className="container">
      <ToastContainer />
      <div className="row">
        <div className="col-4 col-md-3"></div>
        <div className="col-4 col-md-6 align-items-center mt-5">
          <div className="card ">
            <div className="card-header">
              <h3 className="text-center">Registration</h3>
            </div>
            <div className="card-body">
              <form onSubmit={formSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter your email"
                    onChange={inputHandler}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter your password"
                    onChange={inputHandler}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="repass" className="form-label">
                    Conforim password
                  </label>
                  <input
                    type="password"
                    name="rePass"
                    className="form-control"
                    id="repass"
                    placeholder="Enter your password"
                    onChange={inputHandler}
                  />
                </div>
                <div className="mb-3">
                    <span>I have an accaunt, visit <Link to={'/'}>Login</Link> page.</span>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-4 col-md-3"></div>
      </div>
    </div>
  );
}

export default Regis;
