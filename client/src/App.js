import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UnprivateRoute from "./hocs/UnprivateRoute";
import GuestOnly from "./hocs/GuestOnly";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Spinner } from "react-bootstrap";
import {
  getUserSelector,
  getUserWordsSelector,
} from "./redux/selectors/authSelectors";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { connect } from "react-redux";
import SingleWord from "./pages/SingleWord";
import PrivateRoute from "./hocs/PrivateRoute";
import Exercises from "./pages/Exercises";
import Spelling from './pages/exersices/Spelling'
import Footer from "./components/Footer";

// const App = ({ user, isAuthenticated, getUser, getWords }) => {
//   useEffect(() => {
//     getUser();
//     getWords();
//   }, []);
// if (user !== undefined || user === null) {
//   return (
//     <>
//       <Router>
//         <Navbar user={user} isAuthenticated={isAuthenticated} />

//         <Switch>
//           <UnprivateRoute path="/" exact user={user} component={Home} />
//           <Route path="/register" component={GuestOnly(Register)} />
//           <Route path="/login" component={GuestOnly(Login)} />
//         </Switch>
//       </Router>
//     </>
//   );
// } else {
//   // Initial loading screen
//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <Spinner
//         style={{ position: "absolute", top: "50%", left: "50%" }}
//         animation="grow"
//       />
//     </div>
//   );
// }
// };
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUser();
    this.props.getWords();
  }
  render() {
    if (this.props.loading !== true) {
      return (
        <>
          <Router>
            <Navbar
              user={this.props.user}
              isAuthenticated={this.props.isAuthenticated}
            />

            <Switch>
              <UnprivateRoute
                path="/"
                exact
                user={this.props.user}
                component={Home}
              />
              <PrivateRoute
                isAuth={this.props.isAuthenticated}
                component={Exercises}
                path="/exercises"
              />
              <UnprivateRoute path="/spelling" component={Spelling}/>
              <Route path="/word/:name/" exact component={SingleWord} />
              <Route path="/register" component={GuestOnly(Register)} />
              <Route path="/login" component={GuestOnly(Login)} />
              
            </Switch>
           
          </Router>
          <Footer/>
        </>
      );
    } else {
      // Initial loading screen
      return (
        <div style={{ height: "100vh", width: "100%" }}>
          <Spinner
            style={{ position: "absolute", top: "50%", left: "50%" }}
            animation="grow"
          />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: getUserSelector(state),
    isAuthenticated: state.userData.isAuthenticated,
    wordList: state.learningList.words,
    loading: state.userData.loading
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch({ type: "GET_CURRENT_USER" }),
    getWords: () => dispatch({ type: "GET_WORDS" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
