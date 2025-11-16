import React, { useState } from "react";
import { KITS } from "../data/kits";
import KitCard from "../components/KitCard";


const ShopPage = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [...new Set(KITS.map((k) => k.category))];
  const filteredKits = selectedCategory
    ? KITS.filter((kit) => kit.category === selectedCategory)
    : KITS;


  


  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4 display-6">Catálogo de Kits Congelados</h2>

      <div className="row g-4">
        {/* Sidebar Filtro */}
        <aside className="col-lg-3">
          <div className="card p-3">
            <h5 className="fw-bold pb-2 border-bottom">Filtrar por</h5>
            <ul className="list-group">
              <li className="list-group-item p-0">
                <button
                  className={`btn w-100 text-start ${
                    !selectedCategory ? "btn-success text-white" : ""
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Todas las Categorías
                </button>
              </li>

              {categories.map((category) => (
                <li key={category} className="list-group-item p-0">
                  <button
                    className={`btn w-100 text-start ${
                      selectedCategory === category
                        ? "btn-success text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Galería de Kits */}
        <section className="col-lg-9">
          <div className="row g-4">
            {filteredKits.map((kit) => (
              <KitCard key={kit.id} kit={kit} navigate={navigate} />
            ))}
          </div>

          {filteredKits.length === 0 && (
            <p className="text-center text-muted mt-4">
              No hay kits disponibles en esta categoría.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default ShopPage;
