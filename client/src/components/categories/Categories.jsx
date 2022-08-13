import { client } from 'client';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from 'utils/data';
import './categories.scss';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    client.fetch(getCategories).then((data) => setCategories(data));
  }, []);
  console.log(categories);
  return (
    <div
      // className="app__categories"
      className="w-full mx-auto my-5 flex items-center"
    >
      <ul
        // className="app__categories-ul"
        className="flex justify-center w-full items-center h-14"
      >
        {categories.map((category, index) => (
          <li
            // className="app__categories-li"
            className="my-0 mx-[3%]"
            key={index}
          >
            <NavLink
              // reloadDocument={true}

              className={({ isActive }) =>
                isActive
                  ? 'text-rose-600 border-b-solid border-rose-600 border-b-2 text-base font-bold'
                  : 'hover:text-rose-500 hover:border-b-solid hover:border-b-2 hover:border-rose-500 text-base font-semibold text-neutral-600'
              }
              key={index}
              to={`/categories/${category.name}/posts`}
            >
              {category.name.toUpperCase()}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
