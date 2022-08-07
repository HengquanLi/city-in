import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { client } from 'client';
import { BsPen } from 'react-icons/bs';
import { getAllPosts, searchQuery } from 'utils/data';
// import './header.scss';


const Header = ({ setAllPosts, setIsLoading }) => {


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
    <div
      // className={`app__header ${show && 'sticky-top'}`}
      className={`mx-auto my-1.5 py-3 px-96 flex flex-row items-center justify-between ${
        show && 'sticky top-0 z-20 bg-white border-b border-gray border-solid'
      }`}
    >
      <div className="app__header-logo my-0 mx-2.5">
        <a href="http://localhost:3000">Logo</a>
      </div>
      <div className="app__header-searchbar h-11 flex flex-row items-center flex-[0_1_560px] my-0 mx-2.5">
        <div className="flex items-center leading-10 w-full pl-2 border-solid border-2 border-rose-500 rounded-tl-md rounded-bl-md border-r-0 bg-white">
          <BsSearch className="app__header-searchbar-icon fill-slate-300 mr-1" />
          <input
            className="border-0 placeholder:italic placeholder:text-slate-400 block bg-white w-full p-2 focus:outline-none h-9 text-slate-400"
            type="text"
            placeholder="Search for anything..."
            onChange={(e) => setSearchParams(e.target.value)}
          />
        </div>
        <div
          // className="app__header-searchbar-btn"
          className="flex items-center justify-center w-28 h-10 bg-rose-500 rounded-tr-md rounded-br-md cursor-pointer text-white font-semibold hover:bg-rose-600 transition ease-out duration-100"
          onClick={handleSearch}
        >
          Search
        </div>
      </div>

      <Link to="/posts/creat-new">
        <div
          // className="app__header-postbtn"
          className="flex items-center justify-center text-center px-5 bg-rose-500 h-10 rounded-md text-white mx-2.5 hover:bg-rose-600 transition ease-out duration-100 font-semibold"
        >
          <BsPen className=""/> <span className="ml-2">New... </span>
        </div>
      </Link>
    </div>
  );
};

export default Header;
