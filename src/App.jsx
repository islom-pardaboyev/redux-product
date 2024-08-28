import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAxios } from "./hooks/useAxios";
import { ACTIONS } from "./redux/actions";
import Cards from "./components/Cards";
import AppBars from "./components/AppBars";
import { MutatingDots } from "react-loader-spinner";

function App() {
  const { products, filteredProducts } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    useAxios()
      .get("products")
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: res.data });
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, [refresh, dispatch]);

  const categories = [];

  products.forEach((item) => {
    if (!categories.includes(item.category.name)) {
      categories.push(item.category.name);
    }
  });

  function handleSelectValue(e) {
    const value = e.target.value;
    dispatch({ type: ACTIONS.FILTER_BY_CATEGORY, payload: value });
  }

  return (
    <>
      <AppBars setRefresh={setRefresh} refresh={refresh} />
      <div className="container">
        <select
          onChange={handleSelectValue}
          className="shadow-xl my-3 float-right w-[300px] p-3 rounded-md border border-black outline-none"
        >
          <option value="" defaultValue>
            All
          </option>
          {categories.map((item, index) => (
            <option value={item} key={index + 1}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-10 container gap-5 grid mx-auto grid-cols-12">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen fixed top-0 left-0 w-screen">
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor="#4fa94d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : filteredProducts.length ? (
          filteredProducts.map((item, index) => (
            <Cards key={index + 1} item={item} />
          ))
        ) : (
          <div className="fixed font-bold text-6xl text-neutral-400 top-0 left-0 flex items-center justify-center w-screen h-screen">
            Not Found...
          </div>
        )}
      </div>
    </>
  );
}

export default App;
