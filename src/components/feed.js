/* import { signOut } from 'firebase/auth'; */
import {
  post, auth, logOut, read, addPost, listenToPosts
} from '../lib/firebase';

const root = document.getElementById('root');
export const feed = () => {
  const feedDiv = document.createElement('div');
  feedDiv.classList.add('feed-container');
  feedDiv.innerHTML += `
    <header id='head-feed'>
      <img src="./img/logo.png" id="logo">
      <img src="./img/salir.png" id="salir">
    </header>
    <section class='timeline'>
      <section class='create-post-container'>
        <section class='create-post'>
          <h2>tu</h2>
          <textarea id='status-description' placeholder=' ¿Que hizo tu animal de compañía hoy?' maxlength='300'></textarea>
        </section>
      </section>
    </section>
    <div class='post-button-container'>
      <button class='post'>Publicar</button>
    </div>
    <section id='posts-container'>  

    </section>
      
    `;
  root.appendChild(feedDiv);

  /*   Botón para salir */
  const logOutButton = document.getElementById('salir');
  logOutButton.addEventListener('click', () => {
    logOut(auth).then(() => {
      window.location.href = '/';
      console.log('the user is signed out');
    });
  });

  /*  Crear post */
  const postButton = feedDiv.querySelector('.post');

  postButton.addEventListener('click', async () => {
    const statusDescription = feedDiv.querySelector('#status-description');
    const postText = statusDescription.value;
    const validatePost = document.getElementById('status-description').value;
    if (validatePost === '') {
      alert('Ingrese post');
      return false;
    }
    await post(postText);
  });


  const postsContainer = document.getElementById('posts-container');

  addPost((posts) => {
    posts.forEach((feedPosts) => {
      const postElement = document.createElement('div');
      postElement.classList.add('eachPost');

      const userNameElement = document.createElement('p1');
      userNameElement.textContent = feedPosts.userName;
      postElement.appendChild(userNameElement);
      userNameElement.innerHTML += `<br>`;

      const textElement = document.createElement('p3');
      textElement.textContent = feedPosts.text;
      textElement.innerHTML += `
      <header id='head-feed'>
      <img src="./img/like.png" id="like">
      </header>`;
      postElement.appendChild(textElement);
      postsContainer.appendChild(postElement);
    });
    const logOutLike = document.getElementById('like');
      logOutLike.addEventListener('click', () => {
        console.log('like');
    });
  });
  return feedDiv;
};

