import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase";
import { deleteUser, signOutUser, updateUser } from "../../store/action";
import { useNavigate } from "react-router-dom";

import "./profile.scss";

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(
        (state) => state?.oneMinuteStory?.currentUser?.data
    );

    const updateError = useSelector(
        (state) => state?.oneMinuteStory?.updateError
    );

    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const [showUpdated, setShowUpdate] = useState(false);

    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image]);

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({ ...formData, profilePicture: downloadURL })
                );
            }
        );
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(
            updateUser(
                formData.username,
                formData.email,
                formData.profilePicture,
                formData.password,
                currentUser._id
            )
        );

        if (updateError === false) {
            setShowUpdate(true);
        }
        else {
            setShowUpdate(false);
        }

        setTimeout(() => {
            setShowUpdate(false);
        }, 2000);
        // console.log("Form Data", formData);
    };

    const handleDeleteUser = () => {
        dispatch(deleteUser(currentUser._id));
        navigate("/");
    };

    const handleSignout = () => {
        dispatch(signOutUser());
        navigate("/");
    };

    return (
        <section id='profile-jsx'>
            <div className="main-container">
                <h1>
                    Profile
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="file"
                        ref={fileRef}
                        hidden
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <img
                        src={
                            formData.profilePicture ||
                            currentUser.profilePicture
                        }
                        alt="profile"
                        className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                        onClick={() => fileRef.current.click()}
                    />
                    <p className="text-sm self-center">
                        {imageError ? (
                            <span className="text-red-700">
                                Error uploading image (file size must be less
                                than 2 MB)
                            </span>
                        ) : imagePercent > 0 && imagePercent < 100 ? (
                            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
                        ) : imagePercent === 100 ? (
                            <span className="text-green-700">
                                Image uploaded successfully
                            </span>
                        ) : (
                            ""
                        )}
                    </p>
                    <input
                        defaultValue={currentUser.username}
                        type="text"
                        id="username"
                        placeholder="Username"
                        className="bg-slate-100 rounded-lg p-3"
                        onChange={handleChange}
                    />
                    <input
                        defaultValue={currentUser.email}
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="bg-slate-100 rounded-lg p-3"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="bg-slate-100 rounded-lg p-3"
                        onChange={handleChange}
                    />
                    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                        {/* {loading ? "Loading..." : "Update"} */}
                        Update
                    </button>
                </form>
                <div className="flex justify-between mt-5">
                    <span
                        onClick={handleDeleteUser}
                        className="text-red-700 cursor-pointer"
                    >
                        Delete Account
                    </span>
                    <span
                        onClick={handleSignout}
                        className="text-red-700 cursor-pointer"
                    >
                        Sign out
                    </span>
                </div>
                <p className="text-green-700 mt-5">
                    {showUpdated && "Updated Successfully..."}
                </p>

                <p className="text-red-700 mt-5">
                    {updateError &&
                        "Sorry, the username is already in use. Please choose a different username."}
                </p>
            </div>
        </section>
    );
}
