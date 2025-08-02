function Headerpart(){
    return (
        <header className="py-6 px-6 bg-gradient-to-r from-gray-900 to-black">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">F</span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">
                        Foundr<span className="text-cyan-400">Check</span>
                    </h1>
                </div>
            </div>
        </header>
    )
};
export default Headerpart;