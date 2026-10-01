import React from 'react';
import { X, Search, MapPin, Download, Volume2 } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-[#221A14] text-[#F5EBE1] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#5E4735] relative text-left max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#A89481] hover:text-white hover:bg-[#34271D] transition-colors cursor-pointer"
          title="Cerrar ayuda"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#9B2226] text-white flex items-center justify-center font-bold text-2xl shadow-md border border-amber-400/40">
            ?
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FFFDF8]">
              ¿Cómo usar este Buscador de Compromisos?
            </h3>
            <p className="text-xs text-[#B8A490]">Guía sencilla para hermanas y hermanos del campo</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-[#D8C6B2]">
          <div className="flex items-start gap-3 bg-[#1A140F] p-3.5 rounded-2xl border border-[#3E3024]">
            <div className="w-9 h-9 rounded-xl bg-amber-950 text-amber-300 border border-amber-700/60 flex items-center justify-center shrink-0 font-bold">
              1
            </div>
            <div>
              <h4 className="font-bold text-[#FFFDF8] flex items-center gap-1.5">
                <Search className="w-4 h-4 text-amber-400" />
                <span>Búsqueda Mágica por DNI o Nombre</span>
              </h4>
              <p className="text-xs text-[#A89481] mt-0.5">
                En el recuadro central, ingresa los 8 números de tu DNI o tu nombre. Si coincide, la pantalla se transformará de inmediato mostrando tu lámina oficial en gigante.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#1A140F] p-3.5 rounded-2xl border border-[#3E3024]">
            <div className="w-9 h-9 rounded-xl bg-sky-950 text-sky-300 border border-sky-700/60 flex items-center justify-center shrink-0 font-bold">
              2
            </div>
            <div>
              <h4 className="font-bold text-[#FFFDF8] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Botones de los 8 Territorios</span>
              </h4>
              <p className="text-xs text-[#A89481] mt-0.5">
                Toca los botones grandes de Antilla, Pomacanchi, Accha, Colcha, Omacha, Ccapi, Huanoquite o CEDEP AYLLU para ver a todos los líderes de esa zona reunidos.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#1A140F] p-3.5 rounded-2xl border border-[#3E3024]">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700/60 flex items-center justify-center shrink-0 font-bold">
              3
            </div>
            <div>
              <h4 className="font-bold text-[#FFFDF8] flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Guardar Imagen (JPG)</span>
              </h4>
              <p className="text-xs text-[#A89481] mt-0.5">
                Dentro de la lámina gigante, pulsa el botón grande "Guardar Imagen (JPG)" para descargar el archivo en tu celular o computadora. Podrás imprimirlo o compartirlo en WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#1A140F] p-3.5 rounded-2xl border border-[#3E3024]">
            <div className="w-9 h-9 rounded-xl bg-purple-950 text-purple-300 border border-purple-700/60 flex items-center justify-center shrink-0 font-bold">
              4
            </div>
            <div>
              <h4 className="font-bold text-[#FFFDF8] flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-purple-400" />
                <span>Lectura por Voz Alta</span>
              </h4>
              <p className="text-xs text-[#A89481] mt-0.5">
                Si deseas que el celular o la computadora te lea el compromiso en voz clara, pulsa el botón "Escuchar Voz".
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#3B2C21] flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#9B2226] hover:bg-[#B91C1C] text-white font-bold text-sm transition-all cursor-pointer shadow-md border border-amber-400/40"
          >
            ¡Entendido, Comenzar!
          </button>
        </div>
      </div>
    </div>
  );
};
