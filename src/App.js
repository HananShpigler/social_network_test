import React, { useState } from "react";
import Login from "./components/login";
import Post from "./components/Post";
import $ from "jquery";

const App = () => {
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [urlSave] = useState("api/saveData");
  const [urlGet] = useState("api/getData");
  const [urlGetFollowers] = useState("api/getFollower");
  const [urlGetPosts] = useState("api/getPost");
  const [urlNewPost] = useState("api/UpdatePost");
  const [userTitle, setUserTitle] = useState("Unknown");
  const [userPost, setUserPost] = useState("Unknown");
 
  const handleLogin = () => {
    $.ajax({
      url: urlGet,
      dataType: 'json',  
      type: 'POST',  
      data: {  
       'username': email, 
       'password': password      
    },  
      success: function(data) {
        if (data.data === "Ok"){
          setUser(true); 
          $.ajax({
            url: urlGetFollowers,
            dataType: 'json',  
            type: 'POST',  
            data: {  
             'username': email,    
            },  
            success: function(data) {
              setUserTitle(data.data);
              $.ajax({
                url: urlGetPosts,
                dataType: 'json',  
                type: 'POST',  
                data: {  
                 'username': data.data,
              },  
                success: function(data) {
                  setUserPost(data.data);
                }
              });  
            }
          });
        } else { 
          alert(data.data);
        }
      }
    });  
  };
  const handNewPost = () => {
    var content = $.trim($("textarea").val());
    $.ajax({
      url: urlNewPost,
      dataType: 'json',  
      type: 'POST',  
      data: {  
       'username': email,
       'post': content
    },  
      success: function(data) {
        alert(data.data);
      }
    });
  };
  const handleLogout = () => {
    setUser(false);
  };
  const handleSignup = () => {
     $.ajax({  
       url: urlSave,
       dataType: 'json',  
       type: 'POST',  
       data: {  
        'username': email, 
        'password': password      
     },  
       success: function(data) {         
           alert(data.data);
       }
     });   
  };
  const clearInputs = () => {};
  const clearErrors = () => {};

  return (
    <div>
      {user ? (
        <div>
        <div>
        <textarea placeholder="Write a new post" rows="5" cols="30"></textarea>
        </div>
        <button onClick={handNewPost} type="submit" name="button">Publish</button>
        <h1>The posts of the people I follow</h1>
        <Post title={userTitle} post={userPost}/>
        <button Style="width:100px;"
                onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          clearErrors={clearErrors}
        />
      )}
    </div>
  );
};

export default App;
