import React, { useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Trash = <FontAwesomeIcon icon={faTrash} />;

const ManageProducts = () => {

    const { user, isLoading } = useAuth();
    const [orders, setOrders] = useState([]);



    useEffect(() => {
        fetch(`http://localhost:5000/services`)
            .then((res) => res.json())
            .then((data) => setOrders(data))

    }, [user?.email]);


    if (isLoading) {
        return <div>
            <div className="text-center">
                <Spinner animation="border" variant="danger" />
            </div>
        </div>
    }


    const handleDeleteUser = id => {
        const proceed = window.confirm('Are you sure, You want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/services/${id}`;
            fetch(url, {
                method: 'DELETE'

            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Deleted sucessfully");
                        const remainingUsers = orders.filter(user => user._id !== id);
                        setOrders(remainingUsers)
                    }
                })
        }
    }


    return (
        <div>
            <h2 className="text-center my-5">Manage Products</h2>

            <div className="container my-5">
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>

                            <th>Product Photo</th>
                            <th>Product Name</th>
                            <th>Short Description</th>
                            <th>Price</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders?.map((order, index) => <tr key={order._id} >




                                <td><img style={{ width: '100px' }} src={order?.image} alt="product" /></td>
                                <td>{order?.title}</td>
                                <td>{order?.description?.substring(0, 100)}...</td>
                                <td>{order?.cost}</td>


                                <td className="text-center"><button onClick={() => handleDeleteUser(order?._id)} className="btn btn-link text-danger">{Trash}</button></td>
                            </tr>

                            )
                        }




                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageProducts;