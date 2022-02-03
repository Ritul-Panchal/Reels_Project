import React, { useState } from 'react';
import { Alert, Button, LinearProgress } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { v4 as uuidv4 } from 'uuid';
import { database, storage } from '../firebase';

function UploadFile(props) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChange = async (file) => {
        if (file == null) {
            setError('Please select a file first');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        if (file.size / (1024 * 1024) > 100) {
            setError('This video is too big');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        let uid = uuidv4();
        setLoading(true);
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        // fn1 -> progress
        // fn2 -> error 
        // fn3-> success
        uploadTask.on('state_changed', fn1, fn2, fn3);
        function fn1(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }

        function fn2(error) {
            setError(error);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
            return;
        }

        function fn3() {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                console.log(url);
                let obj = {
                    likes: [],
                    comments: [],
                    pId: uid,
                    pUrl: url,
                    uName: props.user.fullname,
                    uProfile: props.user.profileUrl,
                    userId: props.user.userId,
                    createdAt: database.getUserTimeStamp()
                }

                database.posts.add(obj).then(async (ref) => {
                    let res = await database.users.doc(props.user.userId).update({
                        postIds: props.user.postIds != null ? [...props.user.postIds, ref.id] : [ref.id]
                    })
                }).then(() => {
                    setLoading(false);
                }).catch((err) => {
                    setError(err);
                    setTimeout(() => {
                        setError('');
                    }, 2000);
                    setLoading(false);
                })
            })
            // setLoading(false);

        }
    }
    return (
        <div style={{marginTop:'5.5rem', marginBottom:'0.3rem'}} >
            {
                error != '' ? <Alert severity="error">{error}</Alert> :
                    <>
                        <input type="file" accept='video/*' id='upload-input' style={{ display: 'none' }} onChange={(e) => handleChange(e.target.files[0])} />
                        <label htmlFor='upload-input'>
                            <Button
                                variant="outlined"
                                color="secondary"
                                component='span'
                                disabled={loading}
                            >
                                <MovieIcon />&nbsp;Upload Video
                            </Button>
                        </label>
                        {loading && <LinearProgress color="secondary" style={{ marginTop: "3%" }} />}
                    </>
            }
        </div>
    );
}

export default UploadFile;
