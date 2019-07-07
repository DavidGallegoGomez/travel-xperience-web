import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className="box mx-auto">
      <div className="row">
        <div className="col-6">
          <h3>IronProfile</h3>
          <p className="lead mb-5">Today we will create an app with authorization, adding some cool styles!</p>
          <Link className="btn btn-green mb-3" to="/profile">Sign up</Link>
          <Link className="btn btn-green" to="/login">Login</Link>
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  );
}