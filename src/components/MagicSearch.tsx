import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, Delete, UserCheck, MapPin, ArrowRight } from 'lucide-react';
import { Participant } from '../data/participants';

interface MagicSearchProps {
  participants: Participant[];
  onSelectParticipant: (participant: Participant) => void;
  highContrast: boolean;
}

export const MagicSearch: React.FC<MagicSearchProps> = ({
  participants,
  onSelectParticipant,
  highContrast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);

  // Normalize text for diacritics / accents
  const normalize = (text: string) =>
    text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

  // Search filtering - matches internal DNI, name, territory, community, or commitment text
  const matchingParticipants = useMemo(() => {
    const term = normalize(searchTerm);
    if (!term) return [];

    return participants.filter(p => {
      // DNI is checked internally, but NEVER displayed on screen
      const matchDni = p.dni && p.dni !== 'S/D' && p.dni.replace(/\s+/g, '').includes(term);
      const matchNombre = normalize(p.nombre).includes(term);
      const matchTerritorio = normalize(p.territorio).includes(term);
      const matchComunidad = normalize(p.comunidad).includes(term);
      const matchCompromiso = normalize(p.compromiso).includes(term);
      return matchDni || matchNombre || matchTerritorio || matchComunidad || matchCompromiso;
    });
  }, [searchTerm, participants]);

  // Safe selection handler that clears the search term to prevent loop bugs on close!
  const handleSelect = (p: Participant) => {
    setSearchTerm(''); // Clear search so returning to this screen is 100% clean and free of loops
    onSelectParticipant(p);
  };

  // Handle enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && matchingParticipants.length > 0) {
      handleSelect(matchingParticipants[0]);
    }
  };

  // Virtual Keypad handlers (for entering private DNI without mobile keyboard friction)
  const handleKeypadDigit = (digit: string) => {
    if (searchTerm.length < 8) {
      setSearchTerm(prev => prev + digit);
    }
  };

  const handleKeypadDelete = () => {
    setSearchTerm(prev => prev.slice(0, -1));
  };

  const handleKeypadClear = () => {
    setSearchTerm('');
  };

  // Check if current search term is an exact 8-digit match for a participant
  const exactDniMatch = useMemo(() => {
    const clean = searchTerm.trim();
    if (clean.length === 8 && /^\d+$/.test(clean)) {
      return participants.find(p => p.dni === clean);
    }
    return null;
  }, [searchTerm, participants]);

  return (
    <div className="w-full max-w-4xl mx-auto my-6 sm:my-10 px-2 sm:px-4">
      {/* Decorative intro badge */}
      <div className="text-center mb-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#9B2226]/30 text-amber-300 border border-[#9B2226]/50">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          Búsqueda Mágica e Inmediata
        </span>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#FDF8F0] mt-2">
          Encuentra tu Compromiso de Honor
        </h2>
        <p className="text-sm sm:text-base text-[#B8A490] mt-1 max-w-xl mx-auto">
          Ingresa tu <strong className="text-amber-300">DNI</strong> o tu <strong className="text-amber-300">Nombre</strong>. Tu compromiso aparecerá en pantalla completa y letras gigantes.
        </p>
      </div>

      {/* GIANT SEARCH INPUT CONTAINER */}
      <div className={`relative rounded-3xl transition-all shadow-2xl p-2 ${
        highContrast
          ? 'bg-black border-4 border-yellow-400 ring-4 ring-yellow-400 text-white'
          : 'bg-[#221A14] border-2 border-[#4E3D2E] focus-within:border-amber-500 focus-within:ring-4 focus-within:ring-amber-500/20'
      }`}>
        <div className="flex items-center gap-3 px-3 py-1 sm:py-2">
          <div className="w-12 h-12 rounded-2xl bg-[#31251D] text-amber-400 flex items-center justify-center shrink-0 border border-[#4E3D2E]">
            <Search className="w-7 h-7" />
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ingresa tu DNI o tu Nombre aquí..."
            className="w-full text-lg sm:text-2xl md:text-3xl font-display font-semibold text-[#FFFDF8] placeholder:text-[#826E5B] bg-transparent focus:outline-none"
            autoFocus
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="min-h-[44px] min-w-[44px] p-2 rounded-xl text-[#B8A490] hover:text-white hover:bg-[#34281F] flex items-center justify-center transition-all cursor-pointer"
              title="Borrar texto"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          {/* Toggle Virtual Number Keypad Button */}
          <button
            onClick={() => setShowKeypad(!showKeypad)}
            className={`min-h-[44px] px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shrink-0 border ${
              showKeypad 
                ? 'bg-[#9B2226] text-white border-[#E07A5F]/50 shadow-sm' 
                : 'bg-[#2E231B] text-[#D8C6B2] border-[#48382C] hover:bg-[#3B2D22]'
            }`}
            title="Teclado numérico táctil para ingresar DNI"
          >
            <span>🔢 {showKeypad ? 'Ocultar Teclado' : 'Teclado DNI'}</span>
          </button>
        </div>

        {/* VIRTUAL LARGE NUMERIC KEYPAD */}
        {showKeypad && (
          <div className="mt-3 pt-3 border-t border-[#3B2D22] bg-[#1A140F] p-3 rounded-2xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A89481]">
                Teclas táctiles para DNI (Dato privado y protegido):
              </span>
              <span className="font-mono text-sm font-bold text-amber-300">
                {searchTerm.length}/8 dígitos
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <button
                  key={num}
                  onClick={() => handleKeypadDigit(num)}
                  className="min-h-[54px] rounded-2xl bg-[#2A2018] hover:bg-[#382B21] active:bg-amber-600 border-2 border-[#48382C] text-2xl font-bold text-[#F4ECE1] shadow-sm flex items-center justify-center cursor-pointer transition-all active:scale-95"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleKeypadClear}
                className="min-h-[54px] rounded-2xl bg-[#3B1818] hover:bg-[#4F1E1E] border-2 border-red-800 text-sm font-bold text-red-200 flex items-center justify-center cursor-pointer active:scale-95"
              >
                Limpiar
              </button>
              <button
                onClick={() => handleKeypadDigit('0')}
                className="min-h-[54px] rounded-2xl bg-[#2A2018] hover:bg-[#382B21] active:bg-amber-600 border-2 border-[#48382C] text-2xl font-bold text-[#F4ECE1] shadow-sm flex items-center justify-center cursor-pointer active:scale-95"
              >
                0
              </button>
              <button
                onClick={handleKeypadDelete}
                className="min-h-[54px] rounded-2xl bg-[#382618] hover:bg-[#4D3320] border-2 border-amber-800 text-amber-200 flex items-center justify-center cursor-pointer active:scale-95"
                title="Borrar último número"
              >
                <Delete className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* INSTANT EXACT DNI MATCH BANNER (Big glowing immediate button) */}
      {exactDniMatch && (
        <div className="mt-4 p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#9B2226] via-[#B91C1C] to-[#C2410C] text-white shadow-2xl border-2 border-amber-400 animate-in zoom-in-95 duration-150">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase tracking-widest text-amber-200 font-bold block mb-1">
                ✓ ¡Identidad Encontrada con Éxito!
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {exactDniMatch.nombre}
              </h3>
              <p className="text-sm text-amber-100 font-medium">
                Territorio: {exactDniMatch.territorio} · {exactDniMatch.comunidad}
              </p>
            </div>
            <button
              onClick={() => handleSelect(exactDniMatch)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-[#181411] font-extrabold text-lg flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer"
            >
              <span>Ver Compromiso Gigante</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* QUICK SUGGESTIONS (Names only - NO DNIs displayed anywhere!) */}
      {!searchTerm && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
          <span className="font-semibold text-[#9E8B78]">Ver líderes por nombre:</span>
          <button
            onClick={() => handleSelect(participants[0])}
            className="px-3.5 py-1.5 rounded-xl bg-[#251D17] border border-[#48382C] hover:border-amber-400 text-[#EADCC8] font-semibold shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            👤 Angélica Meza (Antilla)
          </button>
          <button
            onClick={() => handleSelect(participants[3])}
            className="px-3.5 py-1.5 rounded-xl bg-[#251D17] border border-[#48382C] hover:border-amber-400 text-[#EADCC8] font-semibold shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            👤 Gustavo Apaza (Pomacanchi)
          </button>
          <button
            onClick={() => handleSelect(participants[6])}
            className="px-3.5 py-1.5 rounded-xl bg-[#251D17] border border-[#48382C] hover:border-amber-400 text-[#EADCC8] font-semibold shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            👤 Paulina Méndez (Accha)
          </button>
          <button
            onClick={() => handleSelect(participants[11])}
            className="px-3.5 py-1.5 rounded-xl bg-[#251D17] border border-[#48382C] hover:border-amber-400 text-[#EADCC8] font-semibold shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            👤 William Chirinos (Colcha)
          </button>
          <button
            onClick={() => handleSelect(participants[17])}
            className="px-3.5 py-1.5 rounded-xl bg-[#251D17] border border-[#48382C] hover:border-amber-400 text-[#EADCC8] font-semibold shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            👤 Florencia Llamocca (Omacha)
          </button>
          <button
            onClick={() => handleSelect(participants[22])}
            className="px-3.5 py-1.5 rounded-xl bg-[#251D17] border border-[#48382C] hover:border-amber-400 text-[#EADCC8] font-semibold shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            👤 Victoria Ccasani (Ccapi)
          </button>
          <button
            onClick={() => handleSelect(participants[24])}
            className="px-3.5 py-1.5 rounded-xl bg-[#251D17] border border-[#48382C] hover:border-amber-400 text-[#EADCC8] font-semibold shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            👤 Hugo Quispe (Huanoquite)
          </button>
        </div>
      )}

      {/* LIVE SEARCH RESULTS LIST (Shows full commitment right in the card too! NO DNI DISPLAYED) */}
      {searchTerm && matchingParticipants.length > 0 && !exactDniMatch && (
        <div className="mt-4 bg-[#201813] rounded-3xl p-3 sm:p-5 shadow-2xl border-2 border-amber-600/50 max-h-[560px] overflow-y-auto">
          <div className="flex items-center justify-between px-2 pb-2 mb-3 border-b border-[#36281E]">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">
              Se encontraron {matchingParticipants.length} participante{matchingParticipants.length > 1 ? 's' : ''}:
            </span>
            <span className="text-xs text-[#A89481]">Toca cualquier ficha para ver en pantalla gigante</span>
          </div>

          <div className="space-y-3">
            {matchingParticipants.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelect(p)}
                className="w-full p-4 sm:p-5 rounded-2xl text-left transition-all flex flex-col justify-between gap-3 bg-[#292018] hover:bg-[#342921] border-2 border-[#45362A] hover:border-amber-400/90 active:scale-[0.99] cursor-pointer group shadow-md"
              >
                {/* Header with Avatar, Name, Territory, and Verified badge (NO DNI) */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#9B2226] text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform shrink-0 border border-amber-400/30">
                      {p.nombre.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-display text-lg sm:text-xl font-bold text-[#FFFDF8] group-hover:text-amber-300 transition-colors">
                        {p.nombre}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#B8A490] flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{p.territorio} · {p.comunidad}</span>
                      </p>
                    </div>
                  </div>

                  <div className="min-h-[40px] px-4 py-2 rounded-xl bg-[#9B2226] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm border border-amber-400/30 shrink-0">
                    <UserCheck className="w-4 h-4" />
                    <span>Ver en Gigante</span>
                  </div>
                </div>

                {/* The Commitment shown prominently so user immediately sees what it is */}
                <div className="p-3.5 rounded-xl bg-[#1D1611] border-l-4 border-amber-500 text-sm sm:text-base text-amber-100/95 font-medium italic">
                  "{p.compromiso}"
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No matches notice */}
      {searchTerm && matchingParticipants.length === 0 && (
        <div className="mt-4 bg-[#291D16] rounded-2xl p-6 text-center border border-amber-900/60">
          <p className="text-lg font-bold text-amber-200">
            No encontramos coincidencias para "{searchTerm}"
          </p>
          <p className="text-sm text-[#C8B6A2] mt-1">
            Verifica el nombre o número de DNI. También puedes tocar los botones de los 8 territorios abajo.
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-3 px-5 py-2.5 rounded-xl bg-[#9B2226] text-white font-bold text-sm hover:bg-[#B91C1C] transition-all cursor-pointer border border-amber-400/30"
          >
            Limpiar Búsqueda
          </button>
        </div>
      )}
    </div>
  );
};
