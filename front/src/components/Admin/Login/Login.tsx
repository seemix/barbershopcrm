import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import Container from '@mui/material/Container';

import { login } from '../../../store/auth';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const Login = () => {
    const sendForm = (data: any) => {
        dispatch(login(data));
    };
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useAppDispatch();
    const response = useAppSelector(state => state.authStore);
    return (
        <div style={{ backgroundColor: '#fcf9f5' }}>
            <div>
                <Container maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h2" variant="h5">
                            Sign in
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <form onSubmit={handleSubmit((data) => sendForm(data))}>
                                <TextField
                                    margin={'normal'}
                                    label={'Email Address'}
                                    variant={'outlined'}
                                    fullWidth
                                    autoComplete="email"
                                    {...register('email', {
                                        required: 'This field is required'
                                    })}
                                    error={!!errors.email}
                                    //  helperText={errors?.email ? errors.email.message : null}
                                />
                                <TextField
                                    margin={'normal'}
                                    label={'Password'}
                                    variant={'outlined'}
                                    fullWidth
                                    type={'password'}
                                    autoComplete="password"
                                    {...register('password', {
                                        required: 'This field is required'
                                    })}
                                    error={!!errors.password}
                                    //  helperText={errors?.password ? errors.password.message : null}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >Войти
                                </Button>
                            </form>
                            <Grid container>
                                <Grid item xs>
                                    {/*<Link href="#" variant="body2">*/}
                                    {/*    Forgot password?*/}
                                    {/*</Link>*/}
                                </Grid>
                                <Grid item>
                                    <Link to={'/register'}> <Button variant={'text'}>регистрация</Button> </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
                {response.status === 'error' || response.error ?
                    <Alert severity="error">Bad login or password! {response.error}</Alert> : ''}
                {response.auth ? <Navigate to={'/admin'}/> : ''}
            </div>
        </div>
    );
};
export default Login;