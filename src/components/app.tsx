import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import About from "../pages/about";
import Form from "../pages/form";
import User from "../pages/user";
import List from "../pages/list";
import AddItemPage from "../pages/AddItemPage"; // Import AddItemPage
import EditItemPage from "../pages/EditItemPage"; // Import EditItemPage

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/form" element={<Form />}></Route>
              <Route path="/user" element={<User />}></Route>
              <Route path="/list" element={<List />}></Route>
              <Route path="/add-item" element={<AddItemPage />}></Route>
              <Route path="/edit-item/:id" element={<EditItemPage />} />{" "}
              {/* Thêm Route cho EditItemPage */}
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};

export default MyApp;
