import React, { useState } from "react";
import Card from "@mui/material/Card";
// import Typography from "@mui/material/Typography";
// import CardContent from "@mui/material/CardContent";
// import TermCard from components
import TermCard from "../../../components/TermCard";

function createSummTerms() {
  const [formData, setFormData] = useState({
    opponent: "",
    softOfferCap: "",
    firmOfferCap: "",
    softRange: "",
    firmRange: "",
    penaltyPercent: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform action with form data, e.g. sending it to a server
    console.log(formData);
  };

  return (
    <>
      <div className="flex flex-wrap bg-green-200">
        <form className="bg-white ml-2 p-7 rounded-lg shadow-sm" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="opponent">
              Opponent
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="opponent"
              type="text"
              name="opponent"
              value={formData.opponent}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="softOfferCap">
              Soft Offer Cap
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="softOfferCap"
              type="text"
              name="softOfferCap"
              value={formData.softOfferCap}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="firmOfferCap">
              Firm Offer Cap
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="firmOfferCap"
              type="text"
              name="firmOfferCap"
              value={formData.firmOfferCap}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="softRange">
              Soft Range
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="softRange"
              type="text"
              name="softRange"
              value={formData.softRange}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="firmRange">
              Firm Range
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="firmRange"
              type="text"
              name="firmRange"
              value={formData.firmRange}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="penaltyPercent">
              penalty Percent
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="penaltyPercent"
              type="text"
              name="penaltyPercent"
              value={formData.penaltyPercent}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>

        <div className="flex flex-col">
          <TermCard/>
        </div>

        <div>
          <p>Yalla</p>
          <p>Yalla</p>
          <p>Yalla</p>
          <p>Yalla</p>
          <p>Yalla</p>
          <p>Yalla</p>
        </div>
      </div>
    </>
  );
}

export default createSummTerms;
