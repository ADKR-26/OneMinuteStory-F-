import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { signInStart, signInSuccess, signInFailure } from "../../store/user/userSlice";
// import data from '../../store/'
import { useDispatch, useSelector } from "react-redux";
// import OAuth from "../components/OAuth";

function SignIn() {

    const [formData, setFormData] = useState({});
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const { loading, error } = useSelector((state) => state?.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('http://localhost:3000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            // setLoading(false);

            if (data.success === false) {
                // setError(true);
                dispatch(signInFailure(data));
                return;
            }
            dispatch(signInSuccess(data));

            // if there is no error while signing in then it will navigate to homepage
            navigate('/');
        }
        catch (error) {
            // setLoading(false);
            // setError(true);
            dispatch(signInFailure(error));
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">
                Sign In
            </h1>

            <form 
                // onSubmit={handleSubmit} 
                className="flex flex-col gap-4">

                <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg"
                    // onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg"
                    // onChange={handleChange}
                />

                <button 
                    // disabled={loading} 
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    {/* {loading ? "Loading..." : "Sign In"} */}
                    Sign In
                </button>
                {/* <OAuth /> */}
            </form>
            <div className="flex gap-2 mt-5">
                <p>Don&apos;t Have an account?</p>
                <Link to='/sign-up'>
                    <span className="text-blue-500">Sign Up</span>
                </Link>
            </div>
            {/* <p className="text-red-700 mt-5">
                {error ? error.message || "Something went wrong" : ''}
            </p> */}
        </div>
    )
}

export default SignIn