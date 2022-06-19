import { NoPost, Spinner, ThumbCard } from 'components';
import './postList.scss';

const PostList = ({ allPosts, isLoading }) => {
  return (
    <div className="app__postlist">
      <div className="app__postlist-card">
        {isLoading ? (
          <Spinner />
        ) : allPosts.length > 0 ? (
          allPosts?.map((post, index) => <ThumbCard key={index} post={post} />)
        ) : (
          <NoPost />
        )}
      </div>
    </div>
  );
};

export default PostList;
