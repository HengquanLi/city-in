import { client } from 'client';
import { Card, Pagination, Spinner,NoPost } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCapitalizeFirst, useDocumentTitle } from 'utils';
import { useGetPostsByCategory } from 'utils/data';

const ListPage = () => {
  const { catetoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const routeType = useRouteType(2);
  useDocumentTitle(useCapitalizeFirst(catetoryId), false);
  const query = useGetPostsByCategory(catetoryId);

  useEffect(() => {
    setIsLoading(true);
    client.fetch(query).then((data) => {
      setPosts(data);
      setIsLoading(false);
      // console.log(data);
    });
  }, [catetoryId, query]);
  return (
    <div className="flex flex-row md:w-[750px] mx-auto h-screen px-8 sm:px-16 min-w-0 overflow-hidden">
      <div className="flex-1">
        {posts.length>0 ? (
          <div className="relative h-full">
          {isLoading ? (
            <Spinner />
          ) : (
            <Pagination
              data={posts}
              RenderComponent={Card}
              buttonConst={3}
              contentPerPage={9}
              siblingCount={5}
            />
          )}
        </div>
        ) : <NoPost />}
        
      </div>
    </div>
  );
};

export default ListPage;
