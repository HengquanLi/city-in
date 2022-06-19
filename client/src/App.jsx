import { client } from 'client';
import { Categories, Header, PostDetail, Topbar } from 'components';
import { LandPage, ListPage, PostList, PostPage } from 'pages/';
import Test from 'pages/creatPostPage/Test';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { getAllPosts } from 'utils/data';
import './app.scss';

const App = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    // const query =
    //   '*[_type == "posts"] | order(_createdAt desc) {category->{name,title,description},price,description,image,postedBy,title,_createdAt,_id}';
    client.fetch(getAllPosts).then((data) => {
      setAllPosts(data);
      setIsLoading(false);
      console.log(data);
    });
  }, []);

  return (
    <Router>
      {/* <PaginatedItems itemsPerPage={4}/> */}
      <Topbar />
      <Header
        allPosts={allPosts}
        setAllPosts={setAllPosts}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <div className="app__main-container">
        <Categories />
        <Routes>
          <Route
            path="/"
            element={<PostList allPosts={allPosts} isLoading={isLoading} />}
          />
          <Route path="/categories/:catetoryId/posts" element={<ListPage />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/creat-new" element={<LandPage />} />
          <Route path="/posts/creat-new/:catetoryId" element={<Test />} />
          <Route
            path="/posts/"
            element={<PostPage allPosts={allPosts} isLoading={isLoading} />}
          />
        </Routes>
        {/* <DeleteDoc /> */}
      </div>
    </Router>
  );
};

export default App;
