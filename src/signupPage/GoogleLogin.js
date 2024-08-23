import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";

function GoogleLoginButton() {
  const [user, setUser] = useState({});

  const handleCallBackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var UserObject = jwtDecode(response.credential);
    console.log(UserObject);
    setUser(UserObject);
    document.getElementById("signInDiv").hidden = true;
  };
  const handleSignOut = (event) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  useEffect(() => {
    if (typeof window.google === "undefined") {
      console.error("Google API not loaded");
      return;
    }

    window.google.accounts.id.initialize({
      client_id:
        "276125587367-jvgnogo2b649iee0s61ni3tnr8fp1l1f.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });
    console.log("Rendering Google Sign-In Button");
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
        customButtonRender: () => {
          const button = document.createElement("button");
          button.innerText = "Sign In with Google";
          button.onclick = window.google.accounts.id.prompt;
          const icon = document.createElement("i");
          icon.classList.add("material-icons");
          // icon.classList.add("fa", "fa-google");
          const text = document.createElement("span");
          text.innerText = "Sign In with Google";
          const container = document.createElement("div");
          container.appendChild(icon);
          container.appendChild(text);
          button.appendChild(container);
          return button;
        },
      }
    );
  }, []);
  //if we have no user sign in button
  //if we have user the sign out button

  return (
    <div>
      <div id="signInDiv"></div>

      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}

      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
    </div>
  );
}

export default GoogleLoginButton;
