
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/catalog/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="category-list">
      {categories.map((category) => (
        <div key={category.id} className="category-item">
          <Link to={`/category/${category.id}`} className="category-link">
            <div className="category-card">
              <img src={category.image} alt={category.name} className="category-image"/>
              <h3 className="category-name">{category.name}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
