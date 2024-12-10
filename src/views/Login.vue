<template>
  <form class="form-signin" @submit.prevent="onSignIn">
    <img class="mb-4" src="../assets/logo.png" alt="" width="100" height="100" />

    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <input type="text" id="username" class="form-control mb-2" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" id="inputPassword" class="form-control mb-4" placeholder="Password" />
    <p>
      <b v-if="emptyFields">Por favor, rellene todos los campos.</b>
    </p>
    <p>
      <b v-if="err">Algún dato es incorrecto. Por favor, revise sus credenciales y vuelva a
        intentarlo.</b>
    </p>
    <button class="btn btn-lg btn-outline-dark btn-block" type="submit" :disabled="isSignedIn">
      <span>Sign in</span>
      <!-- Loader -->
      <span v-if="false" class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="false"></span>
    </button>
    <p v-if="isSignedIn">
      <b>Login correcto, accediendo a la aplicación...</b>
    </p>
  </form>
</template>

<script>
/**
 * Se comenta aquí dado que no se permiten comentarios en el package.json:
 * al hacer npm install y luego run serve, daba un fallo  por "Module not found: Error: Can't resolve '@popperjs/core'.
 * Tras hacer una búsqueda en google se ve que hace falta instalar una dependencia más con un comando específico por ser la versión
 * de bootstrap 5 o superior.
 * fuente: https://stackoverflow.com/questions/57459917/how-to-fix-this-error-module-not-found-cant-resolve-popper-js
 * comando: npm install @popperjs/core --save
 */

// TODO: Lo ideal sería no poner textos a fuego y usar i18n, además añadir accesibilidad en todas las maquetas

// The content of imports, data, methods, etc. are all sorted alphabetically
import { signIn } from "../services/user";
export default {
  name: "Login",
  data() {
    return {
      emptyFields: false,
      err: undefined,
      isSignedIn: undefined,
      password: undefined,
      username: undefined,
    };
  },
  methods: {
    /**
     * Como se simula el paso del tiempo en varios feedbacks se crea esta función para evitar repetición y mejorar la lectura del código
     * 
     * Solo se usa setTimeout en este proyecto para simular de forma rápida un cierto tiempo de espera.
     * 
     * Recibe una función callback para ejecutar
     * @param callback código que se desea se ejecute transcurrido un tiempo
     * @param timeToWait tiempo en milisegundos que se esperará
     */
    callSetTimeout(callback, timeToWait) {
      setTimeout(() => {
        callback()
      }, timeToWait);
    },
    /**
     * Uses a switch to handle the feedback depending on the error code.
     * Otra opción sería un objeto y casar las llaves con los códigos de error
     * @param errorCode
     */
    handleErrors(errorCode) {
      switch (errorCode) {
        case 401:
          this.err = true
          this.callSetTimeout(() => this.err = false, 3500)
          break;
        default:
          break;
      }

    },
    /**,
     * Handles login/signin when the user clicks the Sign in button
     */
    onSignIn() {
      if (!this.username || !this.password) {
        this.emptyFields = true
        this.callSetTimeout(() => this.emptyFields = false, 3500)
        return;
      }
      const fakeLoginData = {
        // Se agregan credenciales comentadas por facilitar las pruebas
        username: this.username, // mor_2314
        password: this.password // 83r5^_
      }
      signIn(fakeLoginData)
        .then((result) => {
          // Saves token in storage
          localStorage.setItem("token", JSON.stringify(result));

          // Parses jwt to obtain data
          const parsedToken = JSON.parse(atob(result.token.split(".")[1]));

          // Checks if username is the same as the one contained in the jwt
          // El username elegido es: mor_2314
          if (parsedToken.user === this.username) {
            // Gives user feedback and navigates to home page
            // alert("Se ha logado correctamente");
            this.isSignedIn = true;
            this.err = false;
            // Se elige esta forma de dar feedback al usuario. Permite al usuario leer el feedback. Se usa setTimeout solo con este propósito
            this.callSetTimeout(() => this.$router.push("/"), 2500)
          } else {
            this.err = true;
            // De nuevo, se usa setTimeout solo para dar tiempo al usuario a leer el feedback
            this.callSetTimeout(() => this.err = false, 3500)
          }
        })
        .catch(errorCode => {
          this.handleErrors(errorCode)
        });
    },
  },
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
</style>
