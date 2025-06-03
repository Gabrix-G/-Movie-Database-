import { useState } from "react";
import { url } from "../../utils/apiUrl";
const useDataUser = () => {
  const [dataUser, setDataUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getUsers = () => {};

  return { dataUser, setDataUser, handleChange };
};

export default useDataUser;
