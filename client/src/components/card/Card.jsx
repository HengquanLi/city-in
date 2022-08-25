import imageNotAvailable from 'assets/images/image-not-available.jpg';
import noImage from 'assets/images/light-gray-color-solid-background-1920x1080.png';
import { urlFor } from 'client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { WiTime9 } from 'react-icons/wi';
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import './card.scss';

const Card = (props) => {
  console.log(props)
  const { data: post } = props;
  dayjs.extend(relativeTime);
  const timeFromNow = dayjs(post._createdAt).fromNow();
  return (
    <div className="app__card">
      <Link
        to={`/posts/${post.category.name}/${post.title}/${post._id}`}
        className="relative flex border-b border-solid border-[#eeeff2]"
      >
        {post.images[0] ? (
          <div className="w-[120px] h-[60px] rounded m-auto rounded-lg">
            <img
              src={urlFor(post?.images[0])}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ) : (
          <div className="inline-block w-[120px] h-[60px] bg-[#F6F7F9] rounded-lg m-auto"></div>
        )}
        <div className="flex justify-between w-full">
          <div className="flex flex-col py-3 pl-3 w-28">
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
          <div className="flex flex-[0_0_125px] flex-col py-3 mt-1.5 pr-3 justify-between">
            {post.price ? (
              <div className="mb-2.5 text-stone-800 flex items-center justify-end">
                <span className="text-base font-semibold">$ {post?.price}</span>
              </div>
            ) : (
              ''
            )}

            {/* add new content in furture */}
            <div className="mt-auto mb-2.5"></div>
            <p className="flex justify-end items-center text-gray-500">
              {' '}
              <WiTime9 />
              <span className="ml-1.5 text-sm">{timeFromNow}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
