import { client } from 'client';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from 'utils/data';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    client.fetch(getCategories).then((data) => setCategories(data));
  }, []);
  return (
    <div className="mx-auto my-5 flex items-center justify-center border-b-2">
      <ul className="flex justify-center w-full items-center h-14 flex-wrap px-3 mb-3 mx-auto gap-2">
        {categories.map((category, index) => (
          <li className="mx-[3%] overflow-hidden " key={index}>
            <NavLink
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
