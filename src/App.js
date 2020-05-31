import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props){
      super(props);
      this.state = {isLoginOpen: true, isRegisterOpen: false};
  }

  showLoginBox () {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox () {
    this.setState({isLoginOpen: false, isRegisterOpen: true});
  }

  render() {
      return(
          <div className="root-container">

              <div className="box-controller">
                  <div className={"controller " + (this.state.isLoginOpen ? "selected-controller" : "")} 
                  onClick={this.showLoginBox.bind(this)}>
                      Login
                  </div>
                  <div className={"controller " + (this.state.isRegisterOpen ? "selected-controller" : "")}
                  onClick={this.showRegisterBox.bind(this)}>
                      Register
                  </div>
              </div>

              <div className="box-container">
                {this.state.isLoginOpen && <LoginBox/>}
                {this.state.isRegisterOpen && <RegisterBox/>}
              </div>
              
          </div>
      );

  }
}

class LoginBox extends React.Component {
  constructor(props){
      super(props);
      this.state = {};
  }

  submitLogin(e) {}

  render() {
      return(
          <div className="inner-container">

              <div className="header">
                  Welcome!
              </div>

              <div className="box">

                  <div className="input-group">
                      <label htmlFor="username">Username</label>
                      <input type="text" name="username" className="login-input" placeholder="Enter your username"/>
                  </div>

                  <div className="input-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" className="login-input" placeholder="Enter your password"/>
                  </div>

                  <button type="button" className="login-btn" onClick={this.submitLogin.bind(this)}>Log In</button>

              </div>
          </div>
      );

  }
}

class RegisterBox extends React.Component {
  constructor(props){
      super(props);
      this.state = { fullname: "", email: "", username: "", password: "",  errors: [], pwdState: null };
  }

  // Add New Error Object to the array {elm: msg}
  showValidationErr(elm, msg) {
      this.setState((prevState) => ({errors: [...prevState.errors, {elm, msg}] }) );
  }

  // Remove a specific element from the array 
  clearValidationErr(elm) {
      this.setState((prevState) => {
      let newArr = [];
      // Add all elements from the prev array to the new one that has a different element
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    });
  }

  onFullnameChange(e) {
      this.setState({fullname: e.target.value});
      this.clearValidationErr("fullname");
  }

  onEmailChange(e) {
    this.setState({email: e.target.value});
    this.clearValidationErr("email");
  }

  onUsernameChange(e) {
    this.setState({username: e.target.value});
    this.clearValidationErr("username");
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
    this.clearValidationErr("password");

    this.setState({ pwdState: "weak" });
    if (e.target.value.length > 8) {
        this.setState({ pwdState: "medium" });
    } if (e.target.value.length > 12) {
        this.setState({ pwdState: "strong" });
    }

  }

  submitRegister(e) {
      if (this.state.fullname === "") {
          this.showValidationErr("fullname", "Full name cannot be empty.")
      } 
      if (this.state.email === "") {
          this.showValidationErr("email", "Email cannot be empty.")
      }
      if (this.state.username === "") {
          this.showValidationErr("username", "Username cannot be empty.")
      }
      if (this.state.password === "") {
          this.showValidationErr("password", "Password cannot be empty.")
      }
  }

  render() {
      let fullnameErr = null, emailErr = null, usernameErr = null, passwordErr = null;

      for(let err of this.state.errors) {
          if (err.elm === "fullname") {
              fullnameErr = err.msg;
          }
          if (err.elm === "email") {
            emailErr = err.msg;
          }
          if (err.elm === "username") {
            usernameErr = err.msg;
          }
          if (err.elm === "password") {
            passwordErr = err.msg;
         }
      }

      // states are by default false = (do not render)
      let pwdWeak = false, pwdMedium = false, pwdStrong = false;

      // weak password set only the pwdWeak to true, cause render only the first bar 
      if (this.state.pwdState === "weak") {
        pwdWeak = true;
      } else if (this.state.pwdState === "medium") {
        // medium pwd then render the weak and medium bars 
        pwdWeak = true;
        pwdMedium = true;
      } else if (this.state.pwdState === "strong") {
        // strong, render all the previous bars 
        pwdWeak = true;
        pwdMedium = true;
        pwdStrong = true;
      }


      return(
          <div className="inner-container">

              <div className="header">
                  Register A New Account
              </div>
              
              <div className="box">

                  <div className="input-group">
                      <label htmlFor="fullname">Full Name</label>
                      <input type="text" name="fullname" className="login-input" placeholder="Full name"
                      onChange={this.onFullnameChange.bind(this)} />
                      <small className="danger-error">{fullnameErr ? fullnameErr: ""}</small>
                  </div>

                  <div className="input-group">
                      <label htmlFor="email">Email</label>
                      <input type="text" name="email" className="login-input" placeholder="Email"
                      onChange={this.onEmailChange.bind(this)} />
                      <small className="danger-error">{emailErr ? emailErr: ""}</small>                      
                  </div>

                  <div className="input-group">
                      <label htmlFor="username">Username</label>
                      <input type="text" name="username" className="login-input" placeholder="Username"
                      onChange={this.onUsernameChange.bind(this)} />
                      <small className="danger-error">{usernameErr ? usernameErr: ""}</small>
                  </div>

                  <div className="input-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" className="login-input" placeholder="Password"
                      onChange={this.onPasswordChange.bind(this)} />
                      <small className="danger-error">{passwordErr ? passwordErr: ""}</small>

                      {this.state.password && <div className="password-state">
                          <div className={"pwd pwd-weak " + ( pwdWeak ? "show" : "" )}></div>
                          <div className={"pwd pwd-medium " + ( pwdMedium ? "show" : "" )}></div>
                          <div className={"pwd pwd-strong " + ( pwdStrong ? "show" : "" )}></div>
                      </div>}

                  </div>

                  <button type="button" className="login-btn" onClick={this.submitRegister.bind(this)}>Register</button>

              </div>
          </div>
      );

  }
}

export default App;
