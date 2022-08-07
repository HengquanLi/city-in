import { client, urlFor } from 'client';
import { Spinner } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostById } from 'utils/data';
import './postDetail.scss';

const PostDetail = () => {
  const { id } = useParams();

  const [isLonding, setIsLonding] = useState(true);
  const [post, setPost] = useState(null);
  const [index, setIndex] = useState(0);
  const query = useGetPostById(id);

  useEffect(() => {
    // const query = `*[_type == "posts" && _id == '${routeType}']`;
    client.fetch(query).then((data) => {
      setPost(data[0]);
      setIsLonding(false);
      console.log(data)
    });
  }, [query]);
  return (
    <>
      {isLonding ? (
        <div className="app__spinner-container relative mt-24">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="post-detail">
            <div>
              <div className="image-container">
                {post?.images?.map((item,i)=>(
                  <img key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)} />
                ))}
              </div>
            </div>            
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
