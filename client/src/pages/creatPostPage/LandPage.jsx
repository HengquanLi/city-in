import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { client } from 'client';
import { getCategories } from 'utils/data';
import { useDocumentTitle } from 'utils';
import './landPage.scss';

const LandPage = () => {
  useDocumentTitle('新发布',false)
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();

  useEffect(() => {
    // const query = '*[_type == "categories"]{"label":title,"value":_id}';
    client.fetch(getCategories).then((data) => {
      setCategories(data);
      console.log(data);
    });
  }, []);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setCategory(e.value);
  };
  console.log(category);

  const handleCreate = () => {
    category ? navigate(`/posts/creat-new/${category}`) : alert('选择发布内容');
  };

  return (
    <div className="app__create-landpage">
      <div className="app__create-landpage-select">
        <div className="app__create-landpage-title">请选择发布内容</div>
        <div className="app__create-landpage-options">
          <Select
            // styles={customStyles}
            defaultValue={'choose'}
            onChange={handleChange}
            options={categories}
            className="app__create-options"
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                primary25: '#fb6f4f',
                primary: '#ff552e',
              },
            })}
          />
        </div>
        <div className="app__creat-landpage-btn">
          <button onClick={handleCreate}>下一步</button>
        </div>
      </div>
    </div>
  );
};

//style for react-select
const customStyles = {
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export default LandPage;
