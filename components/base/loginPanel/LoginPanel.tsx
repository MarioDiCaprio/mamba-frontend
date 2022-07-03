import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Link from "next/link";
import { AiOutlineUser as UserIcon } from 'react-icons/ai';
import { RiKey2Line as KeyIcon } from 'react-icons/ri';
import styles from "./LoginPanel.module.scss";
import { useRouter } from "next/router";
import useLogin from "../../../graphql/hooks/useLogin";
import LoadingScreen from "../../loadingScreen/LoadingScreen";


/**
 * This is the login panel for the `Base`'s sidebar, which is
 * rendered when the user is not logged in. It contains a login
 * form with a username and a password.
 * @returns The login panel
 */
const LoginPanel: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const login = useLogin();

    const router = useRouter();

    /** Formik object. */
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: (values) => {
            setLoading(true);
            const username = (values.username === '')? null : values.username;
            const password = (values.username === '')? null : values.password;

            login({ username, password }, true)
            .then(success => {
                if (!success) {
                    setLoading(false);
                    formik.setErrors({ username: "Username or Password invalid" });
                } else {
                    router.reload();
                }
            }).catch(() => {
                setLoading(false);
                formik.setErrors({ username: "Failed to connect to server" });
            });
        }
    });

    return (
        <div className={styles.loginPanel}>

                <LoadingScreen open={loading} />

                {/* Header */}
                <h3 className={styles.loginPanelHeader}>
                    Login Now
                </h3>

                {/* Form */}
                <form className={styles.loginForm} onSubmit={formik.handleSubmit}>

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
                            data-test="username"
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
                            data-test="password"
                        />
                    </div>

                    {/* Login Validity */}
                    <div className={styles.loginValidity}>
                        <span>
                            { formik.touched.username && formik.errors.username }
                        </span>
                        <span>
                            { formik.touched.password && formik.errors.password }
                        </span>
                    </div>

                    <hr className={styles.hr}></hr>

                    {/* Login Button */}
                    <button className={styles.loginButton} data-test="login">
                        Login
                    </button>

                    {/* Registration Link */}
                    <Link href="/register">
                        <span className={styles.signupLink}>
                            Sign up instead
                        </span>
                    </Link>
                </form>
            </div>
    );
}

export default LoginPanel;
