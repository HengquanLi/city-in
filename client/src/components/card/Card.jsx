import imageNotAvailable from 'assets/images/image-not-available.jpg';
import { urlFor } from 'client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { WiTime9 } from 'react-icons/wi';
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import './card.scss';

const Card = (props) => {
  // console.log(props)
  const { data: post } = props;
  dayjs.extend(relativeTime);
  const timeFromNow = dayjs(post._createdAt).fromNow();
  return (
    <div className="app__card">
      <Link
        to={`/posts/${post._id}`}
        // className="app__card-link"
        className="relative flex bg-gray-50 transition ease-in duration-200 mb-4 rounded border border-solid border-gray-100 hover:shadow-xl hover:translate-y-[-2px]"
      >
        {post?.image ? (
          <div className="w-56 h-40 flex justify-center bg-white p-1 rounded">
            <img
              src={urlFor(post?.image)}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-56 h-40 flex justify-center bg-white p-1 rounded">
            <img
              src={imageNotAvailable}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex justify-between w-full">
          <div className="flex flex-col py-3 pl-5">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis text-base mt-1.5 text-neutral-800">
              <span className="hover:decoration-solid hover:underline font-medium">
                {post.title}
              </span>
            </p>
            <div className="whitespace-pre-line flex-initial overflow-hidden text-ellipsis text-gray-500 mt-1.5 text-sm">
              <TextTruncate
                line={4}
                element="span"
                truncateText="…"
                text={post?.description}
              />
            </div>
          </div>
          <div className="flex flex-[0_0_150px] flex-col py-5 pr-6 justify-between">
            {post.price ? (
              <div className="mb-2.5 text-stone-800 flex items-center justify-end">
                <span className="text-xl font-semibold">$ {post?.price}</span>
              </div>
            ) : (
              ''
            )}

            {/* add new content in furture */}
            <div className="mt-auto mb-2.5"></div>
            <p className="flex justify-end items-center text-gray-500">
              {' '}
              <WiTime9 />
              <span className="ml-1.5">{timeFromNow}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
