import { client } from 'client';
import {
  CarDetail,
  Categories,
  Footer,
  Header,
  InfoDetail,
  JobDetail,
  LifeDetail,
  RentDetail,
  SecondHandDetail,
  Topbar,
} from 'components';
import { LandPage, ListPage, PostList, SecondHandForm } from 'pages';
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
        <div className="relative">
          <Topbar />
          <Header
            allPosts={allPosts}
            setAllPosts={setAllPosts}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <div className="my-3 mx-auto xl:w-[1280px] ">
            <Categories />
            <div className="min-h-screen">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PostList allPosts={allPosts} isLoading={isLoading} />
                  }
                />
                <Route
                  path="/search"
                  element={
                    <PostList allPosts={allPosts} isLoading={isLoading} />
                  }
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
                {/* <Route
              path="/posts/creat-new/:categoryTitle/:categoryId"
              element={<PostForm />}
            /> */}
                <Route
                  path="/posts/creat-new/second-hand/:categoryId"
                  element={<SecondHandForm />}
                />
                {/* <Route
              path="/posts/"
              element={<PostPage allPosts={allPosts} isLoading={isLoading} />}
            /> */}
              </Routes>
            </div>

            {/* <DeleteDoc /> */}
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
