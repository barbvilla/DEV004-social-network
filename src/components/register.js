import { createUser } from '../lib/firebase';

const root = document.getElementById('root');
export const register = () => {
  const registerDiv = document.createElement('div');
  registerDiv.classList.add('log');
  registerDiv.innerHTML += `<header>
  <img src="./img/logo.png" id="logo"></header><section class="register-container">
  </header>
  <section class="register-container">
    <h1>Tú</h1>
    <input type="text"
    id="register-name"
    name=""
    placeholder="Ingrese su nombre" />
        <input type="email"
          id="register-email"
          name=""
          placeholder="Ingrese su email" required=""/>
        <input type="password"
          id="register-password"
          placeholder="Ingrese una contraseña"/>
          <input type="password"
          id="register-password2"
          placeholder="Repita su contraseña"/>
          <h1>Tu mascota</h1>
          <input type="text"
          id="pet-name"
          name=""
          placeholder="Nombre de mascota" />
          <input type="text"
          id="specie-name"
          name=""
          placeholder="Especie" />
        <button type="submit" id="create-account">Registrarse</button>
        <button type="submit" id="back-button">Volver a incio</button>
        </section>`;
  root.appendChild(registerDiv);

  document.querySelector('#create-account').addEventListener('click', () => {
    const signUpName = document.getElementById('register-name').value;
    const signUpEmail = document.getElementById('register-email').value;
    const signUpPassword = document.getElementById('register-password').value;
    const signUpRepeatPssword = document.getElementById('register-password2').value;
    const signUpPetName = document.getElementById('pet-name').value;
    const signUpSpecieName = document.getElementById('specie-name').value;

    const capitalLeters = signUpPassword.match(/[A-Z]/g);
    const lowercase = signUpPassword.match(/[a-z]/g); 
    const numbers = signUpPassword.match(/[0-9]/g); 
    const characters = signUpPassword.match(/[\W]/g);
    const validateEmail =signUpEmail.match(/[\W]/g);
    console.log(capitalLeters,lowercase,numbers,characters,signUpPassword,signUpRepeatPssword)

    //Nombre
    if(signUpName === ''){
      alert("Ingrese su nombre");
     return false;
    }
    //Email
    else if(signUpEmail === ''){
      alert("Ingrese email");
     return false;
    }

    //Contraseña
    else if(signUpPassword === ''){
      alert("Ingrese contraseña");
     return false;
    }
    else if(signUpPassword.length < 8){
      alert("Ingrese 8 digitos");
      return false;
    }
    else if(capitalLeters<2 || lowercase<2 || numbers<2|| characters<2){
      alert("debe incluir como minimos: 2 mayusculas, 2 minusculas, 2 numeros, 2 simbolos")
      return false;
    }
    else if(signUpRepeatPssword === ''){
      alert("Ingrese la repeticion de la contraseña");
     return false;
    }
    else if(signUpPassword != signUpRepeatPssword){
      alert("Las contraseñas no son iguales");
      return false;
    }
    else if(signUpPetName === ''){
      alert("Ingrese nombre de la mascota");
     return false;
    }
    else if(signUpSpecieName === ''){
      alert("Ingrese la especie de la mascota");
     return false;
    }
    else{
      createUser(signUpEmail, signUpPassword)
      .then(() => {
        window.location.href = '/';
      }); 
    }
  });
  const buttonBack = document.getElementById('back-button');
  buttonBack.addEventListener('click', () => {
    window.location.href = '/';
  });
  return registerDiv;
};
