import { client } from 'client';
import { useEffect, useState } from 'react';
import { BsPen, BsSearch } from 'react-icons/bs';
import {FaRegEdit} from 'react-icons/fa'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { getAllPosts, searchQuery } from 'utils/data';
import ReactTooltip from 'react-tooltip';


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
    navigate('/search');
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
      className={`w-full relative py-3 ${
        show && 'sticky top-0 z-20 bg-white border-b border-gray border-solid'
      }`}
    >
      <div className="my-1.5 mx-auto w-5/6 md:flex items-center justify-between">
        <div className="my-0 mx-2.5 text-center">
          <a href="/">Logo</a>
        </div>
        <div className="flex justify-center px-3 flex-1">
          <div className="h-11 md:flex-[0_0_50%] flex flex-row items-center my-3 mx-2.5 border-solid border-2 border-rose-500 rounded-xl bg-white">
            <div className="flex  items-center leading-10 w-full pl-2">
              <input
                className="border-0 placeholder:italic placeholder:text-slate-600 block bg-white w-full p-2 focus:outline-none h-9 text-slate-400"
                type="text"
                placeholder="Search.."
                onChange={(e) => setSearchParams(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <BsSearch
              className="fill-slate-400 mr-3 hover:cursor-pointer bg-white"
              onClick={handleSearch}
            />
          </div>
          <Link
            to="/posts/creat-new"
            className="flex items-center ml-3 xs:hidden lg:hidden"
          >
            <FaRegEdit
              className="h-8 w-8 text-rose-500 mr-3 hover:cursor-pointer border-none outline-none"
              data-tip
              data-for="newPostTip"
            />
            <ReactTooltip
              type="info"
              id="newPostTip"
              place="top"
              effect="solid"
            >
              New Post
            </ReactTooltip>
          </Link>
          <Link
            to="/posts/creat-new"
            className="flex items-center ml-3 hidden xs:flex"
          >
            <div className="  flex items-center justify-center text-center px-5 bg-rose-500 h-10 rounded-md text-white mx-2.5 hover:bg-rose-600 transition ease-out duration-100 font-semibold">
              <BsPen className="" /> <span className="ml-2">New... </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
