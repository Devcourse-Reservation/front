import React from "react";
import "./App.css";
import Layout from "./components/layouts/Layout";
import ReservationPart from "./components/ReservationPart";
import BackgroundBox from "./components/images/Background";


const App: React.FC = () => {
  return (
    <Layout>
      <BackgroundBox>
        <ReservationPart />
      </BackgroundBox>
    </Layout>
  );
};

export default App;
