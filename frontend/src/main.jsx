import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./User/Home";

export default function main() {
  return (
    <section className="mainpage">
      <Routes>
        <Route path="/" element={<Navigate to="/main/Home" />} />
        <Route path="/Home" Component={Home} />
      </Routes>
    </section>
  );
}
