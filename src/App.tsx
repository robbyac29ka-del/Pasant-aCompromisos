import React, { useState, useEffect } from 'react';
import { PARTICIPANTES, TERRITORIOS, Participant, TerritorioInfo } from './data/participants';
import { Header } from './components/Header';
import { MagicSearch } from './components/MagicSearch';
import { TerritoryGrid } from './components/TerritoryGrid';
import { TerritoryGallery } from './components/TerritoryGallery';
import { GiantCommitmentModal } from './components/GiantCommitmentModal';
import { OfflineExporter } from './components/OfflineExporter';
import { HelpModal } from './components/HelpModal';
import { AndeanArtwork } from './components/AndeanArtwork';
import { 
  Sparkles, 
  MapPin, 
  Users, 
  Droplet, 
  Sprout, 
  ShieldCheck, 
  BookOpen
} from 'lucide-react';

export default function App() {
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [selectedTerritory, setSelectedTerritory] = useState<TerritorioInfo | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isOfflineExportOpen, setIsOfflineExportOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'grande' | 'gigante'>('normal');

  // Load accessibility preferences
  useEffect(() => {
    const savedContrast = localStorage.getItem('cedep_contrast');
    if (savedContrast === 'true') setHighContrast(true);

    const savedFont = localStorage.getItem('cedep_font');
    if (savedFont && ['normal', 'grande', 'gigante'].includes(savedFont)) {
      setFontSize(savedFont as 'normal' | 'grande' | 'gigante');
    }
  }, []);

  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const next = !prev;
      localStorage.setItem('cedep_contrast', String(next));
      return next;
    });
  };

  const handleSetFontSize = (size: 'normal' | 'grande' | 'gigante') => {
    setFontSize(size);
    localStorage.setItem('cedep_font', size);
  };

  const handleResetView = () => {
    setSelectedParticipant(null);
    setSelectedTerritory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      highContrast 
        ? 'bg-black text-white' 
        : 'bg-[#181411] text-[#F4ECE1]'
    }`}>
      
      {/* Top Accessible Navigation Bar */}
      <Header
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenOfflineExport={() => setIsOfflineExportOpen(true)}
        highContrast={highContrast}
        toggleHighContrast={toggleHighContrast}
        fontSize={fontSize}
        setFontSize={handleSetFontSize}
        onResetView={handleResetView}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        
        {/* If a Territory is selected: Show its exclusive gallery view */}
        {selectedTerritory ? (
          <TerritoryGallery
            territorio={selectedTerritory}
            participants={PARTICIPANTES}
            onBack={() => setSelectedTerritory(null)}
            onSelectParticipant={(p) => setSelectedParticipant(p)}
            highContrast={highContrast}
          />
        ) : (
          <>
            {/* HERO BANNER SECTION (Dark Andean Palette) */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#1E1813] to-[#181411] border-b border-[#36291F] pt-8 pb-10 sm:py-14 px-4 sm:px-6">
              
              {/* Background Andean mountain art banner */}
              <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-[#4E3D2E] relative min-h-[220px] sm:min-h-[280px] flex items-center">
                <div className="absolute inset-0">
                  <AndeanArtwork type="cordillera" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50"></div>
                </div>

                <div className="relative z-10 p-6 sm:p-12 text-white max-w-3xl">
                  <div className="inline-flex items-center gap-2 bg-[#9B2226] text-amber-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase shadow-md mb-3 border border-amber-400/30">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Pasantía de Saberes Campesinos 2026</span>
                  </div>

                  <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-[#FFFDF8]">
                    Compromisos de Honor
                  </h1>

                  <p className="text-base sm:text-xl text-[#E8D7C4] font-medium mt-2 leading-relaxed">
                    Escuela de Fortalecimiento de Liderazgos <span className="font-bold text-amber-300">CEDEP Ayllu</span>. Los 30 líderes y lideresas oficiales con sus compromisos de siembra de agua, qochas, techos de calamina, reforestación y soberanía alimentaria.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold">
                    <span className="bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-white/15 text-amber-200">
                      <Users className="w-4 h-4 text-amber-300" />
                      <span>30 Participantes Oficiales</span>
                    </span>
                    <span className="bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-white/15 text-emerald-200">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span>8 Territorios Andinos</span>
                    </span>
                    <span className="bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-white/15 text-sky-200">
                      <Droplet className="w-4 h-4 text-sky-400" />
                      <span>Cosecha con Calamina y Qochas</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* REQUIREMENT 1: GIANT CENTRAL MAGIC SEARCH (Priority 1) */}
            <MagicSearch
              participants={PARTICIPANTES}
              onSelectParticipant={(p) => setSelectedParticipant(p)}
              highContrast={highContrast}
            />

            {/* REQUIREMENT 2: THE 8 TERRITORIES NAVIGATION (Visual Touch Buttons) */}
            <TerritoryGrid
              onSelectTerritorio={(t) => setSelectedTerritory(t)}
              participants={PARTICIPANTES}
              highContrast={highContrast}
            />

            {/* THEMATIC AXIS SHOWCASE (Dark Cards) */}
            <section className="max-w-7xl mx-auto my-12 px-4 sm:px-6">
              <div className="bg-[#201813] rounded-3xl p-6 sm:p-10 border-2 border-[#3E3024] shadow-xl">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-xs sm:text-sm uppercase font-bold tracking-wider text-amber-400">
                    Nuestros Pilares de Vida Comunal
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#FFFDF8] mt-1">
                    Ejes Centrales de la Pasantía CEDEP Ayllu
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#291F18] p-6 rounded-2xl border border-[#48372A] shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-sky-950 text-sky-300 border border-sky-800 flex items-center justify-center mb-4">
                      <Droplet className="w-6 h-6 text-sky-400" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-[#FFFDF8] mb-1">
                      Cosecha con Calamina y Qochas
                    </h4>
                    <p className="text-xs sm:text-sm text-[#C8B6A2] leading-relaxed">
                      Captación de aguas pluviales en techos de calamina, geomembranas, pozas y qochas rústicas familiares y comunales.
                    </p>
                  </div>

                  <div className="bg-[#291F18] p-6 rounded-2xl border border-[#48372A] shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center justify-center mb-4">
                      <Sprout className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-[#FFFDF8] mb-1">
                      Reforestación y Plantas Medicinales
                    </h4>
                    <p className="text-xs sm:text-sm text-[#C8B6A2] leading-relaxed">
                      Plantación de hasta 10,000 queñuales, chachacomos y alisos, junto a biohuertos de hierbas medicinales nativas para filtrantes.
                    </p>
                  </div>

                  <div className="bg-[#291F18] p-6 rounded-2xl border border-[#48372A] shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-purple-950 text-purple-300 border border-purple-800 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-[#FFFDF8] mb-1">
                      Liderazgo de Mujeres y Saberes
                    </h4>
                    <p className="text-xs sm:text-sm text-[#C8B6A2] leading-relaxed">
                      Participación activa en asambleas, producción de tejidos y cerámica, protección de bofedales y declaratoria de reservas hídricas.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* FOOTER (Dark Theme) */}
      <footer className="w-full bg-[#130F0C] text-[#C8B6A2] border-t border-[#31251C] pt-12 pb-8 px-4 sm:px-6 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9B2226] text-white flex items-center justify-center font-bold text-lg shadow-md border border-amber-400/40">
                CA
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-white">
                  CEDEP Ayllu
                </h4>
                <p className="text-xs text-amber-300/80">
                  Centro de Desarrollo de Pueblos Ayllu · Cusco, Perú
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#A89481] max-w-md mt-3">
              Acompañando a las comunidades campesinas de Antilla, Pomacanchi, Accha, Colcha, Omacha, Ccapi y Huanoquite en la defensa del agua y la vida.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setIsOfflineExportOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#261E18] hover:bg-[#342921] text-amber-200 border border-[#48382C] transition-all cursor-pointer shadow-sm"
            >
              📥 Guardar Versión para USB (Sin Internet)
            </button>
            <button
              onClick={() => setIsHelpOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#261E18] hover:bg-[#342921] text-amber-200 border border-[#48382C] transition-all cursor-pointer shadow-sm"
            >
              ❓ Guía de Ayuda
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A6A58]">
          <p>© 2026 Escuela de Líderes CEDEP Ayllu. 30 Compromisos oficiales registrados.</p>
          <p className="flex items-center gap-1 text-amber-300/90 font-semibold">
            <span>Por el Buen Vivir y la Soberanía de Nuestras Comunidades</span>
          </p>
        </div>
      </footer>

      {/* FULLSCREEN GIANT COMMITMENT MODAL (Triggered on search match or leader tap) */}
      {selectedParticipant && (
        <GiantCommitmentModal
          participant={selectedParticipant}
          allParticipants={PARTICIPANTES}
          onClose={() => setSelectedParticipant(null)}
          onSelectParticipant={(p) => setSelectedParticipant(p)}
          highContrast={highContrast}
          fontSize={fontSize}
        />
      )}

      {/* OFFLINE EXPORT MODAL */}
      <OfflineExporter
        isOpen={isOfflineExportOpen}
        onClose={() => setIsOfflineExportOpen(false)}
      />

      {/* HELP GUIDANCE MODAL */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
