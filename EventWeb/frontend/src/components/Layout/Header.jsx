import { Link } from "react-router-dom";
import { Search, User, LogIn, LogOut, ChevronDown, ChevronUp } from "lucide-react";
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
                    placeholder="chercher un événement ou un prestataire..." 
                    className="px-4 py-2 w-[360px] rounded-full pl-10 focus:outline-none"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
            <div className="flex items-center gap-6 text-white">
                <Link to='/' className="hover:text-gray-300 transition-colors">
                    Accueil
                </Link>
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
                <Link to='/Contacts' className="hover:text-gray-300 transition-colors">
                    Contacts
                </Link>
            </div>
            <div className="relative" ref={dropdownRef}>
                <button 
                    className="text-white hover:text-gray-300 transition-colors flex items-center gap-1 w-20 h-12 border-2 rounded-full px-2"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <User className="h-8 w-8" />
                    {showDropdown ? (
                        <ChevronUp className="h-8 w-8"/>
                    ) : (
                        <ChevronDown className="h-8 w-8"/>
                    )}
                </button>
                {showDropdown && (
                    <div className="absolute right-0 top-16 w-64 bg-white shadow-lg z-50 rounded">
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
                            <div className="flex flex-col p-2 gap-2">
                                <Link 
                                    to="/register"
                                    className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200 rounded flex items-center gap-2"
                                >
                                    Créer un compte
                                </Link>
                                <div className="border"></div>
                                <Link 
                                    to="/login" 
                                    className="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200 rounded flex items-center gap-2"
                                >
                                    Se connecter
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;