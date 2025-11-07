import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, Postcard} from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const authstatus=useSelector(state => state.auth.status)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                setLoading(false)
            }
        })
    }, [])
  

    if(authstatus){

        if(!loading) {
            if (posts.length === 0){
                return (
                    <div className="w-full py-8 mt-4 text-center">
                        <Container>
                            <div className="flex flex-wrap">
                                <div className="p-2 w-full">
                                    <h1 className="text-2xl font-bold hover:text-gray-500">
                                        Start by writing your own blogs
                                    </h1>
                                </div>
                            </div>
                        </Container>
                    </div>
                )
            }else{
                return (
                    <div className='w-full py-8'>
                        <Container>
                            <div className='flex flex-wrap'>
                                {posts.map((post) => (
                                    <div key={post.$id} className='p-2 w-1/4'>
                                        <Postcard {...post} />
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </div>
                )
            }

        }else{
            return(
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
            
    }else{
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to see all posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

}    

export default Home