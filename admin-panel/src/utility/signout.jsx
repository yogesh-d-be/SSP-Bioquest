import { message } from "antd";
import { logout } from "../services/services"; // Backend API call
import { useDispatch } from "react-redux";
import { clearTokens } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const useSignOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOut = async () => {
        try {
   
            const response = await logout();

            if (response.data.success) {
        
                dispatch(clearTokens());
                message.success("Logout successfully");
                navigate('/');
            }
        } catch (error) {
            message.error(error?.response?.data?.message || "Logout failed");
        }
    };

    return signOut;
};

export default useSignOut;
