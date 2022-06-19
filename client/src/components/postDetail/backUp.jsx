import React, { useEffect, useState } from 'react';
import { client, urlFor } from '../../client';
import { useRouteType } from '../../utils';
import Spinner from '../spinner/Spinner';
import './test.scss';

const PostDetail = () => {
  const routeType = useRouteType(1);
  const [isLonding, setIsLonding] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const query = `*[_type == "posts" && _id == '${routeType}']`;
    client.fetch(query).then((data) => {
      setPost(data[0]);
      setIsLonding(false);
    });
  }, []);

  return (
    <>
      {isLonding ? (
        <Spinner />
      ) : (
        <div className="app__postDetail">
          <div className="app__postDetail-item-detail">
            <div className="app__postDetail-title">{post?.title}</div>
            {post?.image ? (
              <div className="app__postDetail-img">
                {' '}
                <img src={urlFor(post?.image)} alt="" />{' '}
              </div>
            ) : (
              ''
            )}
            {/* <img src={urlFor(post?.image)} alt="" /> */}

            <div className="app__postDetail-text">
              <div className="app__postDetail-description">
                {post?.description}
              </div>
              <div className="app__postDetail-price">价格：${post?.price}</div>
              <div className="app__postDetail-postby">
                <span>发布人： {post?.postedBy}</span>
                <span>联系电话： {post?.postedByNum}</span>
                <span>
                  Email： {post?.postedByEmail ? post.postedByEmail : '无'}
                </span>
                <span>
                  微信： {post?.postedByWeixin ? post.postedByWeixin : '无'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
