// src/components/Card.js
import React from 'react';

export default function Card({ foodName, options, imgSrc, description }) {
  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: '22rem', maxHeight: '450px' }}>
          <img
            src={imgSrc}
            className="card-img-top"
            alt={foodName}
            style={{ height: '150px', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title">{foodName}</h5>
            <p className="card-text">{description}</p>
            <div className="container w-100">
              <div className="d-flex justify-content-between align-items-center">
                <select className="bg-success rounded" style={{ width: '50px', margin: '0' }}>
                  {Array.from(Array(6), (e, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select className="bg-success rounded" style={{ width: '70px', margin: '0' }}>
                  <option value="half">Half</option>
                  <option value="full">Full</option>
                </select>
                <div className="d-inline fs-5" style={{ whiteSpace: 'nowrap', margin: '0' }}>
                  Total price
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
