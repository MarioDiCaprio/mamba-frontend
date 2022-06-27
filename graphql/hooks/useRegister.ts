import { gql, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setLoginCredentials } from "../../redux/slices/loginCredentialsSlice";
import { LoginRequest, RegisterRequest, RegisterResponse } from "../types";


const REGISTER_GQL = gql`
    mutation Register($request: RegisterRequest) {
        register(request: $request) {
            valid
        }
    }
`;


type RegisterFunction = (request?: RegisterRequest) => Promise<boolean>;


export default function useRegister(): RegisterFunction {
    const dispatch = useDispatch();

    const [register] = useMutation<{ register: RegisterResponse }, { request: RegisterRequest }>(REGISTER_GQL);

    return (request) => {
        return new Promise((resolve, reject) => {
            register({
                variables: { request: request ?? { username: null, email: null, password: null } }
            })
            .then(response => {
                if (response.data?.register.valid) {
                    const newCredentials = { ...(request as LoginRequest), remember: true };
                    dispatch(setLoginCredentials(newCredentials));
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(() => {
                reject();
            })
        });
    }
}
