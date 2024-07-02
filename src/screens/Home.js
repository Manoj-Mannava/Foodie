// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousal from '../components/Carousal';
import axios from 'axios';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadData();
    fetchCarouselImages();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/foodData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log(data.food_items, data.foodCategory);

      setFoodItem(data.food_items);
      setFoodCat(data.foodCategory);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCarouselImages = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          query: 'pizza,burger,barbeque',
          count: 3,
          client_id: '3-bApWuPUuOpsGPmJH7QeB53mKitIMn-6Xg4_Lbthrg'
        }
      });

      const imageResults = response.data.map((image) => ({
        id: image.id,
        url: image.urls.regular,
        alt: image.alt_description
      }));

      setCarouselImages(imageResults);
    } catch (error) {
      console.error('Error fetching carousel images:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Carousal images={carouselImages} />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
              <div className="carousel-inner" id='carousel'>
                {carouselImages.map((image, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <img src={image.url} className="d-block mx-auto img-fluid" alt={image.alt} style={{ maxHeight: '50vh' }} />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {foodCat && foodCat.length !== 0
          ? foodCat.map((data) => (
            <div key={data._id} className="mb-3">
              <div className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              <div className="row">
                {foodItem && foodItem.length !== 0
                  ? foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map((filteredItem) => (
                      <div key={filteredItem._id} className="col-12 col-md-6 col-lg-4">
                        <Card
                          foodName={filteredItem.name}
                          options={filteredItem.options[0]}
                          imgSrc={filteredItem.img}
                          description={filteredItem.description}
                        />
                      </div>
                    ))
                  : <div className="col-12">No items found for this category</div>}
              </div>
            </div>
          ))
          : "No food categories available"}
      </div>
      <Footer />
    </div>
  );
}
