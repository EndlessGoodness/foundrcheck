function Headerpart(){
    return (
        <header className="border-b border-white/10 bg-slate-950/70 px-6 py-5 backdrop-blur">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
                        <span className="text-white font-bold text-lg">F</span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">
                        Foundr<span className="text-cyan-400">Check</span>
                    </h1>
                </div>
                <p className="hidden text-sm text-slate-300 md:block">Startup validation in minutes</p>
            </div>
        </header>
    )
};
export default Headerpart;