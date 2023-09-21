import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';

import { login } from '../../../store/auth';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import logo from '../../Loader/logo.webp';

const Login = () => {
    const sendForm = (data: any) => {
        dispatch(login(data));
    };
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useAppDispatch();
    const response = useAppSelector(state => state.authStore);
    return (
        <div style={{ backgroundColor: '#fcf9f5', height: '100vh' }}>
            <div style={{ height: '40px', width: '100%', backgroundColor: '#1E1E1EFF', marginBottom: '50px' }}></div>
            <Container maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, width: 56, height: 56 }} src={logo}>
                    </Avatar>
                    <Typography component="h4" variant="h6">
                        Вход в админ-панель
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
                                <Link to={'/admin/register'}> <Button variant={'text'}>регистрация</Button> </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {response.status === 'error' || response.error ?
                    <Alert severity="error">{response.error}: Incorrect login or password! </Alert> : ''}
                {response.auth ? <Navigate to={'/admin'}/> : ''}
            </Container>
        </div>
    );
};
export default Login;