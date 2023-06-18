import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="bg-blue-900 h-20 flex items-center justify-center">
            <Link to="/" className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                One Minute Story
            </Link>
        </div>
    );
}

export default Header;
