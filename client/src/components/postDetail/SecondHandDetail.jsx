import { client, urlFor } from 'client';
import { Spinner } from 'components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { WiTime9 } from 'react-icons/wi';
import { useParams } from 'react-router-dom';
import { useGetPostById } from 'utils/data';
import { formatPhone } from 'utils';

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
              <div className="image-container">
                <img
                  src={urlFor(post.images && post.images[index])}
                  className="rounded-2xl bg-white w-[600px] h-[600px] cursor-pointer transition duration-300 ease-in-out hover:bg-rose-500"
                />
              </div>
              <div className="flex gap-2.5 mt-5">
                {post.images?.map((item, i) => (
                  <img
                    key={i}
                    src={urlFor(item)}
                    className={
                      i === index
                        ? 'rounded-lg bg-rose-500 w-14 h-14 cursor-pointer transition duration-300 ease-in-out'
                        : 'rounded-lg bg-white w-14 h-14 cursor-pointer'
                    }
                    onMouseEnter={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col mt-5 mb-16 justify-between flex-1">
              <div className="mt-5 flex flex-col items-start">
                <div className="text-2xl border-b-2 w-full">{post.title}</div>
                <div className="mt-5 text-lg">Details: </div>
                <p className="mt-2.5 text-2xl border-b-2 w-full">
                  {post.description}
                </p>
                <p className="font-bold text-2xl mt-7 text-rose-500">
                  ${post.price}
                </p>
              </div>
              <div className="flex justify-between w-full">
                <div>
                  <div className="text-sm font-semibold">Contact: </div>
                  <div>{post.postedBy.userName}</div>
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
