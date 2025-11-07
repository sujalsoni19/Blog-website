import React,{useState,useEffect} from "react";
import appwriteservice from '../appwrite/config';
import { Container,Postcard } from "../components";

function Allposts(){

    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
      appwriteservice.getPosts([])
      .then((posts)=>{
        if(posts){
            setPosts(posts.documents)
            setLoading(false)
        }
      })  
    },[])

    return !loading ? (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                {posts.map((post)=>(
                    <div key={post.$id} className="p-2 w-1/4">
                        <Postcard {...post} />
                    </div>   
                ))}
                </div>
                
            </Container>
        </div>
    )
    : (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                     <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Loading...
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Allposts