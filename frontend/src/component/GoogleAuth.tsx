
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../Interceptor/AxiosInterceptor";
import { useNavigate } from "react-router-dom";
import google from '../assets/google_PNG19630.png';
import Swal from "sweetalert2";

interface User {
    role: any;
    user_id: string;
    user_name: string;
    user_role: string;
    password: string;
    provider: string | null;
    created_at: string;
    email: string;
}

interface AuthResponse {
    message: string;
    token: string;
    data: {
        role(arg0: string, role: any): unknown;
        user: User;
    };
}
interface gugleAuth{
    name?:string
}
export default (props:gugleAuth) => {
    const navigate = useNavigate();
    const responseGoogle = async (authResult: any) => {
        try {
          


            if (authResult["code"]) {
                console.log("code => ", authResult.code);
                const result = await googleAuth(authResult.code);
                // props.setUser(result.data.data.user);
              
                const userData: AuthResponse = result.data
                localStorage.setItem('name', userData.data.user.user_name);
                localStorage.setItem('user_id', userData.data.user.user_id);
                localStorage.setItem('token', userData.token);
                var role = userData.data.user.user_role;
                localStorage.setItem('role', userData.data.user.user_role);
                navigate(`/${role}/dashboard`);
               
            } else {
                console.log('err => ', authResult);
                // throw new Error(authResult);
                Swal.fire({
                    title: "user not registured!",
                    text: "sign up for an account.",
                    icon: "warning"
                  });
                navigate(`/signup`);
            }
   
        } catch (e) {
            console.log(e);
            Swal.fire({
                title: "user not registured!",
                text: "sign up for an account.",
                icon: "warning"
              });
        
            navigate(`/signup`);
        }
    

    };


    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    return (
        <button
            className="py-5 px-2 space-x-2 flex hover:scale-105 duration-300 "
            onClick={googleLogin}
        >
  <img src={google} alt="Google Logo" style={{ width: '20px', height: '20px' }} />
            <p>{props.name} with Google</p>
        </button>
    );
};