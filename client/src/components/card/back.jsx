import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../../client';
import './card.scss';

const Card = (props) => {
  const { post } = props;
  console.log(post.image);
  return (
    <div className="app__card">
      <Link to={`/posts/${post._id}`} className="app__card-link">
        {post?.image ? (
          <div className="app__card-image-wrapper">
            <img src={urlFor(post?.image)} alt="" />
          </div>
        ) : (
          ''
        )}
        <div className="app__card-details">
          <div className="app__card-top">
            <div className="app__card-title">{post.title}</div>
            <p className="app__card-description">{post.description}</p>
          </div>
          <div className="app__card-bottom">
            {post.price ? (
              <div className="app__card-bottom-price">价格：${post.price}</div>
            ) : (
              ''
            )}
            {/* <div className="app__card-bottom-price">价格：${post.price}</div> */}
            <div className="app__card-bottom-price">
              联系人：{post.postedBy}
            </div>
            <div className="app__card-bottom-date">
              {dayjs(post._createdAt).format('YYYY-MM-DD')}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;

