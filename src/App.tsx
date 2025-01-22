import React from "react";
import "./App.css";
import Layout from "./components/layouts/Layout";
import ReservationPart from "./components/ReservationPart";

const App: React.FC = () => {
  return (
    <Layout>
      <ReservationPart />
    </Layout>
  );
};

export default App;
