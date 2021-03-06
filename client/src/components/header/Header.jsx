import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { client } from 'client';
import { getAllPosts, searchQuery } from 'utils/data';
import './header.scss';


const Header = ({ setAllPosts, setIsLoading }) => {

  const user =false


  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState('');

  const [show, setShow] = useState(false);
  const transitionNavBar = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  const handleSearch = () => {
    navigate('/');
    if (searchParams !== '') {
      setIsLoading(true);
      const query = searchQuery(searchParams.toLowerCase());
      client.fetch(query).then((data) => {
        setAllPosts(data);
        setIsLoading(false);
      });
    } else {
      client.fetch(getAllPosts).then((data) => {
        setAllPosts(data);
        setIsLoading(false);
      });
    }
  };

  return (
    <div className={`app__header ${show && 'sticky-top'}`}>
      <div className="app__header-logo">
        <a href="http://localhost:3000">Logo</a>
      </div>
      <div className="app__header-searchbar">
        <div className="app__header-searchbar-key">
          <BsSearch className="app__header-searchbar-icon" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchParams(e.target.value)}
          />
        </div>
        <div className="app__header-searchbar-btn" onClick={handleSearch}>
          Search
        </div>
      </div>

      <Link to="/posts/creat-new">
        <div className="app__header-postbtn">Post a new</div>
      </Link>
     
    </div>
  );
};

export default Header;
