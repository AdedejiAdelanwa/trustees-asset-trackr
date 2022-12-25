import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { useRouter } from "next/router";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let userToken;
  const token = JSON.parse(localStorage.getItem("userToken"));
  if (token) {
    userToken = jwt_decode(token);
  }

  useEffect(() => {
    if (userToken) {
      if (Date.now() >= userToken.exp * 1000) {
        dispatch(logout());
      }
    }
    //router.push("/login");
  }, [dispatch, router, token, userToken]);

  return userToken && children;
};

export default AuthWrapper;
