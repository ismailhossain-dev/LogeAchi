"use client";
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useSession } from 'next-auth/react';
import React from 'react';

const dashboardMyProfilePage = () => {
    const {data:session , status} = useSession();
    const axiosSecure = useAxiosSecure()

    if(status === "loading") return <p>Loading...</p>

    console.log(session.user);



    
    return (
        <div className='text-white'>
            myprofile
        </div>
    );
};

export default dashboardMyProfilePage;