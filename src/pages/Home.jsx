import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Postcard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import authService from "../appwrite/auth";

function Home() {
  const [posts, setPosts] = useState([]);
  const authstatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (authstatus) {
      authService.getCurrentUser().then((user) => {
        setCurrentUser(user);
      });
    } else {
      setCurrentUser(null);
    }
  }, [authstatus]);

  if (!loading) {
    return (
      <>
        <div className="flex flex-col min-h-87 mx-auto">
          <div className=" flex-1 mx-auto  w-7xl">
            <div className="text-2xl ml-2 mt-8 mb-3">
              <h1>Trending posts:</h1>
            </div>
            <div className="flex flex-wrap w-[1250px] mx-auto">
              {posts.slice(0, 4).map((post) => (
                <div key={post.$id} className="flex flex-wrap">
                  <Postcard {...post} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col min-h-87 mx-auto ">
          <div className=" flex-1 mx-auto w-7xl">
            <div className="text-2xl ml-2 mt-3 mb-3">
              <h1>Your posts:</h1>
            </div>

            <div className="w-[1250px] mx-auto">
              {authstatus ? (
                <div className="flex flex-wrap">
                  {currentUser &&
                    (posts.filter((post) => post.userId === currentUser.$id)
                      .length === 0 ? (
                      <div className="flex justify-center items-center min-h-[200px]">
                        <h1 className="text-3xl p-4 text-center">
                          No blogs yet- 
                          <Link to="/add-post" className="underline">
                            click here
                          </Link>{" "}
                          to write your first one!
                        </h1>
                      </div>
                    ) : (
                      posts
                        .filter((post) => post.userId === currentUser.$id)
                        .map((post) => (
                          <div key={post.$id} className="flex flex-wrap">
                            <Postcard {...post} />
                          </div>
                        ))
                    ))}
                </div>
              ) : (
                <div className="flex justify-center items-center min-h-[200px]">
                  <h1 className="text-3xl p-4 text-center">
                    <Link to="/login" className="underline">
                      login
                    </Link>{" "}
                    to start writing your own blogs
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="min-h-105 flex items-center justify-center bg-gray-300">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }
}

export default Home;
