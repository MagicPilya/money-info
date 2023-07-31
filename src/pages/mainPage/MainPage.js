import { useEffect, useState } from "react";
import { signAccountOut } from "../../firebase/auth";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { useDispatch } from "react-redux";
import { getUser } from "../../firebase/database";
import { connect } from "react-redux";
import { Skeleton } from "@mui/material";

function MainPage(props) {
  const store = props.store;
  const  [loading = true, setLoading] = useState();
  useProtectedRoute();
  const dispatch = useDispatch();
  useEffect(() => {
    getUser(localStorage.getItem("user")).then(async (answer) => {
      await dispatch({ type: "SET_CURRENT_USER", payload: answer });
      await setLoading(false) 
    }, [loading]);

  }, []);
  if (loading) {
    return (
      <>
        <Skeleton
          variant="rectangular"
          width={210}
          height={60}
        />
      </>
    );
  } else if (!loading) {
    return (
      <div>
        <div>{store.currentUser.user.name}</div>
        <button onClick={() => signAccountOut()}>Logout</button>
      </div>
    );
  }
}

export default connect((state) => ({ store: state }))(MainPage);
