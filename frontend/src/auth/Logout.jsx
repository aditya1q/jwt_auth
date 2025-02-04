import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('auth-token'); // Remove token from cookie
        navigate('/sign-in'); // Redirect to sign-in page
    };

    return (
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
            Logout
        </button>
    );
};

export default Logout;
