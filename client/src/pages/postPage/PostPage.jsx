import React from 'react';
import { useDocumentTitle } from 'utils';
import {Spinner,ThumbCard} from 'components'
import './postpage.scss';

const PostPage = ({ allPosts, isLoading }) => {
  useDocumentTitle('首页');
  return (
    <div className="app__postpage">
      <div className="app__postlist">
        <div className="app__postlist-card">
          {isLoading ? (
            <Spinner />
          ) : (
            allPosts?.map((post, index) => (
              <ThumbCard key={index} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
