import type { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useRouter } from "next/router";
import { Navbar } from "./index";
import { AiOutlineUser as UserIcon } from 'react-icons/ai';
import { MdAlternateEmail as EmailIcon } from 'react-icons/md';
import { RiKey2Line as KeyIcon } from 'react-icons/ri';
import GlowingButton from '../components/buttons/glowingButton/GlowingButton';
import SplashCheckbox from '../components/checkboxes/splashCheckbox/SplashCheckbox';
import Link from "next/link";
import styles from "../styles/Register.module.scss";
import useRegister from "../graphql/hooks/useRegister";
import { useState } from "react";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";


const Register: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const register = useRegister();

    const formik = useFormik({
        initialValues: {
            username: undefined,
            email: undefined,
            password: undefined,
            termsAndServices: 0
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            email: Yup.string().email('Enter a valid email address').required('Email is required'),
            password: Yup.string().min(5, 'Password must be at least 5 characters long').required('Password is required'),
            termsAndServices: Yup.number().oneOf([1], 'Terms and Services must be accepted')
        }),
        onSubmit: (values) => {
            setLoading(true);
            const username = (values.username === undefined)? null : values.username;
            const email = (values.email === undefined)? null : values.email;
            const password = (values.password === undefined)? null : values.password;

            register({ username, email, password })
            .then(success => {
                if (!success) {
                    setLoading(false);
                    formik.setErrors({ username: 'Username already exists' });
                } else {
                    router.push('/activity');
                }
            }).catch(() => {
                setLoading(false);
                formik.setErrors({ username: 'Failed to connect to server' });
            });
        }
    });

    return (
        <div className={styles.context}>
            <LoadingScreen open={loading} />
            <Navbar />
            <div className={styles.container}>
                {/* Form + Header */}
                <div className={styles.formAndHeader}>
                    
                    {/* Header */}
                    <h2 className={styles.header}>
                        Register
                    </h2>

                    {/* Description */}
                    <p className={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                        tellus, luctus nec ullamcorper mattis.
                    </p>

                    {/* Form */}
                    <form className={styles.form} onSubmit={formik.handleSubmit}>

                        {/* Input Group */}
                        <div className={styles.inputGroup}>

                            {/* Username */}
                            <div className={styles.inputWrapper}>
                                <UserIcon />
                                <input
                                    autoComplete="new-password"
                                    placeholder="Username"
                                    className={styles.input}
                                    id="username"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* Email */}
                            <div className={styles.inputWrapper}>
                                <EmailIcon />
                                <input
                                    autoComplete="new-password"
                                    type="email"
                                    placeholder="Email"
                                    className={styles.input}
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* Password */}
                            <div className={styles.inputWrapper}>
                                <KeyIcon />
                                <input
                                    autoComplete="new-password"
                                    type="password"
                                    placeholder="Password"
                                    className={styles.input}
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>

                        </div>
                        
                        {/* Additional buttons */}
                        <div className={styles.additionalButtons}>

                            {/* Remember Me (Checkbox) */}
                            <div>
                                <SplashCheckbox
                                    inputProps={{
                                        id: "termsAndServices",
                                        name: "termsAndServices",
                                        value: formik.values.termsAndServices,
                                        onChange: (event) => {
                                            let value = event.target.checked? 1 : 0;
                                            formik.setValues({
                                                ...formik.values,
                                                termsAndServices: value
                                            });
                                        }
                                    }}
                                    label={
                                        <span>
                                            I have read and agree to the {' '}
                                            <Link href="/termsAndServices">
                                                <span className={styles.termsAndServicesLink}>
                                                    Terms and Services
                                                </span>
                                            </Link>
                                        </span>
                                    }
                                />
                            </div>

                        </div>

                        {/* Validation */}
                        <div className={styles.validation}>
                            <span>
                                { formik.touched.username && formik.errors.username }
                            </span>
                            <span>
                                { formik.touched.email && formik.errors.email }
                            </span>
                            <span>
                                { formik.touched.password && formik.errors.password }
                            </span>
                            <span>
                                { formik.touched.termsAndServices && formik.errors.termsAndServices }
                            </span>
                        </div>

                        {/* Login Button */}
                        <div style={{ marginTop: '50px' }}>
                            <GlowingButton>
                                Register
                            </GlowingButton>
                        </div>
                        
                    </form>

                    {/* Login link */}
                    <div className={styles.loginLinkWrapper}>
                        <span>
                            Already a member? {' '}
                        </span>
                        <Link href="/">
                            <span className={styles.loginLink}>
                                Login
                            </span>
                        </Link>
                    </div>

                </div>
                
            </div>
        </div>
    )
}

export default Register;
