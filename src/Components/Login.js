import * as React from 'react';
import {useContext} from 'react';
import { AuthContext } from '../Context/AuthProvider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, TextField, Button } from '@mui/material';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './Login.css';
import insta from '../RequiredItems/insta.jpg'
import bg from '../RequiredItems/dummyPhone.png'
import { Link } from "react-router-dom";
import img1 from '../RequiredItems/img1.jpg'
import img2 from '../RequiredItems/img2.jpg'
import img3 from '../RequiredItems/img3.jpg'
import img4 from '../RequiredItems/img4.jpg'
import img5 from '../RequiredItems/img5.jpg'
export default function Login() {
    const store = useContext(AuthContext);
    console.log(store);
    const useStyles = makeStyles({
        text1: {
            color: "gray",
            textAlign: "center"
        },

        text2: {
            textAlign: "center"
        },

        card2: {
            height: "5vh",
            marginTop: "2%"
        }
    })
    const classes = useStyles();
    return (
        <div className="loginWrapper">
            <div className="imgcar" style={{ backgroundImage: 'url(' + bg + ')', backgroudSize: "cover" }}>
                <div className='car'>
                    <CarouselProvider
                        visibleSlides={1}
                        totalSlides={5}
                        naturalSlideWidth={247}
                        naturalSlideHeight={440}
                        hasMasterSpinner
                        isPlaying={true}
                        infinite={true}
                        dragEnabled={false}
                        touchEnabled={false}
                    >
                        <Slider>
                            <Slide index={0}><Image src={img1}></Image></Slide>
                            <Slide index={1}><Image src={img2}></Image></Slide>
                            <Slide index={2}><Image src={img3}></Image></Slide>
                            <Slide index={3}><Image src={img4}></Image></Slide>
                            <Slide index={4}><Image src={img5}></Image></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>
            <div className="loginCard">
                <Card variant="outlined">
                    <div className="insta-logo">
                        <CardMedia
                            component="img"
                            image={insta}
                            alt="green iguana"
                        />
                    </div>
                    <CardContent>
                        {true && <Alert severity="error">This is an error alert — check it out!</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size="small" />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size="small" />
                        <Typography className={classes.text2} color="primary" variant="subtitle2">
                            Forgot Password?
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant='contained' fullWidth={true}>Login</Button>
                    </CardActions>
                </Card>
                <Card variant="outlined" className={classes.card2}>
                    <Typography className={classes.text1} variant="subtitle1">
                        Don't have an account?<Link to="/signup" style={{textDecoration:'none'}}>Signup</Link>
                    </Typography>
                </Card>
            </div>
        </div>
    );
}