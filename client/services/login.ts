const login = () => {
  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "     ",
      password: "     ",
    }),
  });
};
