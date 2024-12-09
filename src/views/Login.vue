<template>
  <form class="form-signin" @submit.prevent="onSignIn">
    <img
      class="mb-4"
      src="../assets/logo.png"
      alt=""
      width="100"
      height="100"
    />
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <input
      type="text"
      id="username"
      class="form-control mb-2"
      v-model="username"
      placeholder="Username"
    />
    <input
      type="password"
      v-model="password"
      id="inputPassword"
      class="form-control mb-4"
      placeholder="Password"
    />
    <button class="btn btn-lg btn-outline-dark btn-block" type="submit">
      <span>Sign in</span>

      <!-- Loader -->
      <span
        v-if="false"
        class="spinner-border spinner-border-sm mx-2"
        role="status"
        aria-hidden="false"
      ></span>
    </button>
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

// The content of imports, data, methods, etc. are all sorted alphabetically
import { signIn } from "../services/user";
export default {
  name: "Login",
  data() {
    return {
      password: undefined,
      username: undefined,
    };
  },
  methods: {
    /**,
     * Handles login/signin when the user clicks the Sign in button
     */
    onSignIn() {
      if (!this.username || !this.password) {
        alert("Por favor, introduzca ambos campos");
        return;
      }
      signIn().then((result) => {
        // Saves token in storage
        localStorage.setItem("token", JSON.stringify(result));
 
        // Parses jwt to obtain data
        const parsedToken = JSON.parse(atob(result.token.split(".")[1]));

        // Checks if username is the same as the one contained in the jwt
        if (parsedToken.user === this.username) {
          // Gives user feedback and navigates to home page
          alert("Se ha logado correctamente");
          this.$router.push("/");
        } else {
          alert(
            "Algún dato es incorrecto. Por favor, revise sus credenciales y vuelva a intentarlo."
          );
        }
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
