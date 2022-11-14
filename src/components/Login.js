import React, { Component } from 'react';
import Axios from 'axios';


class Login extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            db_users: [],
            redirect:null
        }

    }
    // getUser() {
    //     Axios.get('http://localhost:5000/api/v1/users').then((response) => {
    //         this.setState({ db_users: response.data });
    //     });
    // }

    LoginCheck() {
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        Axios({

            // Endpoint to send files
            url: `http://localhost:5000/api/v1/users/login`,
            method: "POST",
            headers: {
                // Add any auth token here
                authorization: "your token comes here",
            },
            // Attaching the form data
            data: data,
        })
            // Handle the response from backend here
            .then((res) => {
                console.log(res.data[0].types)
                this.setState({redirect:"/user"});
                
                window.location.href = this.state.redirect;
            })
            // Catch errors if any
            .catch((err) => { });
    }
    render() {
        return (
            <>
                <div className="container py-5">
                    <div className="row py-5">
                        <section className="vh-100">
                            <div className="container-fluid h-custom">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-md-9 col-lg-6 col-xl-5">
                                        <img src="assets/images/login.png"
                                            className="img-fluid" alt="Sample image" />
                                    </div>
                                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                        <form
                                            onSubmit={(event) => {
                                                event.preventDefault();
                                                // console.log(this.state)
                                                this.LoginCheck();
                                            }}
                                        >
                                            {/* <!-- Email input --> */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example3">User Name</label>
                                                <input type="text" id="form3Example3" className="form-control form-control-lg"
                                                    // placeholder="Enter a valid email address"
                                                    value={this.state.username}
                                                    onChange={(e) => {
                                                        this.setState({ username: e.target.value });
                                                    }}
                                                />
                                            </div>

                                            {/* <!-- Password input --> */}
                                            <div className="form-outline mb-3">
                                                <label className="form-label" htmlFor="form3Example4">Password</label>
                                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                                    placeholder="Enter password"
                                                    value={this.state.password}
                                                    onChange={(e) => {
                                                        this.setState({ password: e.target.value });
                                                    }}
                                                />
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center">
                                                {/* <!-- Checkbox --> */}
                                                <div className="form-check mb-0">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        Remember me
                                                    </label>
                                                </div>
                                                <a href="#!" className="text-body">Forgot password?</a>
                                            </div>

                                            <div className="text-center text-lg-start mt-4 pt-2">
                                                {/* <button type="button" type="submit" className="btn btn-primary btn-lg">Login</button> */}
                                                <input
                                                    type="submit"
                                                    value="Login"
                                                    class="btn btn-primary btn-lg"
                                                />
                                                {/* <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                                                    className="link-danger">Register</a></p> */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </>
        );
    }
}



export default Login;