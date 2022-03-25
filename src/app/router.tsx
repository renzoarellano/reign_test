import { Home } from "../screens/home";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

export const RouterApp = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  )
}