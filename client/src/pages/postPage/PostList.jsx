import { NoPost, Pagination, Spinner, ThumbCard } from 'components';
import './postList.scss';

const PostList = ({ allPosts, isLoading }) => {
  return (
    <div
      // className="app__postlist-card"
      className="mb-10 flex flex-row flex-wrap content-start justify-center"
    >
      {isLoading ? (
        <Spinner />
      ) : allPosts.length > 0 ? (
        <>
          <Pagination
            data={allPosts}
            RenderComponent={ThumbCard}
            buttonConst={3}
            contentPerPage={16}
            siblingCount={1}
          />
        </>
      ) : (
        <NoPost />
      )}
    </div>
  );
};

export default PostList;
