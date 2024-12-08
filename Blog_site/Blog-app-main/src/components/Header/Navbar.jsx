import { useState, useEffect } from "react";
import AuthenticatedNav from "./authenticatedNav";
import NonAuthenticatedNav from "./NonAuthenticatedNav";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../slices/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return isAuthenticated ? <AuthenticatedNav /> : <NonAuthenticatedNav />;
}

export default Navbar;
