import React,{useState,useEffect} from "react";
import appwriteservice from '../appwrite/config';
import { Container,Postform } from "../components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Editpost(){

    const [post,setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
       if(slug){
        appwriteservice.getPost(slug)
        .then((post)=>{
            if(post){
                setPosts(post)
            }else{
                navigate('/')
            }
        })
       }
    },[slug,navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <Postform post={post} />
            </Container>

        </div>
    ) : null
}

export default Editpost