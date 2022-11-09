import React from 'react';
import Axios from 'axios';
import SubMenu from "./SubMenu";

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
                        <SubMenu/>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Status</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.db_users.map((val, key) => {
                                    console.log(val.username)
                                    if(val.types == "0")
                                    {
                                    return (
                                        <>
                                            <tr key={val.id}>
                                                <th scope="row">{val.id}</th>
                                                <td>{val.username}</td>
                                                {/* <td>{name.date}</td> */}
                                                <td>
                                                    <input
                                                        type="submit"
                                                        value="อนุมัติ Token"
                                                        className="btn btn-success btn-lg px-3"
                                                    // onClick={this.shoot(this.user[2].address, name.pointtoken)}
                                                    />
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