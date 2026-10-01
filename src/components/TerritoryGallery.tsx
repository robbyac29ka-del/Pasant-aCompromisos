import React, { useState } from 'react';
import { TerritorioInfo, Participant } from '../data/participants';
import { AndeanArtwork } from './AndeanArtwork';
import { 
  ArrowLeft, 
  MapPin, 
  Sparkles, 
  Maximize2,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

interface TerritoryGalleryProps {
  territorio: TerritorioInfo;
  participants: Participant[];
  onBack: () => void;
  onSelectParticipant: (participant: Participant) => void;
  highContrast: boolean;
}

export const TerritoryGallery: React.FC<TerritoryGalleryProps> = ({
  territorio,
  participants,
  onBack,
  onSelectParticipant,
  highContrast
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'presentacion'>('grid');
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const territoryParticipants = participants.filter(p => p.territorio === territorio.nombre);
  const currentLeader = territoryParticipants[activeSlideIndex] || territoryParticipants[0];

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % territoryParticipants.length);
  };

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + territoryParticipants.length) % territoryParticipants.length);
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-6 px-4 sm:px-6 animate-in fade-in duration-200">
      
      {/* Navigation Top Bar with Dark Theme */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="min-h-[50px] px-5 py-2.5 rounded-2xl bg-[#221A14] hover:bg-[#2F241C] border-2 border-[#4A392B] hover:border-amber-400 text-[#F5EBE1] font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 text-sm sm:text-base"
        >
          <ArrowLeft className="w-5 h-5 text-amber-400" />
          <span>Volver a Todos los Territorios</span>
        </button>

        {/* View mode toggle with Dark Tabs */}
        <div className="flex items-center gap-1.5 bg-[#201813] p-1.5 rounded-2xl border border-[#423326] text-xs sm:text-sm font-bold">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              viewMode === 'grid' 
                ? 'bg-[#9B2226] text-white shadow-md' 
                : 'text-[#B8A490] hover:text-white'
            }`}
          >
            Ver Todas las Fichas
          </button>
          <button
            onClick={() => setViewMode('presentacion')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              viewMode === 'presentacion' 
                ? 'bg-[#9B2226] text-white shadow-md' 
                : 'text-[#B8A490] hover:text-white'
            }`}
          >
            Modo Asamblea (Pase Grande)
          </button>
        </div>
      </div>

      {/* Territory Hero Banner */}
      <div className={`w-full rounded-3xl p-6 sm:p-10 mb-8 text-white relative overflow-hidden shadow-2xl border-2 ${
        highContrast
          ? 'bg-black border-yellow-400'
          : `bg-gradient-to-r ${territorio.bgGradiente} border-[#543F30]`
      }`}>
        {/* Background Andean Artwork */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none hidden md:block">
          <AndeanArtwork type="terrazas" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">
            <MapPin className="w-4 h-4 text-amber-300" />
            <span>{territorio.region}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Territorio {territorio.nombre}
          </h2>

          <p className="text-base sm:text-lg text-white/90 mt-2 leading-relaxed">
            {territorio.descripcion}
          </p>

          <div className="mt-4 pt-4 border-t border-white/20 flex flex-wrap items-center gap-4 text-sm font-semibold">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>Símbolo: {territorio.elementoSimbolo}</span>
            </span>
            <span className="bg-black/30 px-3 py-1 rounded-lg border border-white/10 text-white">
              {territoryParticipants.length} Líderes y Lideresas Registrados
            </span>
          </div>
        </div>
      </div>

      {/* MODE 1: GRID OF ALL PARTICIPANTS IN THIS TERRITORY (NO DNI DISPLAYED) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {territoryParticipants.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 shadow-xl border-2 relative overflow-hidden group ${
                highContrast
                  ? 'bg-black text-white border-yellow-400'
                  : 'bg-[#221A14] text-[#F4ECE1] border-[#3E3024] hover:border-amber-500/80 hover:bg-[#271E17]'
              }`}
            >
              {/* Top Andean stripe */}
              <div className="andean-border-pattern h-1.5 w-full absolute top-0 left-0"></div>

              <div>
                {/* Header: Avatar, Name, Verified Badge (NO DNI) */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-[#9B2226] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0 border border-amber-400/40">
                      {p.nombre.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-[#FFFDF8] leading-snug group-hover:text-amber-300 transition-colors">
                        {p.nombre}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#B8A490] font-medium mt-0.5">
                        {p.comunidad}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold bg-[#18130F] px-3 py-1.5 rounded-xl border border-[#4A3A2C] text-amber-300 flex items-center gap-1 shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Acreditado(a)</span>
                  </span>
                </div>

                {/* Role */}
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-[#36271D] border border-amber-900/50 px-2.5 py-1 rounded-lg">
                    {p.cargo}
                  </span>
                </div>

                {/* Commitment Quote */}
                <div className="my-4 p-4 sm:p-5 rounded-2xl bg-[#1A130E] border-l-4 border-amber-500">
                  <p className="font-display text-base sm:text-lg font-bold italic text-[#FDF8F0] leading-relaxed">
                    "{p.compromiso}"
                  </p>
                </div>

                {/* Communal Message in Spanish */}
                <div className="text-xs text-[#A89481] mb-6">
                  <p className="font-semibold italic text-amber-300">
                    "{p.mensajeComunal}"
                  </p>
                  <p className="opacity-80 mt-0.5">
                    Propósito: {p.propositoAccion}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-[#34271D] flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-[#A89481]">
                  {p.ejeTematico}
                </span>

                <button
                  onClick={() => onSelectParticipant(p)}
                  className="min-h-[48px] px-5 py-2.5 rounded-2xl bg-[#9B2226] hover:bg-[#B91C1C] active:scale-95 text-white font-bold flex items-center gap-2 shadow-md text-sm sm:text-base cursor-pointer transition-all border border-amber-400/40"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Ver en Gigante</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODE 2: ASAMBLEA PRESENTATION (Big single card slide - NO DNI) */}
      {viewMode === 'presentacion' && currentLeader && (
        <div className="max-w-4xl mx-auto">
          {/* Slide Navigation Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <button
              onClick={handlePrevSlide}
              className="min-h-[48px] px-4 py-2 rounded-2xl bg-[#221A14] border-2 border-[#4A392B] text-[#F5EBE1] font-bold flex items-center gap-2 shadow-md cursor-pointer hover:bg-[#2D231B]"
            >
              <ChevronLeft className="w-5 h-5 text-amber-400" />
              <span>Anterior</span>
            </button>

            <span className="font-mono text-sm sm:text-base font-bold text-amber-300">
              Líder {activeSlideIndex + 1} de {territoryParticipants.length}
            </span>

            <button
              onClick={handleNextSlide}
              className="min-h-[48px] px-4 py-2 rounded-2xl bg-[#221A14] border-2 border-[#4A392B] text-[#F5EBE1] font-bold flex items-center gap-2 shadow-md cursor-pointer hover:bg-[#2D231B]"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-5 h-5 text-amber-400" />
            </button>
          </div>

          {/* Big Presentation Card */}
          <div className="bg-[#221A14] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-[#5E4735] relative overflow-hidden">
            <div className="andean-border-pattern h-2.5 w-full absolute top-0 left-0"></div>

            <div className="flex items-start justify-between gap-4 border-b pb-4 mb-6 border-[#3D2E22]">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                  {currentLeader.territorio} · {currentLeader.comunidad}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFFDF8] mt-1">
                  {currentLeader.nombre}
                </h3>
                <p className="text-sm sm:text-base font-medium text-amber-200 mt-0.5">
                  {currentLeader.cargo}
                </p>
              </div>

              <div className="bg-[#18130F] px-4 py-2 rounded-xl border border-[#48382C] text-right flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-xs uppercase text-amber-300 font-bold">Acreditado(a)</span>
              </div>
            </div>

            {/* Huge commitment prose */}
            <div className="my-8 p-6 rounded-2xl bg-[#18120D] border-l-8 border-amber-500">
              <p className="font-display text-2xl sm:text-3xl font-bold italic text-[#FDF8F0] leading-snug">
                "{currentLeader.compromiso}"
              </p>
            </div>

            {/* Communal Reflection in Spanish */}
            <div className="bg-[#1B140F] p-4 rounded-2xl border border-[#3E2E22] mb-8">
              <p className="text-base font-bold italic text-amber-300">
                "{currentLeader.mensajeComunal}"
              </p>
              <p className="text-xs sm:text-sm text-[#A89481] mt-0.5">
                Propósito de acción: {currentLeader.propositoAccion}
              </p>
            </div>

            {/* Main Action */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#3D2E22]">
              <button
                onClick={() => onSelectParticipant(currentLeader)}
                className="min-h-[54px] px-8 py-3 rounded-2xl bg-[#9B2226] hover:bg-[#B91C1C] active:scale-95 text-white font-extrabold text-base sm:text-lg flex items-center gap-2 shadow-xl cursor-pointer transition-all border border-amber-400/50"
              >
                <Maximize2 className="w-5 h-5" />
                <span>Ver en Gigante y Descargar JPG</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
