import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="bg-blue-900 h-20 flex items-center justify-center fixed top-0 w-full z-10">
            <Link to="/" className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                One Minute Story
            </Link>

            <ul className='flex gap-10 text-white'>
                <li> 
                    <Link to='/'> Home</Link>
                </li>
                <li> 
                    <Link to='/contact'> Contact</Link>
                </li>
                <li> 
                    <Link to='/sign-in'> Sign-in</Link>
                </li>
            </ul>
        </div>
    );
}

export default Header;
