import React from "react";
import { KITS } from "../data/kits";
import Header from "../components/Header";
import KitCard from "../components/KitCard";

const HomePage = ({ navigate }) => (
  <>
    <Header />

    <main className="container py-5">
      <h2 className="text-center fw-bold mb-4 display-6">
        Explora la Semana Sin Estrés
      </h2>

      <div className="row justify-content-center">
        {KITS.slice(0, 3).map((kit) => (
          <KitCard key={kit.id} kit={kit} navigate={navigate} />
        ))}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/shop")}
          className="btn btn-primary btn-lg shadow"
        >
          Ver Catálogo Completo
        </button>
      </div>
    </main>
  </>
);

export default HomePage;
