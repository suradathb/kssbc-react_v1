import React from 'react';
import Axios from 'axios';
import SubMenu from './SubMenu';
import { Link } from "react-router-dom";



class ProductItem extends React.Component {
    async componentWillMount() {
        await this.getProduct();

    }
    async getProduct() {
        Axios.get('http://localhost:5000/api/v1/products').then((response) => {
            // console.log(response.data);
            this.setState({ product: response.data });
        });
    }
    handleClick = (id) => {
        Axios({
            // Endpoint to send files
            url: `http://localhost:5000/api/v1/products/${id}`,
            method: "DELETE",
            headers: {
              // Add any auth token here
              authorization: "your token comes here",
            },
            // Attaching the form data
            data: id,
          })
            // Handle the response from backend here
            .then((res) => { window.location.href = "/product"})
            // Catch errors if any
            .catch((err) => { });
    }
    constructor(props) {
        super(props);
        this.state = {
            product: []
        }
       
    }
    currencyFormat(num) {
        return Intl.NumberFormat().format(num);
    }
    render() {
        return (
            <>
                <div className="container-fluid bg-light py-5">
                    <div className="col-md-6 m-auto text-center">
                        <h1 className="h1">Product Master Setup</h1>
                        <div className="input-group mb-3 text-center">
                            <p>

                            </p>

                        </div>
                    </div>
                </div>
                <div className="container py-5">
                    <div className="row">
                        <div className='col-md-12'>
                            <SubMenu />
                        </div>
                        <div className='col-md-2'>
                            <Link className="nav-link btn btn-success btn-lg px-3" to="/addproduct">
                                Create
                            </Link>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    {/* <th scope="col">No</th> */}
                                    <th scope="col">Item No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Ratting</th>
                                    <th scope='col'></th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.product.map((item, key) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.item_no}</td>
                                                <td>{item.item_name}</td>
                                                <td>{this.currencyFormat(item.price)}</td>
                                                <td>{item.rateing}</td>
                                                <td>
                                                    <Link
                                                        type="submit"
                                                        // value="Edit"
                                                        className="btn btn-success btn-lg px-3"
                                                        to={`/editproduct/${item.id}`}
                                                        state={{
                                                            id: item.id,
                                                            code: item.item_no,
                                                            name: item.item_name,
                                                            des: item.description,
                                                            price: item.price,
                                                            rate: item.rateing
                                                        }}
                                                    >Edit</Link>
                                                </td>
                                                <td>

                                                    <button className="btn btn-success btn-lg px-3" onClick={() => this.handleClick(item.id)}>Delete</button>
                                                    
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}


export default ProductItem;