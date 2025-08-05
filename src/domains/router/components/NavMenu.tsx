

const NavMenu = ({ sideMenuOpen, setSideMenuOpen }: { sideMenuOpen: boolean, setSideMenuOpen: (open: boolean) => void }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setSideMenuOpen(false)}>
            <div
                className={`w-80 h-full bg-white/95 backdrop-blur-sm p-6 shadow-xl transform transition-transform duration-300 ease-in-out ${sideMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">B</span>
                    </div>
                    <div>
                        <h1 className="text-amber-900 font-bold">BEGO</h1>
                        <p className="text-amber-800 text-sm">MENTAL RESET</p>
                    </div>
                </div>

                <nav className="space-y-4">
                    <a
                        href="#"
                        className="block text-gray-700 hover:text-amber-800 py-3 px-2 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                        Inicio
                    </a>
                    <a
                        href="#"
                        className="block text-gray-700 hover:text-amber-800 py-3 px-2 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                        Cuenta de membresía
                    </a>
                    <a
                        href="#"
                        className="block text-gray-700 hover:text-amber-800 py-3 px-2 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                        Blog e Instrucciones
                    </a>
                    <a href="#" className="block text-amber-800 font-medium py-3 px-2 rounded-lg bg-amber-100">
                        Neurodespertar
                    </a>
                    <a
                        href="#"
                        className="block text-gray-700 hover:text-amber-800 py-3 px-2 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                        Neuropausa
                    </a>
                    <a
                        href="#"
                        className="block text-gray-700 hover:text-amber-800 py-3 px-2 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                        Reprogramación nocturna
                    </a>
                    <a
                        href="#"
                        className="block text-gray-700 hover:text-amber-800 py-3 px-2 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                        Respiraciones conscientes
                    </a>
                    <a
                        href="#"
                        className="block text-gray-700 hover:text-amber-800 py-3 px-2 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                        Reto 21 Días
                    </a>
                </nav>
            </div>
        </div>
    )
}

export default NavMenu;