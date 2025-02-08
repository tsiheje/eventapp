import { Link } from "react-router-dom";
import { Search, User, LogIn, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setShowDropdown(false);
    };

    return (
        <div className="flex items-center justify-between bg-gray-800 py-4 px-8 shadow-lg">
            <div className="text-white text-2xl font-bold">
                <Link to='/' className="hover:text-gray-300 transition-colors">
                    EventApp
                </Link>
            </div>
            <div className="relative">
                <input 
                    type="search" 
                    placeholder="Chercher un événement ou un prestataire..." 
                    className="px-4 py-2 w-[400px] rounded-full pl-10 focus:outline-none"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
            <div className="flex items-center gap-8 text-white">
                <Link to='/Evenement' className="hover:text-gray-300 transition-colors">
                    Événements
                </Link>
                <Link to='/Prestataire' className="hover:text-gray-300 transition-colors">
                    Prestataires
                </Link>
                <Link to='/Service' className="hover:text-gray-300 transition-colors">
                    Services
                </Link>
                <Link to='/Billets' className="hover:text-gray-300 transition-colors">
                    Billets
                </Link>
                <Link>
                    Contact
                </Link>
            </div>
            <div className="relative" ref={dropdownRef}>
                <button 
                    className="text-white hover:text-gray-300 transition-colors flex items-center gap-2"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <User className="h-8 w-8" />
                </button>
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        {isLoggedIn ? (
                            <>
                                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Mon Profil
                                </Link>
                                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Tableau de bord
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Se déconnecter
                                </button>
                            </>
                        ) : (
                            <Link 
                                to="/login" 
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                            >
                                <LogIn className="h-4 w-4" />
                                Se connecter
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;