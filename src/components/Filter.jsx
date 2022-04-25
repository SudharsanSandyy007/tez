import React, { useState } from "react";
import "../styles/Filter.css";
function Filter({ filterSearch }) {
  const [aprtType, setaprtType] = useState("");

  return (
    <div className="filter">
      <div className="filter__top">
        <div>Filters</div>
      </div>
      <div className="filter__mid">
        <div className="filterMid__option">
          <p>Appartment type: </p>
          <select
            name="aprtType"
            onChange={(e) => {
              setaprtType(e.target.value);
            }}
            id=""
          >
            <option value="1">1BHK</option>
            <option value="2">2BHK</option>
            <option value="3">3BHK</option>
          </select>
        </div>

        <div className="filterMid__option">
          <p>Rent Range: ₹0 to 50:</p>
          <input type="range" min="1" max="100" />
        </div>
        <div className="filterMid__option">
          <p>Parking:</p>
          <div className="parking">
            <div className="parkingYes">
              <input type="radio" name="parking" value="yes" id="parkingyes" />
              <label htmlFor="parkingyes">Yes</label>
            </div>
            <div className="parkingNo">
              <input type="radio" name="parking" value="no" id="parkingno" />
              <label htmlFor="parkingno">No</label>
            </div>
          </div>
        </div>
        <div className="filterMid__option">
          <p>More preferences:</p>
          <div className="preferences">
            <div>
              <div className="checkboxWrap">
                <input
                  type="checkbox"
                  name="preferences"
                  id="independentHouse"
                />
                <label htmlFor="independentHouse">Independent House</label>
              </div>
              <div className="checkboxWrap">
                <input type="checkbox" name="preferences" id="appartment" />
                <label htmlFor="appartment">Appartment</label>
              </div>
            </div>
            <div>
              <div className="checkboxWrap">
                <input type="checkbox" name="preferences" id="pg" />
                <label htmlFor="pg">PG/Hostel</label>
              </div>
              <div className="checkboxWrap">
                <input
                  type="checkbox"
                  name="preferences"
                  id="independentHouse"
                />
                <label htmlFor="independentHouse">Tourist Tents</label>
              </div>
            </div>
          </div>
        </div>

        <div className="filterMid__option">
          <p>Built Up Area(sq.ft): 0 to 10,000</p>
          <input type="range" min="0" max="10000" />
        </div>
      </div>
      <div className="filter__bottom">
        <div
          onClick={() => {
            filterSearch(aprtType);
          }}
          className="filterBtmBtn"
        >
          Apply filters and search!
        </div>
      </div>
    </div>
  );
}

export default Filter;
