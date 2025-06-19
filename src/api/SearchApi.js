const SearchFood = async (search = "") => {
  const res = await fetch(`https://artifacts-tracker-server-eta.vercel.app/artifactsSearch?search=${search}`);
  const data = await res.json();
  return data;
};



export default SearchFood;