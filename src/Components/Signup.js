import * as React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, TextField, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './Signup.css';
import insta from '../RequiredItems/insta.jpg'
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase';
export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const { signup } = useContext(AuthContext);

    const useStyles = makeStyles({
        text1: {
            color: "gray",
            textAlign: "center"
        },

        card2: {
            height: "5vh",
            marginTop: "2%"
        }
    })
    const classes = useStyles();
    const handleClick = async () => {
        if (file == null) {
            setError('Please upload profile image first.');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        try {
            setError("");
            setLoading(true);
            let userObj = await signup(email, password);
            let uid = userObj.user.uid;
            // console.log(uid);
            
        }
        catch(err) {
            setError(err);
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    }

    return (
        <div className="signupWrapper">
            <div className="signupCard">
                <Card variant="outlined">
                    <div className="insta-logo">
                        <CardMedia
                            component="img"
                            image={insta}
                            alt="green iguana"
                        />
                    </div>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle2">
                            Signup to see photos and videos of your friends
                        </Typography>
                        {error != "" && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense' size="small" value={name} onChange={(e) => setName(e.target.value)} />
                        {/* <lable>
                            <Button size="small" color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CloudUploadIcon />} component="span">Upload Profile Image</Button>
                            <input type="file" accept='image/*' hidden />
                        </lable> */}
                        <label htmlFor="contained-button-file">
                            <input accept="image/*" id="contained-button-file" multiple type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
                            <Button size="small" color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CloudUploadIcon />} component="span">
                                Upload Profile Image
                            </Button>
                        </label>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant='contained' fullWidth={true} disable={loading} onClick={handleClick}>Sign up</Button>
                    </CardActions>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle2">
                            By Signing up you agree to our terms, conditions and Cookies policy.
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" className={classes.card2}>
                    <Typography className={classes.text1} variant="subtitle1">
                        Having an account?<Link to="/login" style={{ textDecoration: "none" }}>Login</Link>
                    </Typography>
                </Card>
            </div>
        </div>
    );
}