import "./App.css";
import React, { useState } from "react";
import api from "./services/api";
import { FiSearch } from "react-icons/fi";

const App = () => {
  const [input, setInput] = useState("");
  const [zipcode, setZipCode] = useState("");

  async function handleSearch() {
    if (input === "") {
      alert("Fill the field with your zipcode!");
    }

    try {
      const response = await api.get(`${input}/json`);
      setZipCode(response.data);
      setInput("");
    } catch {
      alert("Error finding your zipcode");
      setInput("");
    }
  }

  return (
    <div className="container mx-auto flex flex-col justify-center bg-white max-w-2xl mt-44 rounded-xl shadow-lg px-4 pb-6">
      <h1 className="my-5 text-center text-3xl tracking-wide ">
        Zipcode Search
      </h1>

      <div className="flex justify-center grid-cols-1">
        <input
          type="text"
          placeholder="Type your zipcode"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-b-2 outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-teal-600 hover:bg-teal-700 hover:transition-all w-28 flex justify-center text-white p-1 rounded-r-md"
        >
          <FiSearch size={20} color="white" className="mr-2" /> Search
        </button>
      </div>

      {Object.keys(zipcode).length > 0 && (
        <main className="grid-cols-2 justify-items-center mx-auto my-5">
          <div className="mb-1">
            <span className="mr-5 text-teal-900">{zipcode.logradouro}</span>
            <span className="mr-5 text-teal-900">{zipcode.bairro}</span>
            <span className="text-teal-900">
              {zipcode.localidade} - {zipcode.uf}
            </span>
          </div>
          <div className="mb-1">
            <span className="mr-5 text-teal-900">Zipcode: {zipcode.cep}</span>
            <span className="text-teal-900">Complemento: {zipcode.complemento}</span>
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
