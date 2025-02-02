import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import SignUp from "./pages/SignUp/index";
import SignIn from "./pages/SignIn/index";
import Home from "./pages/Home/index"
import CreatePost from "./pages/CreatePost/index"
import UserContext, { UserProvider } from "./contexts/UserContext";
import {ThemeProvider} from '@mui/material/styles'
import Theme from "./components/Theme";

export default function App() {
  return (
    <>

      <UserProvider>
          <ToastContainer />
           <Router>
            <Switch>
              <Route path="/sign-up" exact>
                <SignUp />
              </Route>
              <Route path="/sign-in" exact>
                <SignIn />
              </Route>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/create-post" exact>
                <CreatePost />
              </Route>
            </Switch>
          </Router>
      </UserProvider>

    </>
  );
}
