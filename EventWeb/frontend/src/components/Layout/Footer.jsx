const Footer = () => {
    return(
        <div className="flex flex-col">
            <div className="flex items-center justify-center bg-gray-700">
                <p>Evenement</p>
            </div>
            <div className="flex items-center justify-center bg-gray-800">
                <p className="text-sm mb-2 text-white">
                    &copy; {new Date().getFullYear()} Mickaelio. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer;