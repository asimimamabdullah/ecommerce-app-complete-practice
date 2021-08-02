import axios from "axios";
import React, { useEffect, useState } from "react";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);

          console.log("this is in userAPI: ", res);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        const res = await axios.get("/user/history", {
          headers: { Authorization: token },
        });
        setHistory(res.data);
      };

      getHistory();
    }
  }, [token]);

  const addCart = async (product) => {
    if (!isLogged) return alert("Please login to continue buying ");

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    console.log(check);

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      alert("This product has been added to cart");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
  };
};

export default UserAPI;
