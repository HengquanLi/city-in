import { client, urlFor } from 'client';
import { Spinner } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostById } from 'utils/data';

const SecondHandDetail = () => {
  const { id } = useParams();

  const [isLonding, setIsLonding] = useState(true);
  const [post, setPost] = useState(null);
  const [index, setIndex] = useState(0);
  const query = useGetPostById(id);

  useEffect(() => {
    client.fetch(query).then((data) => {
      setPost(data[0]);
      setIsLonding(false);
      console.log(data);
    });
  }, [query]);

  return (
    <>
      {isLonding ? (
        <div className="relative mt-24">
          <Spinner />
        </div>
      ) : (
        <div className="app__postDetail">
          <div className="app__postDetail-item">
            <div className="app__postDetail-item-panel">
              {post?.image ? (
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
              ) : (
                ''
              )}

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

export default SecondHandDetail;
