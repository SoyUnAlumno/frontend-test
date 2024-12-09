/**
 * Makes POST request to handle sign in
 */
export function signIn() {
  return new Promise((resolve) => {
    fetch("https://fakestoreapi.com/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: "mor_2314",
        password: "83r5^_",
      }),
    })
      .then((res) => res.json())
      .then((jsonResponse) => resolve(jsonResponse));
  });
}