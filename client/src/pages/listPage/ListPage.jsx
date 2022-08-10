import { client } from 'client';
import { Card, Pagination, Spinner } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCapitalizeFirst, useDocumentTitle } from 'utils';
import { useGetPostsByCategory } from 'utils/data';
import './listPage.scss';

const ListPage = () => {
  const { catetoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const routeType = useRouteType(2);
  useDocumentTitle(useCapitalizeFirst(catetoryId), false);
  const query = useGetPostsByCategory(catetoryId);

  useEffect(() => {
    // const query = `*[_type == "posts" && category._ref in *[_type == "categories" && name == '${routeType}']._id] | order(_createdAt desc)`;
    setIsLoading(true);
    client.fetch(query).then((data) => {
      setPosts(data);
      setIsLoading(false);
      // console.log(data);
    });
  }, [catetoryId]);
const test =true
  return (
    <div className="flex flex-row w-[750px] mx-auto">
      {/* <div className="app__list-left"></div> */}
      <div className="app__list-right flex-1 h-screen relative">
        <div className="app__list-right-main relative h-full">
          {isLoading ? (
            <Spinner />
          ) : (
              <Pagination
                data={posts}
                RenderComponent={Card}
                buttonConst={3}
                contentPerPage={10}
                siblingCount={1}
              />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
