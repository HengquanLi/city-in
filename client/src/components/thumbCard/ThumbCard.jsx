import React from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from 'client';
import './thumbCard.scss';

const ThumbCard = ({ post }) => {
  // console.log(post)
  return (
    <div className="app__thumbCard">
      <div className="app__thumbCard-container">
        <Link to={`/posts/${post._id}`}>
          <div className="app__thumbCard-img">
            {post?.image ? (
              <div className="app__card-img">
                <img src={urlFor(post?.image)} alt="" />
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="app__thumbCard-details">
            <h3 className="app__thumbCard-title">
              <span className="app__thumbCard-title-category">
                [{post?.category?.title}]
              </span>
              <span className="app__thumbCard-title-title">{post.title}</span>
            </h3>
            {post?.price ? (
              <div className="app__thumbCard-price">
                <span className="app__thumbCard-value">
                  <span className="app__thumbCard-currency">$</span>
                  {post.price}
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ThumbCard;
