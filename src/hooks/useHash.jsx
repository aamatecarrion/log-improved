import React from "react";
import { LocalStorageContext } from "../contexts/LocalStorageContext";

const useHash = () => {
  const { data , setData} = React.useContext(LocalStorageContext);    
  const [hash, setHash] = React.useState(data.hash);

  React.useEffect(() => {
    setData({...data, hash: hash})
  }, [hash])

  return [hash, setHash];
};

export default useHash;
