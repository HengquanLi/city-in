import { client } from 'client';
import {
  Categories,
  Header,
  PostDetail,
  Topbar,
  LifeDetail,
  SecondHandDetail,
  JobDetail,
  CarDetail,
  RentDetail,
  InfoDetail,
} from 'components';
import { LandPage, ListPage, PostList } from 'pages';
import PostForm from 'pages/creatPostPage/PostForm';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { getAllPosts } from 'utils/data';
import './app.scss';

import { GoogleOAuthProvider } from '@react-oauth/google';

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
      // console.log(data);
    });
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_CLIENTID}>
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
            <Route
              path="/categories/:catetoryId/posts"
              element={<ListPage />}
            />
            {/* <Route
              path="/posts/:catergory/:title/:id"
              element={<PostDetail />}
            /> */}

            <Route path="/posts/life/:title/:id" element={<LifeDetail />} />
            <Route
              path="/posts/second-hand/:title/:id"
              element={<SecondHandDetail />}
            />
            <Route path="/posts/job/:title/:id" element={<JobDetail />} />
            <Route path="/posts/cars/:title/:id" element={<CarDetail />} />
            <Route path="/posts/rent/:title/:id" element={<RentDetail />} />
            <Route path="/posts/info/:title/:id" element={<InfoDetail />} />

            <Route path="/posts/creat-new" element={<LandPage />} />
            <Route path="/posts/creat-new/:categoryId" element={<PostForm />} />
            {/* <Route
              path="/posts/"
              element={<PostPage allPosts={allPosts} isLoading={isLoading} />}
            /> */}
          </Routes>
          {/* <DeleteDoc /> */}
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
