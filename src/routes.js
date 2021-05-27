// Note: Routes component...!

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
}
  from "react-router-dom";
// import Cookies from "js-cookie";
import { useSelector } from 'react-redux';

// Note: Importing reuseabale components...!
import SignUp from "./components/auth components/signup";
import LogIn from "./components/auth components/login";
import Home from "./components/other components/home";
import NotFound from "./components/other components/not-found";

const AppRoutes = () => {

  // Note: One way for maintain user session using cookies...!
  // const getUser = Cookies.get('user');
  // console.log(getUser);

  // Note: One way for maintain user session using cookies redux...!
  let getUser = useSelector(({ users }) => { return users.authenticatedUser });
  console.log(getUser);

  return (
    <React.Fragment>
      <Router>
        <Routes>
          {
            (getUser)
              ?
              (<Route path="/" element={<Home />} />)
              :
              (<Route path="/" element={<LogIn />} />)
          }
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default AppRoutes;