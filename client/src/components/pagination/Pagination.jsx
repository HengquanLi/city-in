import { useEffect, useState } from 'react';
import { DOTS, usePaginationRange } from 'utils/usePaginateRange';
import './pagination.scss';

const Pagination = ({
  data,
  RenderComponent,
  title,
  buttonConst,
  contentPerPage,
  siblingCount,
}) => {
  const [totalPageCount] = useState(Math.ceil(data.length / contentPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  const paginationRange = usePaginationRange({
    totalPageCount,
    contentPerPage,
    buttonConst,
    siblingCount,
    currentPage,
  });

  /* 👇 little UX tweak when user clicks on any button we scoll to top of the page */

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '10px',
    });
  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };
  const gotToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };
  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };
  const getPaginatedData = () => {
    const startIndex = currentPage * contentPerPage - contentPerPage;
    const endIndex = startIndex + contentPerPage;
    return data.slice(startIndex, endIndex);
  };

  const active = 'border-none !bg-rose-500 text-white pointer-events-none';
  const disable = '!shadow-none !text-gray-500 pointer-events-none ';

  return (
    <>
      {/* <h1>{title}</h1> */}
      {/* show the post 10 post at a time*/}
      <>
        {getPaginatedData().map((dataItem, index) => (
          <RenderComponent key={index} data={dataItem} />
        ))}
      </>
      {/* show the pagiantion
                it consists of next and previous buttons
                along with page numbers, in our case, 5 page
                numbers at a time */}
      <div className="flex w-full items-center justify-center mt-3">
        {/* previous button */}
        <button
          onClick={gotToPreviousPage}
          className={`rounded text-sm flex items-center justify-center bg-white border-none p-2.5 shadow-lg mx-2.5 cursor-pointer text-rose-500 hover:text-white hover:bg-rose-500 ${
            currentPage === 1 ? disable : ''
          }`}
        >
          pre
        </button>
        {/* show paginated button group */}
        {paginationRange.map((item, index) => {
          if (item === DOTS) {
            return (
              <button
                key={index}
                className="text-sm flex items-center justify-center  bg-white py-2.5 px-3.5 h-8 w-8 mx-1.5 cursor-pointer rounded"
              >
                &#8230;
              </button>
            );
          }
          return (
            <button
              key={index}
              onClick={changePage}
              className={`text-sm flex items-center justify-center bg-white py-2.5 px-3.5 h-8 w-8 mx-1.5 cursor-pointer rounded ${
                currentPage === item ? active : null
              }`}
            >
              <span>{item}</span>
            </button>
          );
        })}
        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`rounded text-sm bg-white border-none p-2.5 shadow-lg mx-2.5 cursor-pointer text-rose-500 hover:text-white hover:bg-rose-500 ${
            currentPage === totalPageCount ? disable : ''
          }`}
        >
          next
        </button>
      </div>
    </>
  );
};

export default Pagination;
