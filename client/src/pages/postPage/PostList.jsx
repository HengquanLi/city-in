import { NoPost, Pagination, Spinner, ThumbCard } from 'components';
import './postList.scss';

const PostList = ({ allPosts, isLoading }) => {
  console.log(allPosts);
  return (
    <div className="app__postlist">
      <div className="app__postlist-card">
        {isLoading ? (
          <Spinner />
        ) : allPosts.length > 0 ? (
          <>
            <Pagination
              data={allPosts}
              RenderComponent={ThumbCard}
              buttonConst={3}
              contentPerPage={12}
              siblingCount={1}
            />
          </>
        ) : (
          <NoPost />
        )}
      </div>
    </div>
  );
};

export default PostList;
