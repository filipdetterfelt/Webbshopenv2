export async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products/");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error + "Fetch has failed");
    }
  }
