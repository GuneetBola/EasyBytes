import * as React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(props.show);
  const [firstName, setFirstName] = React.useState(
    props.userData["first_name"]
  );
  const [lastName, setLastName] = React.useState(props.userData["last_name"]);
  const [preferenceOne, setPreferenceOne] = React.useState(
    props.userData["preference_one"]
  );
  const [preferenceTwo, setPreferenceTwo] = React.useState(
    props.userData["preference_two"]
  );
  const [preferenceThree, setPreferenceThree] = React.useState(
    props.userData["preference_three"]
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.show} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h4" align="center">
            Update Profile
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 170 }}></AccountCircleIcon>
          </div>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              margin="normal"
              id="outlined-read-only-input"
              label="User Name"
              defaultValue={props.userData["user_name"]}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <Box
            component="form"
            marginTop={"2ch"}
            sx={{ display: "flex", flexWrap: "wrap" }}
            autoComplete="off"
          >
            <div>
              <TextField
                autoFocus
                margin="normal"
                id="name"
                label="First Name"
                defaultValue={props.userData["first_name"]}
                onChange={(e) =>
                  setFirstName(e.target.value, console.log(firstName))
                }
                variant="filled"
                sx={{ m: 1, width: "25ch" }}
              />
              <TextField
                autoFocus
                margin="normal"
                id="name"
                defaultValue={props.userData["last_name"]}
                onChange={(e) =>
                  setLastName(e.target.value, console.log(lastName))
                }
                label="Last Name"
                variant="filled"
                sx={{ m: 1, width: "25ch" }}
              />
              <TextField
                id="filled-multiline-static"
                label="Preference 1"
                multiline
                rows={2}
                defaultValue={props.userData["preference_one"]}
                onChange={(e) =>
                  setPreferenceOne(e.target.value, console.log(preferenceOne))
                }
                fullWidth
                sx={{ m: 1, width: "51.69ch" }}
                variant="filled"
              />
              <TextField
                id="filled-multiline-static"
                label="Preference 2"
                multiline
                rows={2}
                defaultValue={props.userData["preference_two"]}
                onChange={(e) =>
                  setPreferenceTwo(e.target.value, console.log(preferenceTwo))
                }
                fullWidth
                sx={{ m: 1, width: "51.69ch" }}
                variant="filled"
              />
              <TextField
                id="filled-multiline-static"
                label="Preference 3"
                multiline
                rows={2}
                defaultValue={props.userData["preference_three"]}
                onChange={(e) =>
                  setPreferenceThree(
                    e.target.value,
                    console.log(preferenceThree)
                  )
                }
                fullWidth
                sx={{ m: 1, width: "51.69ch" }}
                variant="filled"
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.toggleShow}>Cancel</Button>
          <Button onClick={props.toggleShow}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
