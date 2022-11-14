import React from 'react';
import Axios from 'axios';
import SubMenu from "./SubMenu";
import { Link } from "react-router-dom";
import DialogUser from './DialogUser';
import DialogUserEdit from './DialogUserEdit';

class ListMapUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            db_users: []
        }
    }
    async componentWillMount() {
        await this.getUser();
    }
    async getUser() {
        Axios.get('http://localhost:5000/api/v1/users').then((response) => {
            // console.log(response.data);
            // this.setState({ db_users: [...this.state.db_users, response.data] });
            this.setState({ db_users: response.data });
        });
    }
    handleClick = (id) => {
        Axios({
            // Endpoint to send files
            url: `http://localhost:5000/api/v1/users/${id}`,
            method: "DELETE",
            headers: {
              // Add any auth token here
              authorization: "your token comes here",
            },
            // Attaching the form data
            data: id,
          })
            // Handle the response from backend here
            .then((res) => { window.location.reload()})
            // Catch errors if any
            .catch((err) => { });
    }
    render() {
        return (
            <>
                <div className="container-fluid bg-light py-5">
                    <div className="col-md-6 m-auto text-center">
                        <h1 className="h1">USER SYSTEM MAP</h1>
                        <div className="input-group mb-3 text-center">
                            <p>
                                admin ที่ถือกระเป๋า token หลักเท่านั้นจะมีสิทธิ์เข้าสู่หน้าสำหรับเพิ่ม Token ให้สมาชิก Type = admin
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
                            {/* <Link className="nav-link btn btn-success btn-lg px-3" to="/approveed">
                                Add User
                            </Link> */}
                            <DialogUser/>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Username</th>
                                    <th scope='col'>Type Row</th>
                                    <th scope='col'></th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.db_users.map((val, key) => {
                                    const num ={
                                        0:"customer",
                                        1:"admin",
                                        2:"brun"
                                    }
                                    if (val.types != "1") {
                                        return (
                                            <>
                                                <tr key={val.id}>
                                                    <th scope="row">{val.id}</th>
                                                    <td>{val.username}</td>
                                                    <td>{num[val.types]}</td>
                                                    <td>
                                                       <DialogUserEdit state = {{
                                                         id: val.id,
                                                         username: val.username,
                                                         password: val.password,
                                                         address: val.address,
                                                         hash_keys: val.hash_keys,
                                                         types: val.types
                                                       }}/>
                                                    </td>
                                                    <td>
                                                    <button className="btn btn-success btn-lg px-3" onClick={() => this.handleClick(val.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default ListMapUser;