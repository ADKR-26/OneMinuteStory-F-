import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { signUpUser } from "../../store/action";
// import OAuth from "../components/OAuth";

function SignUp() {

    const [formData, setFormData] = useState({});
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // setLoading(true);
            // setError(false);
            // const res = await fetch('http://localhost:3000/OMS-api/auth/signup', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData),
            // });
            dispatch(signUpUser(formData.username, formData.email, formData.password));
            
            // const data = await res.json();
            // setLoading(false);

            // if (data.success === false) {
            //     setError(true);
            //     return;
            // }

            // will navigate to sign in page after successful sign-up
            navigate('/sign-in');
        }
        catch (err) {
            // setLoading(false);
            // setError(true);
            dispatch(signUpUser(err));
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7"> Sign Up </h1>

            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-4"
            >
                <input type="text" placeholder="Username" id="username" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
                <input type="text" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />
                <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} />

                <button 
                    // disabled={loading} 
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {/* {loading ? "Loading..." : "Sign Up"} */}
                    Sign Up
                </button>
                {/* <OAuth /> */}
            </form>
            
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to='/sign-in'>
                    <span className="text-blue-500">Sign in</span>
                </Link>
            </div>
            {/* <p className="text-red-700 mt-5">{error && "Something went wrong"}</p> */}
        </div>
    )
}

export default SignUp;