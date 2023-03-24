import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../layouts/frontend/Footer";
import Navbar from "../../layouts/frontend/Navbar";
import { TopNav } from "../../layouts/frontend/TopNav";
import { BottomFix } from "./BottomFix";

export const Logout = (props) => {
  const [register, setRegister] = useState(false);
  const nav  = useNavigate();
  useEffect (()=>{
    localStorage.removeItem('user-token')
    nav("/login")
  },[])

  return (
    <></>
  )
};
