import React from 'react';
import { TERRITORIOS, TerritorioInfo, Participant } from '../data/participants';
import { AndeanArtwork } from './AndeanArtwork';
import { 
  Users, 
  ChevronRight, 
  MapPin, 
  Sparkles, 
  Droplets, 
  Mountain, 
  Trees, 
  Sun, 
  Sprout 
} from 'lucide-react';

interface TerritoryGridProps {
  onSelectTerritorio: (territorio: TerritorioInfo) => void;
  participants: Participant[];
  highContrast: boolean;
}

export const TerritoryGrid: React.FC<TerritoryGridProps> = ({
  onSelectTerritorio,
  participants,
  highContrast
}) => {
  // Helper to get matching icon
  const renderTerritoryIcon = (icono: string) => {
    switch (icono) {
      case 'corn':
      case 'sprout':
        return <Sprout className="w-8 h-8 text-amber-300" />;
      case 'waves':
      case 'droplet':
        return <Droplets className="w-8 h-8 text-sky-300" />;
      case 'mountain':
        return <Mountain className="w-8 h-8 text-emerald-300" />;
      case 'trees':
        return <Trees className="w-8 h-8 text-green-300" />;
      case 'sun':
        return <Sun className="w-8 h-8 text-orange-300" />;
      case 'users':
      default:
        return <Users className="w-8 h-8 text-rose-300" />;
    }
  };

  return (
    <section id="territorios-seccion" className="w-full max-w-7xl mx-auto my-8 sm:my-14 px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#3B2C21]">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">
            <MapPin className="w-4 h-4" />
            <span>Navegación Visual por Territorios</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FFFDF8] mt-1">
            Los 8 Territorios de la Escuela
          </h3>
          <p className="text-sm sm:text-base text-[#B8A490] mt-1">
            Toca cualquiera de los territorios para ver los compromisos de todos sus líderes.
          </p>
        </div>

        <div className="text-sm font-bold text-[#A89481]">
          Total: <strong className="text-amber-400 text-lg font-mono">30 Líderes y Lideresas</strong> registrados
        </div>
      </div>

      {/* HUGE VISUAL TOUCH BUTTONS GRID (Dark Theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {TERRITORIOS.map((t) => {
          const count = participants.filter(p => p.territorio === t.nombre).length;
          
          return (
            <button
              key={t.nombre}
              onClick={() => onSelectTerritorio(t)}
              className={`group text-left rounded-3xl p-5 sm:p-6 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] cursor-pointer flex flex-col justify-between relative overflow-hidden min-h-[210px] sm:min-h-[230px] border-2 ${
                highContrast
                  ? 'bg-black text-white border-yellow-400 shadow-lg'
                  : `bg-gradient-to-br ${t.bgGradiente} text-white border-[#4A382B] hover:border-amber-400/80 shadow-lg`
              }`}
            >
              {/* Subtle andean background art */}
              <div className="absolute -right-8 -bottom-8 w-44 h-44 opacity-15 pointer-events-none group-hover:scale-110 transition-transform">
                <AndeanArtwork type="inti" className="w-full h-full text-white" />
              </div>

              {/* Top Row: Icon + Count */}
              <div className="flex items-center justify-between relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20 group-hover:scale-105 transition-transform">
                  {renderTerritoryIcon(t.icono)}
                </div>

                <span className="font-mono text-xs sm:text-sm font-bold bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-amber-200">
                  {count} {count === 1 ? 'Líder' : 'Líderes'}
                </span>
              </div>

              {/* Middle: Territory Name & District */}
              <div className="relative z-10 mt-4 mb-2">
                <h4 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight group-hover:text-amber-200 transition-colors">
                  {t.nombre}
                </h4>
                <p className="text-xs sm:text-sm text-white/75 font-medium mt-0.5 line-clamp-1">
                  {t.region}
                </p>
                <p className="text-xs text-amber-300 font-semibold mt-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span className="truncate">{t.elementoSimbolo}</span>
                </p>
              </div>

              {/* Bottom Action Hint */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-bold text-amber-200/90 group-hover:text-white">
                <span>Ver compromisos</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
