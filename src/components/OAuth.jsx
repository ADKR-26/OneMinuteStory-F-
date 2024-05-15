import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';

import { useDispatch } from 'react-redux';
import { signInUserGoogle, signUpUserGoogle } from '../store/action';
import { useNavigate } from 'react-router-dom';
// import { signInSuccess } from '../redux/user/userSlice';


function OAuth(data) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginType = data.data;
    const googleUsed = true;

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const { displayName, email, photoURL } = result.user;

            // console.log(data.data);

            if (loginType === 'signin') {
                dispatch(signInUserGoogle(email, googleUsed));
                navigate('/');          // After login it would navigate to home page
                console.log("signin");
            }
            else {
                dispatch(signUpUserGoogle(displayName, email, photoURL, googleUsed));
                navigate('/');
                console.log('signup');
            }
        }
        catch (error) {

            if (loginType === 'signin') {
                dispatch(signInUserGoogle(error));
                console.log("signin");
            }
            else {
                dispatch(signUpUserGoogle(error));
                console.log('signup');
            }
            console.log("Could not login with google", error);
        }
    }

    return (
        <button
            type="button"
            onClick={handleGoogleClick}
            className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95">
            Continue with Google
        </button>
    )
}

export default OAuth