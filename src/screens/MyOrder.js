import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.length > 0 ? (
                        orderData.map((data, index) => (
                            data.orderData && data.orderData.order_data ? (
                                data.orderData.order_data.slice(0).reverse().map((item, idx) => (
                                    <div key={idx}>
                                        {item.map((arrayData, ind) => (
                                            <div key={ind} className='col-12 col-md-6 col-lg-3'>
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>Quantity: {arrayData.qty}</span>
                                                            <span className='m-1'>Size: {arrayData.size}</span>
                                                            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                ₹{arrayData.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : <p>No orders found</p>
                        ))
                    ) : <p>No orders found</p>}
                </div>
            </div>
            <Footer />
        </div>
    );
}
