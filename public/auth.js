/* eslint-disable  */
var provider = new firebase.auth.GoogleAuthProvider();
const dataBox = document.querySelector('.content__token');
let bearerToken = null;

const authWithGoogle = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      user.getIdToken().then(token => {
        dataBox.innerHTML = token;
        localStorage.setItem('token', token);
      });
      document
        .querySelector('.loginButton')
        .removeEventListener('click', signOut);
      document
        .querySelector('.loginButton')
        .removeEventListener('click', authWithGoogle);
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      dataBox.innerHTML = `ERROR CODE ${errorCode}: ${errorMessage}. TRYING WITH EMAIL ${email} AND CREDENTIAL ${credential}`;
    });
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    user.getIdToken().then(token => {
      dataBox.innerHTML = token;
      bearerToken = token;
    });
    toastr.success(`Bienvenido estimado: ${user.displayName}`);
    document.querySelector('.loginButton').innerText = 'Log out';
    document
      .querySelector('.loginButton')
      .removeEventListener('click', authWithGoogle);
    document.querySelector('.loginButton').addEventListener('click', signOut);
  } else {
    document.querySelector('.loginButton').innerText = 'Login with Google';
    document
      .querySelector('.loginButton')
      .removeEventListener('click', signOut);
    document
      .querySelector('.loginButton')
      .addEventListener('click', authWithGoogle);
    dataBox.innerHTML = `NOT CONNECTED`;
  }
});

document.querySelector('.showToken').addEventListener('click', () => {
  if (dataBox.classList.contains('showDiv'))
    document.querySelector('.showToken').innerHTML = 'Show token';
  else document.querySelector('.showToken').innerHTML = 'Hide token';
  dataBox.classList.toggle('showDiv');
});

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      toastr.warning('Disconected from Google');
      bearerToken = null;
    })
    .catch(function(error) {
      toastr.error(error);
    });
};
