import { urlFor } from 'client';
import TextTruncate from 'react-text-truncate';
import dayjs from 'dayjs';
import { WiTime9 } from 'react-icons/wi';
import relativeTime from 'dayjs/plugin/relativeTime';
import imageNotAvailable from 'assets/images/image-not-available.jpg';
import { Link } from 'react-router-dom';
import './card.scss';

const Card = (props) => {
  // console.log(props)
  const { data: post } = props;
  dayjs.extend(relativeTime);
  const timeFromNow = dayjs(post._createdAt).fromNow();
  return (
    <div className="app__card">
      <Link to={`/posts/${post._id}`} className="app__card-link">
        {post?.image ? (
          <div className="app__card-image-wrapper">
            <div className="app__card-image-wrapper-main">
              <img
                src={urlFor(post?.image)}
                alt=""
                className="app__card-image-thumb"
              />
            </div>
          </div>
        ) : (
          <div className="app__card-image-wrapper">
            <div className="app__card-image-wrapper-main">
              <img
                src={imageNotAvailable}
                alt=""
                className="app__card-image-thumb"
              />
            </div>
          </div>
        )}
        <div className="app__card-main-content">
          <p className="app__card-title">
            <span className="app__card-title-span">{post.title}</span>
          </p>
          <div className="app__card-description">
            <TextTruncate
              line={4}
              element="span"
              truncateText="…"
              text={post?.description}
            />
          </div>
        </div>
        <div className="app__card-right-content">
          {post.price ? (
            <div className="app__card-right-price">
              <span className="app__card-right-price-span">
                $ {post?.price}
              </span>
            </div>
          ) : (
            ''
          )}

          {/* add new content in furture */}
          <div className="app__card-right-oc"></div>
          <p className="app__card-right-time">
            {' '}
            <WiTime9 />
            <span className="card-right-time-text">{timeFromNow}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
