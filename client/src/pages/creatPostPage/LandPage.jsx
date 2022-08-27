import { client } from 'client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useDocumentTitle } from 'utils';
import { getCategoriesSelect } from 'utils/data';
import './landPage.scss';

const LandPage = () => {
  useDocumentTitle('new', false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [categoryTitle, setCateforyTilte] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    client.fetch(getCategoriesSelect).then((data) => {
      setCategories(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '10px',
    });
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategoryId(e.value);
    setCateforyTilte(e.label);
    setError('')
    console.log(e);
  };

  const handleCreate = () => {
    categoryId
      ? navigate(`/posts/creat-new/${categoryTitle}/${categoryId}`)
      : setError('Please choose a category!');
  };

  return (
    <div className="h-screen">
      <div className="my-14 mx-auto flex flex-col justify-center items-start px-5 sm:w-[520px]">
        <div className="text-left text-2xl mb-3 mr-8 font-bold text-gray-600">
          Category:{' '}
        </div>
        <div className="w-full flex flex-col xs:flex-row">
          <div className="flex flex-col mr-5 relative mb-3 ">
            {categories ? (
              <div>
                <Select
                  defaultValue={'choose'}
                  onChange={handleChange}
                  options={categories}
                  className="w-full mr-3 xs:w-260"
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,
                      primary25: 'rgb(251 113 133)',
                      primary: 'rgb(244 63 94)',
                    },
                  })}
                />
              </div>
            ) : (
              'loading'
            )}
            {error ? (
              <div className="absolute -bottom-7 text-red-500 font-semibold">
                {error}
              </div>
            ) : (
              ''
            )}
          </div>

          <div
            className="w-24 flex items-center justify-center text-center px-5 bg-rose-500 h-10 rounded-md text-white lg:mx-2.5 hover:bg-rose-600 transition ease-out duration-100 font-semibold cursor-pointer"
            onClick={handleCreate}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

//style for react-select

export default LandPage;
