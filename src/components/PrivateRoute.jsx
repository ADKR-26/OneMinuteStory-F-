import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {

    const { currentUser } = useSelector((state) => state?.oneMinuteStory?.currentUser?.data);
    return !currentUser?.email ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute