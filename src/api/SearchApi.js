const SearchFood = async (search = "") => {
  const res = await fetch(`http://localhost:3000/artifactsSearch?search=${search}`);
  const data = await res.json();
  return data;
};



export default SearchFood;