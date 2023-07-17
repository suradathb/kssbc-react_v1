import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";

function STOApproveDialog(props) {
  let location = useLocation();
  const [contract, setContract] = React.useState(props.state.contract);
  const [open, setOpen] = React.useState(false);
  const [dopen, setDopen] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    Linear();
  };
  const Linear = (bools) => {
    setDopen(bools);
  };
  const handleChange = (event) => {
    // setType(event.target.value);
  };
  const Approve = () => {
    // console.log(props.state.contract.methods.transfer)
    Linear(true);
    props.state.contract.methods
      .approve(address, amount)
      .send({ from: props.state.account })
      .once("receipt", (receipt) => {
        console.log("ToSusess", address, ":", amount);
        setOpen(false);
        Linear(false);
        window.location.reload();
      })
      .catch((error) => {
        if (error.message.includes("User denied transaction signature")) {
          console.log("Transaction cancelled by user");
          setOpen(false);
          Linear(false);
        } else {
          console.log("Transaction failed with error:", error.message);
          setOpen(false);
          Linear(false);
        }
      });
  };
  return (
    <div>
      <button
        className="btn btn-success btn-lg px-3"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Approve
      </button>
      <Dialog open={dopen} onClose={Linear}>
        <DialogContent>
          กำลังดำเนินการ ....
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="success" />
          </Stack>
        </DialogContent>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Test Approve(spender,amount)</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Spender address"
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
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={Approve}>Approve</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default STOApproveDialog;
