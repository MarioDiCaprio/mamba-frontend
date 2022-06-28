import { gql, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setLoginCredentials } from "../../redux/slices/loginCredentialsSlice";
import { LoginRequest, LoginResponse } from "../types";


const LOGIN_GQL = gql`
    mutation Login($request: LoginRequest!) {
        login(request: $request) {
            valid
        }
    }
    
`;


type LoginFunction = (request?: LoginRequest, remember?: boolean) => Promise<boolean>;


export default function useLogin(): LoginFunction {
    const dispatch = useDispatch();

    const [login] = useMutation<{ login: LoginResponse }, { request: LoginRequest }>(LOGIN_GQL);

    return (request, remember) => {
        return new Promise((resolve, reject) => {
            login({
                variables: { request: request ?? { username: null, password: null } }
            })
            .then(response => {
                console.log(response);
                if (response.data?.login.valid) {
                    const newCredentials = { ...(request as LoginRequest), remember };
                    dispatch(setLoginCredentials(newCredentials));
                    resolve(true);
                } else {
                    dispatch(setLoginCredentials({ username: null, password: null, remember: true }));
                    resolve(false);
                }
            })
            .catch(() => {
                reject();
            })
        });
    }
}
