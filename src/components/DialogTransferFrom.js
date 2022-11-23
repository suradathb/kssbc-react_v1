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

function DialogTransferFrom(props) {
  let location = useLocation();
  const [contract, setContract] = React.useState(props.state.contract);
  const [open, setOpen] = React.useState(false);
  const [dopen, setDopen] = React.useState(false);
  const [addressfrom, setAddressFrom] = React.useState("");
  const [addressto, setAddressTo] = React.useState("");
  const [amount, setAmount] = React.useState("");

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
  const Transfer = () => {
    Linear(true);
    props.state.contract.methods
      .transferFrom(addressfrom, addressto, amount)
      .send({ from: props.state.account })
      .once("receipt", (receipt) => {
        console.log(
          "ToSusess From",
          addressfrom,
          "To :",
          addressto,
          ": ",
          amount
        );
        setOpen(false);
        Linear(false);
        window.location.reload();
      });
  };
  return (
    <div>
      <button
        className="btn btn-success btn-lg px-3"
        variant="outlined"
        onClick={handleClickOpen}
      >
        TransferFrom
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
        <DialogTitle>Test Transfer From(from,to,amount)</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="From Address"
            type="text"
            fullWidth
            variant="standard"
            value={addressfrom}
            onChange={(event) => {
              setAddressFrom(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="To Address"
            type="text"
            fullWidth
            variant="standard"
            value={addressto}
            onChange={(event) => {
              setAddressTo(event.target.value);
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
          <Button onClick={Transfer}>Transfer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogTransferFrom;
