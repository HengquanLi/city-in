import { client, urlFor } from 'client';
import { Spinner } from 'components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { WiTime9 } from 'react-icons/wi';
import { useParams } from 'react-router-dom';
import { formatPhone } from 'utils';
import { useGetPostById } from 'utils/data';

const SecondHandDetail = () => {
  const { id } = useParams();
  const [isLonding, setIsLonding] = useState(true);
  const [post, setPost] = useState(null);
  const [index, setIndex] = useState(0);
  const query = useGetPostById(id);

  dayjs.extend(relativeTime);
  const timeFromNow = dayjs(post?._createdAt).fromNow();

  useEffect(() => {
    client.fetch(query).then((data) => {
      setPost(data[0]);
      setIsLonding(false);
      console.log(data);
    });
  }, [query]);

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: '10px',
    });
  }, [query]);

  return (
    <>
      {isLonding ? (
        <div className="relative mt-24">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="w-3/4 mx-auto gap-16 m-auto mt-16 text-[#324d67] flex">
            <div className="">
              <div className="bg-gray-400 rounded-2xl w-[600px] h-[600px] shadow-lg">
                <img
                  src={urlFor(post.images && post.images[index])}
                  className="rounded-2xl w-full h-full object-cover cursor-pointer transition duration-300 ease-in-out hover:bg-rose-500 "
                />
              </div>
              <div className="flex gap-2.5 mt-5">
                {post.images?.map((item, i) => (
                  <img
                    key={i}
                    src={urlFor(item)}
                    className={
                      i === index
                        ? 'rounded-lg bg-rose-500 w-14 h-14 cursor-pointer transition duration-300 ease-in-out object-cover shadow-lg'
                        : 'rounded-lg w-14 h-14 cursor-pointer object-cover'
                    }
                    onMouseEnter={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col mt-3 mb-16 justify-between flex-1">
              <div>
                <h1 className="font-bold text-2xl text-rose-500">
                  ${post.price}
                </h1>
                <div className="mt-5 flex flex-col items-start">
                  <div className="text-lg font-semibold border-b-1 w-full">
                    {post.title}
                  </div>
                  <p className="mt-5  border-b-1 w-full py-5 whitespace-pre-line">
                    {post.description}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="">
                  <div className="text-sm font-semibold">Contact: </div>
                  <div>{post.contact}</div>
                  <div className="text-sm font-semibold">Phone: </div>
                  <div>{formatPhone(post.postedByNum)}</div>
                </div>
                <div className="flex items-end">
                  <WiTime9 className="flex items-center" />
                  <span className="ml-1 text-sm">{timeFromNow}</span>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="maylike-products-wrapper">
            <h2>You may also like</h2>
            <div className="marquee">
              <div className="maylike-products-container track">
                {products.map((item) => (
                  <Product key={item._id} product={item} />
                ))}
              </div>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default SecondHandDetail;
