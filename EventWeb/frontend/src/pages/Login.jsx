import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/api/UserService";



const Login = () => {
    const [formData, setFormData] = useState({
        email:'',
        motDePasse: ''
    })

    const handlechange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const navigation = useNavigate()
    const handlesubmit = async(e) => {
        e.preventDefault();
        const response = await UserService.login(formData);
        console.log(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("userRole", response.type);
        navigation('/', {state: {user: response.type}})
    }

    
    return (
        <div className="flex min-h-screen">
            <div className="flex w-full">
                <div className="w-1/2 p-8">
                    <div className="mb-6">
                        <Link to='/' className="inline-flex items-center text-gray-600 hover:text-gray-800">
                            <ArrowLeft className="w-6 h-6 mr-2"/>
                            Retour
                        </Link>
                    </div>
                <div>
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold mb-6">Se connecter</h1>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1">Email</label>
                            <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            className="w-full p-2 border rounded"
                            placeholder="entrez votre email"
                            onChange={handlechange}
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Mot de passe</label>
                            <input 
                            type="password"
                            name="motDePasse"
                            value={formData.motDePasse}
                            className="w-full p-2 border rounded"
                            placeholder="entrez votre mot de passe"
                            onChange={handlechange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            onClick={handlesubmit}
                            >
                            Se connecter
                        </button>
                        <div>
                            <p>
                                Si vous n'avez pas encore de compte?
                                <Link to='/Register'>
                                    créer un compte
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="w-1/2 bg-blue-50 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Bienvenue!</h2>
                        <p className="text-gray-600">Nous sommes ravis de vous accueillir sur notre plateforme.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;