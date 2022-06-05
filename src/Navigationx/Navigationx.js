import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "../WebPages/Dashboard/Dashboard";
import { Login } from "../WebPages/Login/Login";
import Orders from "../WebPages/Orders/Orders";
import Users from "../WebPages/Users/Users";
import Product from "../WebPages/Product/Product";
import Category from "../WebPages/Category/Category";
import AddProduct from "../WebPages/Add-Product/AddProduct";
import Recent from "../WebPages/Recent/Recent";
import Recomended from "../WebPages/Recomended/Recomended";
import EditProduct from "../WebPages/EditProduct/Edit";
import EditRecent from "../WebPages/EditRecent/Edit";
import EditRecomended from "../WebPages/EditRecomended/Edit";

export const Navigationx = () => {
  return (
    <Routes>
      <Route path="/" caseSensitive={false} element={<Login />} />
      <Route path="/login" caseSensitive={false} element={<Login />} />
      {localStorage.getItem("userinfo") && (
        <Route
          path="/dashboard"
          caseSensitive={false}
          element={<Dashboard />}
        />
      )}
      {localStorage.getItem("userinfo") && (
        <Route path="/orders" caseSensitive={false} element={<Orders />} />
      )}
      {localStorage.getItem("userinfo") && (
        <Route path="/users" caseSensitive={false} element={<Users />} />
      )}

      {localStorage.getItem("userinfo") && (
        <Route path="/products" caseSensitive={false} element={<Product />} />
      )}

      {localStorage.getItem("userinfo") && (
        <Route
          path="/addproduct"
          caseSensitive={false}
          element={<AddProduct />}
        />
      )}

      {localStorage.getItem("userinfo") && (
        <Route
          path="/recomended"
          caseSensitive={false}
          element={<Recomended />}
        />
      )}

      {localStorage.getItem("userinfo") && (
        <Route path="/recent" caseSensitive={false} element={<Recent />} />
      )}

      {localStorage.getItem("userinfo") && (
        <Route path="/category" caseSensitive={false} element={<Category />} />
      )}

      {localStorage.getItem("userinfo") && (
        <Route
          path="/edit/:id"
          caseSensitive={false}
          element={<EditProduct />}
        />
      )}

      {localStorage.getItem("userinfo") && (
        <Route
          path="/editrecent/:id"
          caseSensitive={false}
          element={<EditRecent />}
        />
      )}

      {localStorage.getItem("userinfo") && (
        <Route
          path="/editrecomended/:id"
          caseSensitive={false}
          element={<EditRecomended />}
        />
      )}

      <Route path="*" caseSensitive={false} element={<Login />} />
    </Routes>
  );
};
