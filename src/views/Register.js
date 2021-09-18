import React from "react";
import styled from "styled-components";
import logo from "assets/img/react-logo.png";
import { useAuth } from "../services/hooks";
import { publicRoutes } from "routes";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";

const Register = () => {
  let { handleChange, handleRegister, form, authloading, value, setValue } =
    useAuth();
  return (
    <Register.Wrapper className="p-2">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <a href="/">
              <img src={logo} className="mt-4" width={100} alt="logo" />
            </a>
          </div>

          <h2 className="active"> Register </h2>
          <Link to={publicRoutes.LOGIN} className="text-info">
            Sign In
          </Link>

          <form onSubmit={(e) => handleRegister(e)}>
            <input
              type="text"
              className="fadeIn second"
              value={form.name}
              onChange={(e) => handleChange(e)}
              name="name"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              className="fadeIn second"
              value={form.lname}
              onChange={(e) => handleChange(e)}
              name="lname"
              placeholder="Last Name"
              required
            />
            <input
              type="email"
              className="fadeIn third"
              value={form.email}
              onChange={(e) => handleChange(e)}
              name="email"
              required
              placeholder="Email"
            />
            <div className="phone-container">
              <PhoneInput
                placeholder="Enter phone number"
                value={value}
                defaultCountry="NG"
                onChange={setValue}
              />
            </div>
            <input
              type="password"
              className="fadeIn third"
              value={form.password}
              onChange={(e) => handleChange(e)}
              name="password"
              required
              placeholder="Enter password"
            />

            <input
              type="password"
              className="fadeIn third"
              value={form.password2}
              onChange={(e) => handleChange(e)}
              name="password2"
              required
              placeholder="Confirm password"
            />
            <input
              type="submit"
              className="fadeIn fourth"
              value={authloading ? "Loading..." : "Register"}
            />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href={publicRoutes.FORGOT_PASSWORD}>
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </Register.Wrapper>
  );
};

Register.Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;

  a {
    color: #92badd;
    display: inline-block;
    text-decoration: none;
    font-weight: 400;
  }

  h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    display: inline-block;
    margin: 40px 8px 10px 8px;
    color: #cccccc;
  }

  /* STRUCTURE */

  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 20px;
  }

  #formContent {
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background: #fff;
    padding: 30px;
    width: 100%;
    max-width: 450px;
    position: relative;
    padding: 0px;
    -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  #formFooter {
    background-color: #f6f6f6;
    border-top: 1px solid #dce8f1;
    padding: 25px;
    text-align: center;
    -webkit-border-radius: 0 0 10px 10px;
    border-radius: 0 0 10px 10px;
  }

  /* TABS */

  h2.inactive {
    color: #cccccc;
  }

  h2.active {
    color: #0d0d0d;
    border-bottom: 2px solid #5fbae9;
  }

  /* FORM TYPOGRAPHY*/

  input[type="button"],
  input[type="submit"],
  input[type="reset"] {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  input[type="button"]:hover,
  input[type="submit"]:hover,
  input[type="reset"]:hover {
    background-color: #39ace7;
  }

  input[type="button"]:active,
  input[type="submit"]:active,
  input[type="reset"]:active {
    -moz-transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -o-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
  }

  input[type="email"],
  input[type="password"],
  input[type="text"],
  input[type="tel"] {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 10px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    width: 85%;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
  }

  .PhoneInput {
    width: 80%;
    margin-left: 50px;
  }

  input[type="email"]:focus,
  input[type="password"]:focus {
    background-color: #fff;
    border-bottom: 2px solid #5fbae9;
  }

  input[type="email"]:placeholder,
  input[type="password"]:placeholder {
    color: #cccccc;
  }

  /* ANIMATIONS */

  /* Simple CSS3 Fade-in-down Animation */
  .fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @-webkit-keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  /* Simple CSS3 Fade-in Animation */
  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fadeIn {
    opacity: 0;
    -webkit-animation: fadeIn ease-in 1;
    -moz-animation: fadeIn ease-in 1;
    animation: fadeIn ease-in 1;

    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    animation-fill-mode: forwards;

    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    animation-duration: 1s;
  }

  .fadeIn.first {
    -webkit-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  .fadeIn.second {
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }

  .fadeIn.third {
    -webkit-animation-delay: 0.8s;
    -moz-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }

  .fadeIn.fourth {
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    animation-delay: 1s;
  }

  /* Simple CSS3 Fade-in Animation */
  .underlineHover:after {
    display: block;
    left: 0;
    bottom: -10px;
    width: 0;
    height: 2px;
    background-color: #56baed;
    content: "";
    transition: width 0.2s;
  }

  .underlineHover:hover {
    color: #0d0d0d;
  }

  .underlineHover:hover:after {
    width: 100%;
  }

  /* OTHERS */

  *:focus {
    outline: none;
  }

  #icon {
    width: 60%;
  }

  * {
    box-sizing: border-box;
  }
`;

export default Register;
