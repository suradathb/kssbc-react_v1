import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function FAQ() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);

    const PRODUCTS = [
        { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
        { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
        { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
        { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
        { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
        { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
    ];
    console.log(PRODUCTS[0].name);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3000/api/user/save', inputs).then(function (response) {
            console.log(response.data);
            navigate('/');
        });

    }
    return (
        <>
            <div className="container-fluid bg-light py-5">
                <div className="col-md-6 m-auto text-center">
                    <h1 className="h1">Create User Bonus Token</h1>
                    <div className="input-group mb-3 text-center">
                        <p>
                        </p>

                    </div>
                </div>
            </div>
            <div className="container py-5">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <table cellSpacing="10">
                            <tbody>
                                <tr>
                                    <th>
                                        <label>Username: </label>
                                    </th>
                                    <td>
                                        <input type="text" name="username" onChange={handleChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label>Password: </label>
                                    </th>
                                    <td>
                                        <input type="text" name="password" onChange={handleChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label>Address: </label>
                                    </th>
                                    <td>
                                        <input type="text" name="address" onChange={handleChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label>Hash Private Key: </label>
                                    </th>
                                    <td>
                                        <input type="text" name="hash_keys" onChange={handleChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label>Types: </label>
                                    </th>
                                    <td>
                                        <input type="text" name="types" onChange={handleChange} />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" align="right">
                                        <button>Save</button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </form>

                </div>
            </div>
        </>
    )
}