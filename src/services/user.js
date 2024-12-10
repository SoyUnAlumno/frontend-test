import { postLoginEndpoint } from "../helpers/constants";

/**
 * Makes POST request to handle sign in
 */
/**
 * Handles user sign in
 * @param {String} username
 * @param {String} password
 * @returns
 */
export function signIn({ username, password }) {
  return new Promise((resolve, reject) => {
    fetch(postLoginEndpoint, {
      // Se ha añadido el campo headers ya que sin él la petición no funcionaba
      // El ejemplo de (https://fakestoreapi.com/). viene sin headers
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        // Checks if response from back is OK or KO
        if (res.ok) {
          // returns the json response after the async process
          return res.json();
        } else {
          // Returns response status to provide the correct feedback
          reject(res.status);
        }
      })
      .then((jsonResponse) => {
        // Returns the token
        resolve(jsonResponse);
      });
  });
}
