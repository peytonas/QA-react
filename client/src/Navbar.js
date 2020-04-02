import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from './Auth';
import './Nav.css';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  return (
    <nav className="navbar bg-primary fixed-top">
      <Link className="navbar-brand text-dark" to="/">
        Q&A
      </Link>
      {
        !auth0Client.isAuthenticated() &&
        <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <Link className="navbar-brand text-dark" to="/profile">
            <label className="mr-2">{auth0Client.getProfile().nickname}</label>
          </Link>
          <button className="btn btn-danger" onClick={() => { signOut() }}>Sign Out</button>
        </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);