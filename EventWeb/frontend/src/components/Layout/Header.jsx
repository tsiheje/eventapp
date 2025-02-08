import { Link } from "react-router-dom";

const Header = () => {
    return(
        <div>
            <div>
                EventApp
            </div>
            <div>
                <input type="search" placeholder="rechercher...."/>
            </div>
            <div>
                <div>
                    <Link to='/Evenement'>Evenement</Link>
                    <Link to='/Prestataire'>Prestataire</Link>
                    <Link to='/Service'>Service</Link>
                    <Link to='/Billets'>Billets</Link>
                </div>
            </div>
        </div>
    )
}

export default Header;