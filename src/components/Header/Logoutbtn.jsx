import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function Logoutbtn(){

    const dispatch = useDispatch()
    const logoutHandler=() =>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
    }
    

    return(
        <button className='inline-block px-6 py-2 sm:bg-stone-200 sm:border sm:border-white
        duration-200 sm:hover:bg-stone-400 hover:cursor-pointer
        rounded-full'
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default Logoutbtn