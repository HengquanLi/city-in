import { Link } from 'react-router-dom';
const Nopost = () => {
  return (
    <div className="my-10 flex justify-center items-center text-2xl ">
      Nothing yet,{' '}
      <Link
        to="/posts/creat-new"
        className="text-rose-500 font-extrabold hover:underline hover:cursor-pointer"
      >
        PUBLISH
      </Link>{' '}
      the first post!
    </div>
  );
};

export default Nopost;
