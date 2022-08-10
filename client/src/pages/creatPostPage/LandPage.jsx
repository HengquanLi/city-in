import { client } from 'client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useDocumentTitle } from 'utils';
import { getCategoriesSelect } from 'utils/data';
import './landPage.scss';

const LandPage = () => {
  useDocumentTitle('新发布',false)
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [categoryTitle, setCateforyTilte] = useState();

  useEffect(() => {
    // const query = '*[_type == "categories"]{"label":title,"value":_id}';
    client.fetch(getCategoriesSelect).then((data) => {
      setCategories(data);
      console.log(data);
    });
  }, []);

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setCategoryId(e.value);
    setCateforyTilte(e.label)
    console.log(e);
  };
  

  const handleCreate = () => {
    categoryId
      ? navigate(`/posts/creat-new/${categoryTitle}/${categoryId}`)
      : alert('选择发布内容');
  };

  return (
    <div className="app__create-landpage">
      <div className="app__create-landpage-select my-14 mx-auto flex justify-center items-center w-[900px]">
        <div className="app__create-landpage-title text-lg mr-8">
          请选择发布内容:{' '}
        </div>
        {
          categories ? (
            <div>
          <Select
            defaultValue={'choose'}
            onChange={handleChange}
            options={categories}
            className="w-72 mr-3"
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
          ) : 'loading'
        }
        
        <div
          className="flex items-center justify-center text-center px-5 bg-rose-500 h-10 rounded-md text-white mx-2.5 hover:bg-rose-600 transition ease-out duration-100 font-semibold cursor-pointer"
          onClick={handleCreate}
        >
          下一步
        </div>
      </div>
    </div>
  );
};

//style for react-select


export default LandPage;
