import React, { useEffect, useState } from "react";
import Pokemones from "./components/Pokemones";
import { auth } from "./firebase";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Perfil from "./components/Perfil";

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged((user) => {
        if (user) setFirebaseUser(user);
        else setFirebaseUser(null);
      });
    };

    fetchUser();
  }, []);

  const RutaPrivada = ({ component, path, ...rest }) => {
    if (localStorage.getItem("usuario")) {
      const usuarioStorage = JSON.parse(localStorage.getItem("usuario"));

      if (usuarioStorage.uid === firebaseUser.uid) {
        return <Route component={component} path={path} {...rest} />;
      } else {
        return <Redirect to='/login' {...rest} />;
      }
    } else {
      return <Redirect to='/login' {...rest} />;
    }
  };

  return firebaseUser !== false ? (
    <>
      <Router>
        <Navbar />

        <Switch>
          <RutaPrivada component={Pokemones} exact path='/' />
          <RutaPrivada component={Perfil} exact path='/perfil' />
          <Route component={Login} exact path='/login' />
        </Switch>
      </Router>
    </>
  ) : (
    <div>Cargando...</div>
  );
}

export default App;
