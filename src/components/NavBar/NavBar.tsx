import { Link } from 'react-router-dom';
import "./NavBar.scss";

export function NavBar() {
    return (
        <div>
            <ul className='menu-elemment'>

                <p className='menu'><Link to='/'><img className='logo-img' src='/bookstore.png' /></Link></p>
                <p className='menu'><img className='menu-img' src='/menu.png' /></p>
                <p className='menu'><Link to='/cart'><img className='menu-img' src='/cart.png' /></Link></p>

            </ul>
        </div>
    );
}