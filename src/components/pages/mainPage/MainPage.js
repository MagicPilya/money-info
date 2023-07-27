import React from "react";
import { signAccountOut } from "../../../firebase/auth";
import { useNavigate } from "react-router";

import useProtectedRoute from "../../../hooks/useProtectedRoute";

export default function MainPage() {
  let navigate = useNavigate();

  useProtectedRoute();
      return(
      <div>
        MainPage
        <button onClick={() =>  signAccountOut()}>Logout</button>
      </div>
      )
  };
