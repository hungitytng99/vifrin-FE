import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function Register(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "REGISTER",
      payload: {
        user: "Manh Hung",
      },
    });
  }, [dispatch]);
  return <div>Register</div>;
}

export default Register;
