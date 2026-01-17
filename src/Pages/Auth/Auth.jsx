import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import classes from "./Auth.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

// ✅ ClipLoader from react-spinners
import ClipLoader from "react-spinners/ClipLoader";

function Auth() {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Separate loading states
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [error, setError] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, signIn: true });
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch({
        type: Type.SET_USER,
        user: userCredential.user,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ ...loading, signIn: false });
    }
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, signUp: true });
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch({
        type: Type.SET_USER,
        user: userCredential.user,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ ...loading, signUp: false });
    }
  };

  return (
    <div className={classes.auth}>
      <div className={classes.logoContainer}>
        <img
          className={classes.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/2560px-Amazon_2024.svg.png"
          alt="Amazon Logo"
          onClick={() => navigate("/")}
        />
      </div>

      <div className={classes.container}>
        <h1>Sign In</h1>

        {/* ✅ Error Message (top) */}
        {error && <p className={classes.error}>{error}</p>}

        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            autoComplete="email"
            disabled={loading.signIn || loading.signUp}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            disabled={loading.signIn || loading.signUp}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ✅ Black, small ClipLoader directly above Sign In button */}
          {loading.signIn && (
            <div className={classes.spinnerWrapper}>
              <ClipLoader color="#000000" size={22} />
            </div>
          )}

          <button
            type="submit"
            onClick={signIn}
            className={classes.signInButton}
            disabled={loading.signIn || loading.signUp}
          >
            {loading.signIn ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p>
          By continuing, you agree to Amazon's Clone Conditions of Use & Privacy
          Notice.
        </p>

        <button
          onClick={register}
          className={classes.registerButton}
          disabled={loading.signIn || loading.signUp}
        >
          {loading.signUp
            ? "Creating Account..."
            : "Create your Amazon Account"}
        </button>

        {/* ✅ Bottom error message */}
        {error && (
          <small style={{ paddingTop: "5px", color: "red", display: "block" }}>
            {error}
          </small>
        )}
      </div>
    </div>
  );
}

export default Auth;
