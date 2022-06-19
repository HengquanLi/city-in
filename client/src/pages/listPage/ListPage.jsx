import {Card,Spinner} from 'components'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useGetPostsByCategory } from 'utils/data';
import { client } from 'client';
import {
  useCapitalizeFirst,
  useDocumentTitle,
  useRouteType,
} from 'utils';
import './listPage.scss';

const ListPage = () => {
  const { catetoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const routeType = useRouteType(2);
  useDocumentTitle(useCapitalizeFirst(catetoryId),false);
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

  return (
    <div className="app__listPage">
      <div className="app__list-left"></div>
      <div className="app__list-right">
        <div className="app__list-right-main">
          {isLoading ? (
            <Spinner />
          ) : (
            posts.map((post, index) => <Card key={index} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
