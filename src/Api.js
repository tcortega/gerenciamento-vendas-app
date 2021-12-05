const BASE_API = "https://app-vendas-api.azurewebsites.net/api";

export default {
  signIn: async (email, password) => {
    const req = await fetch(`${BASE_API}/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return await req.json();
  },
  signUp: async (name, email, password) => {
    const req = await fetch(`${BASE_API}/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    return await req.json();
  },
  getProducts: async () => {
    const req = await fetch(`${BASE_API}/product`, {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    });

    return await req.json();
  },
  addProduct: async (name, category, price, quantity) => {
    const req = await fetch(`${BASE_API}/product`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, category, quantity, price }),
    });

    return await req.json();
  },
  getSellers: async () => {
    const req = await fetch(`${BASE_API}/seller`, {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    });

    return await req.json();
  },
  addSeller: async (name) => {
    const req = await fetch(`${BASE_API}/seller`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    return await req.json();
  },
  getPurchases: async () => {
    const req = await fetch(`${BASE_API}/purchase`, {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    });

    return await req.json();
  },
  getDashboardData: async () => {
    const req = await fetch(`${BASE_API}/dashboard`, {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    });

    return await req.json();
  },
};
