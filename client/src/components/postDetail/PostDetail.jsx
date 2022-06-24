import { client, urlFor } from 'client';
import { Spinner } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostById } from 'utils/data';
import './postDetail.scss';

const PostDetail = () => {
  const { id } = useParams();

  // const routeType = useRouteType(1);
  const [isLonding, setIsLonding] = useState(true);
  const [post, setPost] = useState(null);
  const query = useGetPostById(id);

  useEffect(() => {
    // const query = `*[_type == "posts" && _id == '${routeType}']`;
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
          <div className="app__postDetail-item">
            <div className="app__postDetail-item-panel">
              <div className="app__postDetail-item-image-container">
                <div
                  className="app__postDetail-item-image-background"
                  style={{
                    backgroundImage: post?.image
                      ? `url(${urlFor(post?.image)})`
                      : '',
                  }}
                ></div>
                <div className="app__postDetail-item-image-wrapper">
                  {post?.image ? (
                    <img
                      src={urlFor(post?.image)}
                      alt=""
                      className="app__postDetail-item-main-img"
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="app__postDetail-item-detail-container">
                <div className="app__postDetail-item-main-detail">
                  <div className="app__postDetail-item-content">
                    <h1 className="app__postDetail-header">{post?.title}</h1>
                    <div className="app__postDetail-price">
                      <span className="app__postDetail-price-span">
                        $ {post?.price}
                      </span>
                    </div>
                    <div className="app__postDetail-description">
                      <div className="app__postDetail-description-content">
                        <span className="app__postDetail-description-wrapper">
                          {post?.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="app__postDetail-item-other"></div>
              </div>
            </div>
          </div>
          <div className="app__postDetail-item-related"></div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
