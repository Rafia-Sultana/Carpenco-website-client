
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAdmin from '../Hooks/useAdmin'

const AddAdmin = () => {

    const [user, setUser] = useState([])
    const [admin] = useAdmin(user)
    useEffect(() => {
        fetch(`https://peaceful-sea-40105.herokuapp.com/alluser`)
            .then(res => res.json())
            .then(data => setUser(data))
    })

    const makeAdmin = (email) => {
        fetch(`https://peaceful-sea-40105.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('faild to make an admin')
                }
                res.json()
            })
            .then(dt => {
                toast.success('Successfully made an admin')

                // if (dt.modifiedCount > 0) {
                //     // refetch()
                //     toast.success(Successfully made an admin)
                // }
            })
    }



    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((u, index) => {
                                return <tr key={u._id}>
                                    <th>{index + 1}</th>
                                    <td>{u.email}</td>
                                    <td>
                                        <button onClick={() => makeAdmin(u.email)} disabled={u.role === 'admin' ? true : false} class="btn btn-success btn-xs">Admin</button>
                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddAdmin;