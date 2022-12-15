import React, { useState } from "react";
import { getData, deleteData, postData, updateData } from "../util/fetchData";

export const DataContext = React.createContext();

export const DataContextProvider = (props) => {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const uploadItems = () => {
    (async () => {
      try {
        setLoading(true);
        const res = await getData();
        if (res) {
          setItems(res.reverse());
          setLoading(false);
        }
      } catch (err) {
        setError(err);
      }
    })();
  };

  const addItem = (item) => {
    (async () => {
      try {
        const res = await postData(item);
        if (res)
          setItems((prevState) => [{ ...item, id: res.data.id }, ...prevState]);
      } catch (err) {
        setError(error);
      }
    })();
  };

  const updateItem = (data) => {
    (async () => {
      try {
        const res = updateData(data);

        if (res)
          setItems((prevState) =>
            prevState.map((item) => {
              if (item.id === data.id) {
                item = { ...item, ...data };
              }
              return item;
            })
          );
      } catch (err) {
        setError(err);
      }
    })();
  };

  const deleteItem = (id) => {
    (async () => {
      try {
        const res = await deleteData(id);
        if (res)
          setItems((prevState) => prevState.filter((item) => item.id !== id));
      } catch (err) {
        setError(error);
      }
    })();
  };

  const contextValue = {
    loading,
    error,
    items,
    uploadItems,
    addItem,
    updateItem,
    deleteItem,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};
