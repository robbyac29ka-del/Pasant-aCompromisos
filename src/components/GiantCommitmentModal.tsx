import React, { useState, useEffect } from 'react';
import { Participant, TERRITORIOS } from '../data/participants';
import { AndeanArtwork } from './AndeanArtwork';
import { downloadCommitmentJpg } from '../utils/canvasExport';
import { 
  Download, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Share2, 
  Printer, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  CheckCircle, 
  FileBadge, 
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface GiantCommitmentModalProps {
  participant: Participant;
  allParticipants: Participant[];
  onClose: () => void;
  onSelectParticipant: (p: Participant) => void;
  highContrast: boolean;
  fontSize: 'normal' | 'grande' | 'gigante';
}

export const GiantCommitmentModal: React.FC<GiantCommitmentModalProps> = ({
  participant,
  allParticipants,
  onClose,
  onSelectParticipant,
  highContrast,
  fontSize: initialFontSize
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [themeBackground, setThemeBackground] = useState<'cordillera' | 'textil' | 'laguna' | 'terrazas' | 'pergamino'>('cordillera');
  const [modalFontSize, setModalFontSize] = useState<'normal' | 'grande' | 'gigante'>(initialFontSize);

  const territorioData = TERRITORIOS.find(t => t.nombre === participant.territorio);
  const currentIndex = allParticipants.findIndex(p => p.id === participant.id);

  // Keyboard navigation & ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, allParticipants]);

  // Stop speech when modal closes or participant changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [participant.id]);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % allParticipants.length;
    onSelectParticipant(allParticipants[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + allParticipants.length) % allParticipants.length;
    onSelectParticipant(allParticipants[prevIdx]);
  };

  // Text-To-Speech function for accessibility (NO DNI spoken)
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('La lectura por voz no está disponible en este dispositivo.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `Compromiso de honor de ${participant.nombre}, del territorio ${participant.territorio}, comunidad ${participant.comunidad}. Cargo: ${participant.cargo}. Su compromiso es: ${participant.compromiso}. Reflexión comunitaria: ${participant.mensajeComunal}. Propósito: ${participant.propositoAccion}.`;
      
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'es-PE';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // 100% Reliable JPG Generation using direct Canvas 2D
  const handleDownloadJpg = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadError(false);

    try {
      await downloadCommitmentJpg(participant, themeBackground);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4500);
    } catch (err) {
      console.error('Error generando JPG:', err);
      setDownloadError(true);
      setTimeout(() => setDownloadError(false), 4500);
    } finally {
      setIsDownloading(false);
    }
  };

  // WhatsApp Share (100% Castellano)
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `📜 *Compromiso de Honor - Escuela de Líderes CEDEP Ayllu*\n\n` +
      `👤 *Líder(esa):* ${participant.nombre}\n` +
      `📍 *Territorio:* ${participant.territorio} (${participant.comunidad})\n` +
      `🌾 *Cargo:* ${participant.cargo}\n\n` +
      `🤝 *Compromiso Oficial:* "${participant.compromiso}"\n\n` +
      `✨ *Reflexión Comunal:* "${participant.mensajeComunal}"\n\n` +
      `#CEDEPAyllu #EscuelaDeLideres #Cusco #Apurimac #AguaYComunidad`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Typography scale for the commitment text
  const commitmentTextClass = {
    normal: 'text-2xl sm:text-3xl lg:text-4xl leading-relaxed',
    grande: 'text-3xl sm:text-4xl lg:text-5xl leading-relaxed',
    gigante: 'text-4xl sm:text-5xl lg:text-6xl leading-tight'
  }[modalFontSize];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-scroll bg-black/95 backdrop-blur-lg flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 animate-in fade-in duration-150"
      style={{ scrollbarGutter: 'stable' }}
    >
      
      {/* STICKY TOP CONTROL BAR - Always visible so user can return or download at any moment */}
      <header className="sticky top-0 z-40 w-full max-w-5xl mx-auto bg-[#1C1510]/95 backdrop-blur-md p-3 rounded-2xl border-2 border-[#4A3B2F] shadow-2xl mb-4 no-print flex flex-wrap items-center justify-between gap-3">
        {/* BIG prominent button to go back */}
        <button
          onClick={onClose}
          className="min-h-[50px] px-5 py-2.5 rounded-xl bg-[#9B2226] hover:bg-[#B91C1C] active:scale-95 text-white font-extrabold flex items-center gap-2.5 transition-all cursor-pointer shadow-lg text-sm sm:text-base border-2 border-amber-400/60"
        >
          <ArrowLeft className="w-5 h-5 text-amber-300" />
          <span>← Volver al Buscador</span>
        </button>

        {/* Previous / Next navigation */}
        <div className="flex items-center gap-1.5 bg-[#2A2018] px-2 py-1 rounded-xl border border-[#48382C]">
          <button
            onClick={handlePrev}
            className="min-h-[40px] px-2.5 py-1.5 rounded-lg bg-[#36291F] hover:bg-[#48372A] active:scale-95 text-white font-bold flex items-center gap-1 transition-all cursor-pointer text-xs sm:text-sm text-amber-200"
            title="Líder anterior (tecla ←)"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden xs:inline">Anterior</span>
          </button>
          
          <span className="text-xs font-bold text-amber-300 px-2 font-mono">
            {currentIndex + 1} / {allParticipants.length}
          </span>

          <button
            onClick={handleNext}
            className="min-h-[40px] px-2.5 py-1.5 rounded-lg bg-[#36291F] hover:bg-[#48372A] active:scale-95 text-white font-bold flex items-center gap-1 transition-all cursor-pointer text-xs sm:text-sm text-amber-200"
            title="Siguiente líder (tecla →)"
          >
            <span className="hidden xs:inline">Siguiente</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Download and Accessibility Controls */}
        <div className="flex items-center gap-2">
          {/* Font Size Adjuster inside modal */}
          <div className="hidden sm:flex items-center bg-[#2A2018] rounded-xl p-1 border border-[#48382C]">
            <button
              onClick={() => setModalFontSize('normal')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                modalFontSize === 'normal' ? 'bg-[#9B2226] text-white' : 'text-[#A89481] hover:text-white'
              }`}
              title="Letra Normal"
            >
              A
            </button>
            <button
              onClick={() => setModalFontSize('grande')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                modalFontSize === 'grande' ? 'bg-[#9B2226] text-white' : 'text-[#A89481] hover:text-white'
              }`}
              title="Letra Grande"
            >
              A+
            </button>
            <button
              onClick={() => setModalFontSize('gigante')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                modalFontSize === 'gigante' ? 'bg-[#9B2226] text-white' : 'text-[#A89481] hover:text-white'
              }`}
              title="Letra Gigante"
            >
              A++
            </button>
          </div>

          {/* Voice Reading */}
          <button
            onClick={toggleSpeech}
            className={`min-h-[44px] px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer text-xs sm:text-sm border ${
              isPlayingAudio
                ? 'bg-amber-400 text-black border-amber-300 animate-pulse'
                : 'bg-[#2A2018] text-white hover:bg-[#3B2D22] border-[#48382C]'
            }`}
            title="Escuchar compromiso con voz clara"
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4 text-black" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
            <span className="hidden md:inline">{isPlayingAudio ? 'Pausar' : 'Escuchar Voz'}</span>
          </button>

          {/* Direct JPG Download Button */}
          <button
            onClick={handleDownloadJpg}
            disabled={isDownloading}
            className={`min-h-[46px] px-5 py-2 rounded-xl font-extrabold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 border-2 ${
              downloadSuccess
                ? 'bg-emerald-600 text-white border-emerald-400'
                : isDownloading
                  ? 'bg-amber-600 text-white border-amber-500 cursor-wait'
                  : 'bg-[#9B2226] hover:bg-[#B91C1C] text-white border-amber-400'
            }`}
            title="Guardar lámina en formato JPG para WhatsApp o imprimir"
          >
            <Download className="w-5 h-5 animate-bounce" />
            <span>
              {isDownloading 
                ? 'Generando JPG...' 
                : downloadSuccess 
                  ? '¡Guardado con Éxito!' 
                  : 'Guardar Imagen (JPG)'}
            </span>
          </button>

          {/* Close X */}
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl bg-[#2A2018] hover:bg-[#3B2D22] text-[#C8B6A2] hover:text-white flex items-center justify-center transition-all cursor-pointer border border-[#48382C]"
            title="Cerrar y volver al buscador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* THE GIANT OFFICIAL CARD (EXPANSIVE, COMPLETE, NON-CLIPPING) */}
      <div 
        className={`w-full max-w-5xl rounded-3xl shadow-2xl transition-all border-4 relative mb-6 ${
          highContrast 
            ? 'bg-black text-white border-yellow-400' 
            : themeBackground === 'cordillera'
              ? 'bg-[#181310] text-[#FFFDF8] border-amber-600'
              : themeBackground === 'textil'
                ? 'bg-[#2A0E0E] text-amber-50 border-amber-500'
                : themeBackground === 'laguna'
                  ? 'bg-[#0A1E29] text-sky-50 border-sky-400'
                  : themeBackground === 'terrazas'
                    ? 'bg-[#082218] text-emerald-50 border-emerald-500'
                    : 'bg-[#221A15] text-[#FDF8F0] border-[#9E7A52]'
        }`}
      >
        {/* Top Official Andean Ribbon */}
        <div className="andean-border-pattern h-3 w-full rounded-t-2xl"></div>

        {/* Card Content Container */}
        <div className="p-6 sm:p-10 lg:p-12 relative z-10 flex flex-col justify-start">
          
          {/* Header Zone: Institution, Verified Status (NO DNI) */}
          <div className="border-b pb-6 border-amber-500/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Institution Seal & Territory */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#9B2226] text-white flex flex-col items-center justify-center font-display font-bold shadow-lg border-2 border-amber-400 shrink-0">
                  <span className="text-xl sm:text-2xl leading-none">CA</span>
                  <span className="text-[9px] uppercase tracking-widest mt-1 opacity-90">Ayllu</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-amber-400">
                    <FileBadge className="w-4 h-4" />
                    <span>Escuela de Líderes Campesinos · Pasantía 2026</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-white flex items-center gap-2 mt-0.5">
                    <MapPin className="w-6 h-6 text-amber-400 shrink-0" />
                    <span>Territorio {participant.territorio}</span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#D4C3B2]">
                    {territorioData?.region} · {participant.comunidad}
                  </p>
                </div>
              </div>

              {/* Verified Official Seal */}
              <div className="flex flex-col items-end">
                <div className="bg-[#120E0B] text-amber-300 px-4 py-2.5 rounded-xl border border-[#48382C] shadow-inner flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs sm:text-sm uppercase tracking-wider font-bold">
                    Participante Acreditado(a)
                  </span>
                </div>
                <span className="text-[11px] text-[#A89481] mt-1 font-mono">
                  Registro Comunal Oficial
                </span>
              </div>
            </div>

            {/* Leader Name and Role */}
            <div className="mt-6">
              <span className="text-xs sm:text-sm uppercase tracking-widest font-bold text-amber-400 block mb-1">
                Líder / Lideresa Comunitaria:
              </span>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {participant.nombre}
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-amber-200 mt-1">
                {participant.cargo}
              </p>
            </div>
          </div>

          {/* THE GIANT COMMITMENT SECTION WITH DEDICATED SCROLLBAR (NO CLIPPING EVER) */}
          <div className="my-6">
            <div className="flex items-center justify-between mb-2 px-1 text-xs font-bold text-amber-300">
              <span className="uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Compromiso Oficial de Honor:
              </span>
              <span className="text-[#A89481] bg-[#120E0B] px-3 py-1 rounded-full border border-[#3E2E22] flex items-center gap-1">
                ↕️ Puedes deslizar para leer todo el texto
              </span>
            </div>

            {/* Dedicated scrollable container with customized visible scrollbar */}
            <div 
              className="p-6 sm:p-10 rounded-3xl bg-black/60 border-l-8 sm:border-l-[14px] border-amber-500 shadow-2xl relative border border-white/10 max-h-[380px] sm:max-h-[440px] overflow-y-auto"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#F59E0B #18130E'
              }}
            >
              <span className="text-5xl sm:text-7xl font-serif text-amber-400/25 absolute top-2 left-3 select-none">
                “
              </span>
              <p className={`font-display font-bold text-[#FFFDF8] italic relative z-10 ${commitmentTextClass}`}>
                {participant.compromiso}
              </p>
              <span className="text-5xl sm:text-7xl font-serif text-amber-400/25 block text-right mt-2 select-none">
                ”
              </span>
            </div>
          </div>

          {/* Communal Reflection & Thematic Axis (100% Castellano, Separated Cards) */}
          <div className="border-t pt-6 border-amber-500/20 flex flex-col lg:flex-row items-stretch justify-between gap-6">
            
            {/* Communal Reflection & Purpose Card (Left Card) */}
            <div className="flex-1 bg-[#120E0B]/80 p-5 sm:p-6 rounded-2xl border border-[#48382C] shadow-inner flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-400 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Reflexión Comunal:</span>
                </div>
                <p className="text-lg sm:text-xl font-semibold italic text-amber-200 font-display leading-relaxed">
                  "{participant.mensajeComunal}"
                </p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-white/10">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-1">
                  Propósito de Acción:
                </span>
                <p className="text-sm sm:text-base text-[#D4C3B2] font-medium leading-normal">
                  {participant.propositoAccion}
                </p>
              </div>
            </div>

            {/* Thematic Area Card (Right Card) */}
            <div className="lg:w-80 bg-[#120E0B]/80 p-5 sm:p-6 rounded-2xl border border-[#48382C] flex flex-col justify-center items-center text-center shrink-0 shadow-inner">
              <span className="text-xs uppercase tracking-wider block font-semibold text-[#A89481] mb-1.5">
                Eje Temático de Acción
              </span>
              <span className="text-base sm:text-lg font-extrabold text-amber-300">
                {participant.ejeTematico}
              </span>
              <div className="w-16 h-0.5 bg-amber-500/30 my-3"></div>
              <span className="text-xs text-[#8E7B6C] font-mono">
                Escuela de Líderes · CEDEP Ayllu
              </span>
            </div>
          </div>

          {/* Bottom Accreditation Seal */}
          <div className="mt-8 pt-4 border-t border-dashed border-white/10 flex flex-wrap items-center justify-between text-xs text-[#A89481] gap-2">
            <span>Escuela de Líderes CEDEP Ayllu · Sede Regional Cusco y Apurímac</span>
            <span className="font-mono">Pasantía Vivencial de Gobernanza y Agroecología 2026</span>
          </div>
        </div>

        {/* Bottom Andean Ribbon */}
        <div className="andean-border-pattern h-2.5 w-full rounded-b-2xl"></div>
      </div>

      {/* BOTTOM ACTION BAR - So the user never gets stuck at the bottom */}
      <footer className="w-full max-w-5xl no-print flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 text-white">
        
        {/* Left: Background Theme Selector */}
        <div className="flex items-center gap-1.5 bg-[#1C1510] p-2 rounded-2xl border border-[#48382C] text-xs font-semibold">
          <span className="px-2 text-amber-300 hidden sm:inline">Tema:</span>
          <button
            onClick={() => setThemeBackground('cordillera')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              themeBackground === 'cordillera' ? 'bg-amber-500 text-black font-bold' : 'hover:bg-white/10 text-[#C8B6A2]'
            }`}
          >
            Andes Oscuro
          </button>
          <button
            onClick={() => setThemeBackground('textil')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              themeBackground === 'textil' ? 'bg-amber-500 text-black font-bold' : 'hover:bg-white/10 text-[#C8B6A2]'
            }`}
          >
            Textil Inca
          </button>
          <button
            onClick={() => setThemeBackground('laguna')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              themeBackground === 'laguna' ? 'bg-amber-500 text-black font-bold' : 'hover:bg-white/10 text-[#C8B6A2]'
            }`}
          >
            Laguna Cocha
          </button>
          <button
            onClick={() => setThemeBackground('terrazas')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              themeBackground === 'terrazas' ? 'bg-amber-500 text-black font-bold' : 'hover:bg-white/10 text-[#C8B6A2]'
            }`}
          >
            Terrazas
          </button>
        </div>

        {/* Right: Big Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={handlePrint}
            className="min-h-[54px] px-5 py-2.5 rounded-2xl bg-[#292019] hover:bg-[#382C22] active:scale-95 text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#4A3B2F] text-sm shadow-md"
            title="Imprimir esta lámina en papel"
          >
            <Printer className="w-5 h-5 text-amber-300" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="min-h-[54px] px-5 py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] active:scale-95 text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md text-sm"
            title="Compartir por WhatsApp"
          >
            <Share2 className="w-5 h-5" />
            <span>Compartir WhatsApp</span>
          </button>

          <button
            onClick={handleDownloadJpg}
            disabled={isDownloading}
            className={`min-h-[54px] px-7 py-3 rounded-2xl font-extrabold text-base sm:text-lg shadow-2xl flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-95 border-2 ${
              downloadSuccess
                ? 'bg-emerald-600 text-white border-emerald-400'
                : isDownloading
                  ? 'bg-amber-600 text-white border-amber-500 cursor-wait'
                  : 'bg-[#9B2226] hover:bg-[#B91C1C] text-white border-amber-400'
            }`}
          >
            <Download className="w-6 h-6 animate-bounce" />
            <span>
              {isDownloading 
                ? 'Generando JPG...' 
                : downloadSuccess 
                  ? '¡Imagen Guardada!' 
                  : 'Guardar Imagen (JPG)'}
            </span>
          </button>

          <button
            onClick={onClose}
            className="min-h-[54px] px-6 py-3 rounded-2xl bg-[#9B2226] hover:bg-[#B91C1C] text-white font-extrabold text-base transition-all cursor-pointer border-2 border-amber-400/60 shadow-lg"
          >
            ← Volver al Buscador
          </button>
        </div>
      </footer>
    </div>
  );
};
