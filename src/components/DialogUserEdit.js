import React,{ useState }  from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Axios from 'axios';
import {Link,useLocation} from 'react-router-dom';



function DialogUserEdit(props) {
    let location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [dopen, setDopen] = React.useState(false);
    const [type, setType] = React.useState(props.state.types);
    const [username, setUsername] = React.useState(props.state.username);
    const [password, setPassword] = React.useState(props.state.password);
    const [address, setAddress] = React.useState(props.state.address);
    const [hash_keys, setHash_keys] = React.useState(props.state.hash_keys);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        Linear();

    };
    const Linear = (bools) => {
       setDopen(bools);
    }
    const handleChange = (event) => {
        setType(event.target.value);
    };
    const UpdateUser = () => {
        const data = {
            username: username,
            password: password,
            address: address,
            hash_keys: hash_keys,
            types: type
        };
        Axios({

            // Endpoint to send files
            url: `http://localhost:5000/api/v1/users/${props.state.id}`,
            method: "PUT",
            headers: {
                // Add any auth token here
                authorization: "your token comes here",
            },
            // Attaching the form data
            data: data,
        })
            // Handle the response from backend here
            .then((res) => {
                setTimeout(() => {
                    Linear(true);
                }, 0); 
                setTimeout(() => {
                    Linear(false);
                }, 3000);
                
                window.location.href = "/user"; 
            })
            // Catch errors if any
            .catch((err) => { });
    }
    return (
        <div>
            <button className="btn btn-success btn-lg px-3" variant="outlined" onClick={handleClickOpen}>
                Edit User
            </button>
            <Dialog open={dopen} onClose={Linear}>
                <DialogContent>
                    กำลังดำเนินการ ....
                    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress color="success" />
                    </Stack>
                </DialogContent>
            </Dialog>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add User Mapping</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <div className="row">
                        <div className="form-group col-md-12 mb-3">
                            <TextField className='input' id="standard-basic" label="Username" 
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }} variant="standard" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-12 mb-3">
                            <TextField className='input' id="standard-basic" type="password" label="Password" 
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            variant="standard" />
                        </div>
                    </div>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type Row</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Type Row"
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>Customer</MenuItem>
                                <MenuItem value={1}>Admin</MenuItem>
                                <MenuItem value={2}>Brun</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={address}
                            onChange={(event) => {
                                setAddress(event.target.value);
                            }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Hash Key"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={hash_keys}
                            onChange={(event) => {
                                setHash_keys(event.target.value);
                            }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={UpdateUser}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogUserEdit;

