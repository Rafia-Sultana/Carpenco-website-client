import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import UpdateInfoModal from './UpdateInfoModal';
import { useQuery } from 'react-query'
import Loading from '../Home/Shared/Loading';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const userImg = 'https://i.ibb.co/VWQ68Jd/userImg.png'
    const { displayName, email, photoURL } = user;
    const [myData, setMydata] = useState([])



    const { data, isLoading, refetch } = useQuery('user', () => fetch(`https://peaceful-sea-40105.herokuapp.com/userinfo/${email}`, {
        method: 'GET',

    }).then(res => res.json()))
    console.log(data);
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="flex h-full justify-center items-center">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={user?.photoURL || userImg} alt="img" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Name: {data?.name ? data.name : user.displayName}</h2>
                        <p>Email: {data?.email}</p>
                        <p>Phone: {data?.phone ? data.phone : 'Phone number not available'}</p>
                        <p>Address: {data?.address ? data.address : 'Address not available'}</p>
                        <div className="card-actions">
                            <label htmlFor="my-modal" className="btn btn-primary modal-button">Update Information</label>
                        </div>
                    </div>
                </div>

                <UpdateInfoModal refetch={refetch} />

            </div>
        </div>
    );
};

export default MyProfile;