import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { client } from 'client';
import './categories.scss';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const query = '*[_type == "categories"]';
    client.fetch(query).then((data) => setCategories(data));
  }, []);
  return (
    <div className="app__categories">
      <ul className="app__categories-ul">
        {categories.map((category, index) => (
          <li className="app__categories-li" key={index}>
            <NavLink
              // reloadDocument={true}
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              key={index}
              to={`/categories/${category.name}/posts`}
            >
              
              {category.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
