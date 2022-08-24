import React from 'react';
import { Link } from 'react-router-dom';
import {WiTime9} from 'react-icons/wi'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { urlFor } from 'client';
import imageNotAvailable from 'assets/images/image-not-available.jpg';
import './thumbCard.scss';

const ThumbCard = ( post ) => {

  const {data} = post;
  console.log(data)
   dayjs.extend(relativeTime);
   const timeFromNow = dayjs(data._createdAt).fromNow();
  return (
    <div
      // className="app__thumbCard"
      className="bg-white w-64 h-64 relative overflow-hidden px-2.5 pb-6 bg-white shadow-lg cursor-pointer transition ease-in duration-200  mx-2 mb-6 rounded hover:shadow-[0_25px_20px_-20px_rgba(0, 0, 0, 0.45)] hover:translate-y-[-3px]"
    >
      <div className="app__thumbCard-container mb-3.5">
        <Link to={`/posts/${data.category?.name}/${data.title}/${data._id}`}>
          <div
            // className="app__thumbCard-img"
            className="h-44 relative flex justify-center items-center overflow-hidden border border-solid border-white bg-slate-50"
          >
            {data.images[0] ? (
              <div>
                <img src={urlFor(data?.images[0])} alt="" />
              </div>
            ) : (
              <div>
                <img src={imageNotAvailable} alt="" />
              </div>
            )}
          </div>

          <div
            // className="app__thumbCard-details"
            className="flex flex-row items-center justify-between"
          >
            <h3
              //  className="app__thumbCard-title"
              className="my-2.5 overflow-hidden text-ellipsis whitespace-nowrap pr-8"
            >
              <span
                //  className="app__thumbCard-title-category"
                className="text-base font-semibold"
              >
                [{data.category.title}]
              </span>
              <span className="ml-1.5 text-base">{data.title}</span>
            </h3>
            {data.price ? (
              <div
                // className="app__thumbCard-price"
                className="absolute top-28 left-0 flex z-3 flex-col justify-center w-auto h-11 pt-3 pr-3 pb-2.5 pl-5 rounded-r bg-black opacity-70 overflow-hidden whitespace-nowrap text-ellipsis text-sm"
              >
                <span className="text-white text-xl">
                  <span className="float-left mr-1 text-rose-500 text-sm">
                    $
                  </span>
                  {data.price}
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
          <p className="flex items-center overflow-hidden text-gray-500">
            <WiTime9 /> <span className="ml-1.5">{timeFromNow}</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ThumbCard;
