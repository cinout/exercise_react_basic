// import logo from "./logo.svg";
import "./App.css";
import inventory from "./inventory.json";
import React, { useState } from "react";
import groupBy from "lodash/groupBy";

function SearchBar({
  filterText,
  inStockOnly,
  onChangeFilterText,
  onChangeInStockOnly,
}: {
  filterText: string;
  inStockOnly: boolean;
  onChangeFilterText: (str: string) => void;
  onChangeInStockOnly: (value: boolean) => void;
}) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => onChangeFilterText(e.target.value)}
      />
      <br />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onChangeInStockOnly(e.target.checked)}
        />
        Only show products in stock
      </label>
    </form>
  );
}

interface ProductRowProps {
  filterText: string;
  inStockOnly: boolean;
}

function ProductRows({ filterText, inStockOnly }: ProductRowProps) {
  const inventory_data: {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
  }[] = inventory;
  const items_per_category = groupBy(
    inventory_data,
    ({ category }) => category
  );

  const category_and_items = Object.entries(items_per_category);

  return (
    <>
      {category_and_items.map(([category, items], outer_index) => (
        <React.Fragment key={category}>
          <tr>
            <th colSpan={2}>{category}</th>
          </tr>
          {items
            .filter(
              ({ name, stocked }) =>
                (!inStockOnly || stocked) &&
                name.toLowerCase().includes(filterText.toLowerCase())
            )
            .map(({ name, price, stocked }) => (
              <tr key={`${category}-${name}`}>
                <td style={{ color: stocked ? "black" : "#1d7ea8" }}>{name}</td>
                <td>{price}</td>
              </tr>
            ))}
        </React.Fragment>
      ))}
    </>
  );
}

function ProductTable({ filterText, inStockOnly }: ProductRowProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <ProductRows filterText={filterText} inStockOnly={inStockOnly} />
      </tbody>
    </table>
  );
}

function App() {
  const [filterText, setFilterText] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  return (
    <div className="App">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onChangeFilterText={setFilterText}
        onChangeInStockOnly={setInStockOnly}
      />
      <ProductTable filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  );
}

export default App;
