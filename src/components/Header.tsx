import React from 'react';
import { Download, Sun, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onOpenHelp: () => void;
  onOpenOfflineExport: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: 'normal' | 'grande' | 'gigante';
  setFontSize: (size: 'normal' | 'grande' | 'gigante') => void;
  onResetView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHelp,
  onOpenOfflineExport,
  highContrast,
  toggleHighContrast,
  fontSize,
  setFontSize,
  onResetView
}) => {
  return (
    <header className={`w-full sticky top-0 z-40 transition-colors border-b ${
      highContrast 
        ? 'bg-black text-white border-yellow-400' 
        : 'bg-[#1C1713]/95 backdrop-blur-md text-[#F4ECE1] border-[#382B21]'
    }`}>
      {/* Decorative Andean pattern accent stripe */}
      <div className="andean-border-pattern h-1.5 w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element brand wordmark */}
        <button 
          onClick={onResetView}
          className="text-left group flex items-center gap-3 cursor-pointer focus:outline-none"
          title="Ir al inicio - Buscador de Compromisos"
        >
          <div className="w-10 h-10 rounded-xl bg-[#9B2226] text-white flex items-center justify-center font-bold text-xl shadow-md border border-[#E07A5F]/40 group-hover:scale-105 transition-transform">
            CA
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-amber-400 leading-tight">
              CEDEP Ayllu
            </h1>
            <p className="text-xs text-[#A89481] font-medium hidden sm:block">
              Escuela de Líderes · Pasantía Comunitaria
            </p>
          </div>
        </button>

        {/* Zone 2: Navigation links / Quick access */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button 
            onClick={onResetView}
            className="text-[#C8B6A2] hover:text-amber-300 transition-colors cursor-pointer"
          >
            Buscador Mágico
          </button>
          <a 
            href="#territorios-seccion" 
            className="text-[#C8B6A2] hover:text-amber-300 transition-colors"
          >
            Los 8 Territorios
          </a>
          <button
            onClick={onOpenHelp}
            className="text-[#C8B6A2] hover:text-amber-300 transition-colors cursor-pointer"
          >
            ¿Cómo Usar la Guía?
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Accessibility + Offline USB Download) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Contrast Mode Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all border ${
              highContrast 
                ? 'bg-yellow-400 text-black border-yellow-300 shadow-md' 
                : 'bg-[#292019] text-[#E0D0BE] border-[#48382C] hover:border-amber-500/50 hover:bg-[#342921]'
            }`}
            title="Cambiar a Modo Alto Contraste Solar"
          >
            <Sun className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Alto Contraste</span>
          </button>

          {/* Font Size Selector with Dark Tabs */}
          <div className="hidden md:flex items-center border border-[#48382C] bg-[#241C16] rounded-xl p-1 text-xs font-semibold">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                fontSize === 'normal' ? 'bg-[#9B2226] text-white shadow-xs' : 'text-[#A89481] hover:text-white'
              }`}
              title="Letra Normal"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('grande')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                fontSize === 'grande' ? 'bg-[#9B2226] text-white shadow-xs' : 'text-[#A89481] hover:text-white'
              }`}
              title="Letra Grande"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('gigante')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                fontSize === 'gigante' ? 'bg-[#9B2226] text-white shadow-xs' : 'text-[#A89481] hover:text-white'
              }`}
              title="Letra Gigante"
            >
              A++
            </button>
          </div>

          {/* Single File HTML Export for Rural / Offline use */}
          <button
            onClick={onOpenOfflineExport}
            className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#005F73] hover:bg-[#0A9396] transition-all flex items-center gap-2 shadow-md active:scale-95 whitespace-nowrap cursor-pointer border border-[#0A9396]/50"
            title="Guardar archivo para USB sin Internet"
          >
            <Download className="w-4 h-4" />
            <span className="hidden xs:inline">Descargar para USB</span>
          </button>
        </div>
      </div>
    </header>
  );
};
