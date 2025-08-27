const fetchProducts = async (query = '') => {
  const url = query
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
    : 'https://dummyjson.com/products';

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');

  const data = await res.json();
  return data.products;
};

export default fetchProducts;
