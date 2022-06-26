import React from 'react';
import { Link } from 'react-router-dom';
import {WiTime9} from 'react-icons/wi'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { urlFor } from 'client';
import './thumbCard.scss';

const ThumbCard = ( post ) => {
  const {data} = post;
  // console.log(data)
   dayjs.extend(relativeTime);
   const timeFromNow = dayjs(data._createdAt).fromNow();
  return (
    <div className="app__thumbCard">
      <div className="app__thumbCard-container">
        <Link to={`/posts/${data._id}`}>
          <div className="app__thumbCard-img">
            {data?.image ? (
              <div className="app__card-img">
                <img src={urlFor(data?.image)} alt="" />
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="app__thumbCard-details">
            <h3 className="app__thumbCard-title">
              <span className="app__thumbCard-title-category">
                [{data?.category?.title}]
              </span>
              <span className="app__thumbCard-title-title">{data.title}</span>
            </h3>
            {data?.price ? (
              <div className="app__thumbCard-price">
                <span className="app__thumbCard-value">
                  <span className="app__thumbCard-currency">$</span>
                  {data.price}
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
          <p className="app__thumbCard-right-time">
            <WiTime9 /> <span className="app__thumbCard-right-time-text">{timeFromNow}</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ThumbCard;
