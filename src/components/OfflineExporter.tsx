import React, { useState } from 'react';
import { Download, CheckCircle, HardDrive, X } from 'lucide-react';
import { PARTICIPANTES, TERRITORIOS } from '../data/participants';

interface OfflineExporterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfflineExporter: React.FC<OfflineExporterProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleGenerateAndDownloadSingleFileHtml = () => {
    const participantsJson = JSON.stringify(PARTICIPANTES, null, 2);
    const territoriosJson = JSON.stringify(TERRITORIOS, null, 2);

    const singleFileHtmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compromisos Oficiales Escuela de Líderes CEDEP Ayllu (Versión Offline)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Fraunces:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #181411; color: #F4ECE1; }
    .font-display { font-family: 'Fraunces', serif; }
    .andean-border {
      background: repeating-linear-gradient(45deg, #D97706 0, #D97706 10px, #B91C1C 10px, #B91C1C 20px, #059669 20px, #059669 30px, #0284C7 30px, #0284C7 40px);
      height: 8px;
    }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #18130E; }
    ::-webkit-scrollbar-thumb { background: #D97706; border-radius: 4px; }
  </style>
</head>
<body class="p-3 sm:p-6 antialiased">
  <div class="max-w-6xl mx-auto">
    <div class="andean-border rounded-t-xl"></div>
    <header class="bg-[#221A14] p-6 rounded-b-2xl shadow-xl border border-[#3E3024] flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-[#9B2226] text-white rounded-xl flex items-center justify-center font-bold text-2xl border border-amber-400/40">CA</div>
        <div>
          <h1 class="font-display text-2xl font-bold text-amber-400">CEDEP AYLLU</h1>
          <p class="text-xs text-[#A89481] font-semibold">Escuela de Líderes · 30 Compromisos Oficiales (Modo Offline USB)</p>
        </div>
      </div>
      <div class="bg-[#2D2118] px-4 py-2 rounded-xl text-xs font-bold text-amber-300 border border-[#4E392B]">
        ✓ 100% Funcional sin Internet
      </div>
    </header>

    <div class="bg-[#221A14] p-6 sm:p-8 rounded-3xl shadow-2xl border-2 border-[#4E3D2E] mb-8 text-center">
      <h2 class="font-display text-2xl sm:text-3xl font-extrabold text-[#FFFDF8] mb-2">Búsqueda Mágica de Compromisos</h2>
      <p class="text-sm text-[#B8A490] mb-4">Ingresa tu DNI o tu Nombre para ver tu lámina oficial en tamaño gigante:</p>
      
      <div class="max-w-xl mx-auto flex gap-2">
        <input id="searchInput" type="text" placeholder="Ingresa tu DNI o tu Nombre..." class="w-full text-xl p-4 rounded-2xl border-2 border-[#4E3D2E] bg-[#18130E] text-white focus:outline-none focus:border-amber-500 font-display">
        <button onclick="buscarCompromiso()" class="bg-[#9B2226] text-white px-6 py-4 rounded-2xl font-bold text-lg hover:bg-[#B91C1C]">Buscar</button>
      </div>

      <div id="quickButtons" class="mt-4 flex flex-wrap justify-center gap-2 text-xs">
        <button onclick="setSearch('Angélica Meza')" class="bg-[#2D2219] text-amber-200 border border-[#48382B] font-bold px-3 py-1.5 rounded-lg">Angélica Meza (Antilla)</button>
        <button onclick="setSearch('Gustavo Apaza')" class="bg-[#2D2219] text-amber-200 border border-[#48382B] font-bold px-3 py-1.5 rounded-lg">Gustavo Apaza (Pomacanchi)</button>
        <button onclick="setSearch('Paulina Méndez')" class="bg-[#2D2219] text-amber-200 border border-[#48382B] font-bold px-3 py-1.5 rounded-lg">Paulina Méndez (Accha)</button>
        <button onclick="setSearch('Florencia Llamocca')" class="bg-[#2D2219] text-amber-200 border border-[#48382B] font-bold px-3 py-1.5 rounded-lg">Florencia Llamocca (Omacha)</button>
      </div>
    </div>

    <!-- Modal Gigante con Barra de Scroll y Botones Grandes -->
    <div id="modalGigante" class="fixed inset-0 z-50 bg-black/92 backdrop-blur-md hidden flex-col items-center justify-start p-3 sm:p-6 overflow-y-auto">
      <div class="w-full max-w-4xl bg-[#221A14] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-[#5E4735] relative text-left my-auto">
        <div class="flex justify-between items-center mb-4 pb-3 border-b border-[#3E2E22]">
          <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">Lámina Oficial de Compromiso</span>
          <button onclick="cerrarModal()" class="bg-[#9B2226] hover:bg-[#B91C1C] text-white px-5 py-2.5 rounded-xl font-extrabold text-sm border border-amber-400/50">
            ← Volver al Buscador
          </button>
        </div>

        <div id="modalContent"></div>

        <div class="mt-8 pt-4 border-t border-amber-900/30 flex flex-wrap justify-between items-center gap-3">
          <button onclick="descargarJpgCanvas()" class="bg-[#9B2226] hover:bg-[#B91C1C] text-white font-extrabold text-lg px-8 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 border border-amber-400/60">
            📥 Guardar Imagen (JPG)
          </button>
          <button onclick="escucharVozOffline()" class="bg-[#2D2219] text-amber-200 font-bold px-5 py-3 rounded-2xl border border-amber-600/40">
            🔊 Escuchar en Voz Alta
          </button>
          <button onclick="cerrarModal()" class="bg-[#9B2226] hover:bg-[#B91C1C] text-white font-extrabold px-6 py-3.5 rounded-2xl border border-amber-400/50">
            ← Volver al Buscador
          </button>
        </div>
      </div>
    </div>

    <div class="mb-4 flex items-center justify-between">
      <h3 class="font-display text-2xl font-bold text-white">Navegar por Territorios:</h3>
      <span class="text-sm font-bold text-[#A89481]">30 Participantes Registrados</span>
    </div>

    <div id="territoriosContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"></div>

    <div id="participantesContainer" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
  </div>

  <script>
    const participantes = ${participantsJson};
    const territorios = ${territoriosJson};
    let seleccionado = null;

    function renderTerritorios() {
      const container = document.getElementById('territoriosContainer');
      container.innerHTML = territorios.map(t => {
        const count = participantes.filter(p => p.territorio === t.nombre).length;
        return \`
          <button onclick="filtrarTerritorio('\${t.nombre}')" class="p-5 rounded-2xl text-left bg-[#221A14] hover:bg-[#2B2019] border-2 border-[#4E3D2E] hover:border-amber-400 shadow-lg transition-all">
            <div class="flex justify-between items-center mb-2">
              <span class="font-display text-xl font-bold text-amber-400">\${t.nombre}</span>
              <span class="text-xs bg-[#15100C] text-amber-200 px-2.5 py-1 rounded-full font-bold border border-[#48382C]">\${count} líderes</span>
            </div>
            <p class="text-xs text-[#B8A490] line-clamp-1">\${t.region}</p>
          </button>
        \`;
      }).join('');
    }

    function renderParticipantes(lista) {
      const container = document.getElementById('participantesContainer');
      container.innerHTML = lista.map(p => \`
        <div class="bg-[#221A14] p-6 rounded-2xl border-2 border-[#3E3024] shadow-md flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-2">
              <div>
                <h4 class="font-display text-xl font-bold text-white">\${p.nombre}</h4>
                <p class="text-xs text-[#B8A490]">\${p.territorio} · \${p.comunidad}</p>
              </div>
              <span class="text-xs bg-[#16110D] px-2.5 py-1 rounded-lg font-bold text-emerald-400 border border-[#48382C]">✓ Acreditado(a)</span>
            </div>
            <p class="text-xs font-bold text-amber-400 mb-3">\${p.cargo}</p>
            <div class="bg-[#18130E] p-4 rounded-xl border-l-4 border-amber-600 mb-4">
              <p class="font-display font-bold italic text-base text-[#FFFDF8]">"\${p.compromiso}"</p>
            </div>
          </div>
          <button onclick='abrirGigante(\${JSON.stringify(p)})' class="w-full bg-[#9B2226] hover:bg-[#B91C1C] text-white font-bold py-2.5 rounded-xl border border-amber-400/30">
            Ver en Gigante y Descargar JPG
          </button>
        </div>
      \`).join('');
    }

    function buscarCompromiso() {
      const val = document.getElementById('searchInput').value.trim().toLowerCase();
      if (!val) { renderParticipantes(participantes); return; }
      const match = participantes.filter(p => (p.dni && p.dni.toLowerCase().includes(val)) || p.nombre.toLowerCase().includes(val) || p.territorio.toLowerCase().includes(val) || p.compromiso.toLowerCase().includes(val));
      if (match.length === 1) {
        abrirGigante(match[0]);
      } else {
        renderParticipantes(match);
      }
    }

    document.getElementById('searchInput').addEventListener('input', function(e) {
      const v = e.target.value.trim();
      if (v.length === 8 && /^\\d+$/.test(v)) {
        const exact = participantes.find(p => p.dni === v);
        if (exact) {
          abrirGigante(exact);
        }
      }
    });

    function setSearch(v) {
      document.getElementById('searchInput').value = v;
      buscarCompromiso();
    }

    function filtrarTerritorio(nombre) {
      renderParticipantes(participantes.filter(p => p.territorio === nombre));
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }

    function abrirGigante(p) {
      seleccionado = p;
      document.getElementById('modalContent').innerHTML = \`
        <div class="p-6 sm:p-8 bg-[#1A1410] rounded-2xl border-2 border-[#543F30] text-white">
          <div class="flex justify-between items-center border-b border-amber-500/20 pb-4 mb-6">
            <div>
              <span class="text-xs font-bold uppercase text-amber-400">Escuela de Líderes CEDEP Ayllu</span>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-white">\${p.territorio} · \${p.comunidad}</h2>
            </div>
            <div class="text-right">
              <span class="text-xs uppercase text-emerald-400 font-bold bg-[#120E0B] px-3 py-1.5 rounded-lg border border-[#3E2E22]">✓ Registro Acreditado</span>
            </div>
          </div>
          <h1 class="font-display text-3xl sm:text-5xl font-extrabold text-white">\${p.nombre}</h1>
          <p class="text-base sm:text-xl text-amber-200 font-semibold mb-6">\${p.cargo}</p>
          
          <div class="mb-2 text-xs font-bold text-[#A89481]">
            ↕️ Puedes deslizar la barra para leer todo el compromiso completo:
          </div>

          <!-- Contenedor con barra de desplazamiento para leer todo el compromiso -->
          <div class="p-6 rounded-2xl bg-black/60 border-l-8 border-amber-500 mb-6 max-h-[320px] overflow-y-auto" style="scrollbar-width: thin; scrollbar-color: #D97706 #18130E;">
            <p class="font-display text-2xl sm:text-3xl font-bold italic text-white leading-relaxed">"\${p.compromiso}"</p>
          </div>

          <div class="bg-[#120E0B] p-4 rounded-xl border border-[#3E2E22]">
            <p class="font-semibold text-base text-amber-200">Reflexión Comunal: "\${p.mensajeComunal}"</p>
            <p class="text-xs sm:text-sm text-[#A89481]">Propósito de acción: \${p.propositoAccion}</p>
          </div>
        </div>
      \`;
      document.getElementById('modalGigante').classList.remove('hidden');
      document.getElementById('modalGigante').classList.add('flex');
    }

    function cerrarModal() {
      document.getElementById('modalGigante').classList.add('hidden');
      document.getElementById('modalGigante').classList.remove('flex');
      document.getElementById('searchInput').value = '';
      renderParticipantes(participantes);
    }

    // Direct, infallible Canvas 2D JPG generator (Does not depend on external libraries)
    function descargarJpgCanvas() {
      if (!seleccionado) return;
      const c = document.createElement('canvas');
      const w = 1400;
      const h = 1060;
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');

      // Background
      ctx.fillStyle = '#181310';
      ctx.fillRect(0, 0, w, h);

      // Ribbon
      const colors = ['#D97706', '#9B2226', '#059669', '#0284C7'];
      for (let x = 0; x < w; x += 24) {
        ctx.fillStyle = colors[Math.floor(x / 24) % colors.length];
        ctx.fillRect(x, 0, 24, 16);
        ctx.fillRect(x, h - 16, 24, 16);
      }

      // Border
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 4;
      ctx.strokeRect(35, 51, w - 70, h - 102);

      // Header logo
      ctx.fillStyle = '#9B2226';
      ctx.beginPath();
      ctx.roundRect(70, 70, 76, 76, 18);
      ctx.fill();
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 34px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CA', 108, 102);
      ctx.fillStyle = '#FDE68A';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('AYLLU', 108, 126);

      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('ESCUELA DE LÍDERES CAMPESINOS · PASANTÍA 2026', 165, 74);

      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 30px Georgia, serif';
      ctx.fillText('Territorio ' + seleccionado.territorio, 165, 96);

      ctx.fillStyle = '#A89481';
      ctx.font = '15px sans-serif';
      ctx.fillText(seleccionado.comunidad, 165, 134);

      // Seal (NO DNI)
      const badgeW = 270;
      const badgeX = w - 70 - badgeW;
      ctx.fillStyle = '#120E0B';
      ctx.beginPath();
      ctx.roundRect(badgeX, 82, badgeW, 48, 14);
      ctx.fill();
      ctx.strokeStyle = '#4A3B2F';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#34D399';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✓ REGISTRO ACREDITADO', badgeX + badgeW / 2, 106);

      // Divider
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(70, 170);
      ctx.lineTo(w - 70, 170);
      ctx.stroke();

      // Leader
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('LÍDER / LIDERESA COMUNITARIA:', 70, 190);

      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 42px Georgia, serif';
      ctx.fillText(seleccionado.nombre, 70, 214);

      ctx.fillStyle = '#FDE68A';
      ctx.font = '600 19px sans-serif';
      ctx.fillText(seleccionado.cargo, 70, 264);

      // Helper function to split text into wrapped lines
      function getLines(text, maxW) {
        if (!text) return [];
        const words = text.trim().split(/\\s+/);
        const lines = [];
        let cur = '';
        for (let n = 0; n < words.length; n++) {
          const test = cur ? cur + ' ' + words[n] : words[n];
          if (ctx.measureText(test).width > maxW && cur) {
            lines.push(cur);
            cur = words[n];
          } else {
            cur = test;
          }
        }
        if (cur) lines.push(cur);
        return lines;
      }

      // Dynamic Commitment Box
      const boxW = w - 140; // 1260px
      const boxY = 298;
      ctx.font = 'bold italic 26px Georgia, serif';
      const compLines = getLines(seleccionado.compromiso, boxW - 100);
      const compLineH = 38;
      const boxH = Math.max(185, 48 + compLines.length * compLineH + 28);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.beginPath();
      ctx.roundRect(70, boxY, boxW, boxH, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Thick Gold Left Accent
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.roundRect(70, boxY, 14, boxH, [20, 0, 0, 20]);
      ctx.fill();

      // Decorative quote
      ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.font = 'italic 84px Georgia, serif';
      ctx.fillText('“', 98, boxY + 14);

      // Draw commitment text line by line
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold italic 26px Georgia, serif';
      for (let i = 0; i < compLines.length; i++) {
        ctx.fillText(compLines[i], 120, boxY + 48 + i * compLineH);
      }

      // BOTTOM SECTION: TWO COMPLETELY SEPARATED CARDS
      const bottomY = boxY + boxH + 24;
      const leftCardW = 860;
      const cardGap = 25;
      const rightCardW = boxW - leftCardW - cardGap; // 375px
      const rightCardX = 70 + leftCardW + cardGap; // 955px

      // Measure lines for Left Card (Reflexion & Proposito)
      const innerW = leftCardW - 56;
      ctx.font = 'italic 18px Georgia, serif';
      const refLines = getLines('"' + seleccionado.mensajeComunal + '"', innerW);
      const refLineH = 26;

      ctx.font = '500 15px sans-serif';
      const propLines = getLines(seleccionado.propositoAccion, innerW);
      const propLineH = 22;

      const leftContentH = 20 + 16 + 8 + (refLines.length * refLineH) + 16 + 16 + 8 + (propLines.length * propLineH) + 18;
      const bottomCardH = Math.max(195, leftContentH);

      // DRAW LEFT CARD (REFLEXIÓN COMUNAL Y PROPÓSITO)
      ctx.fillStyle = 'rgba(18, 14, 11, 0.85)';
      ctx.beginPath();
      ctx.roundRect(70, bottomY, leftCardW, bottomCardH, 18);
      ctx.fill();
      ctx.strokeStyle = '#4A3B2F';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      let leftY = bottomY + 20;

      // Reflexion Tag
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('REFLEXIÓN COMUNAL:', 98, leftY);
      leftY += 22;

      // Reflexion text
      ctx.fillStyle = '#FDE68A';
      ctx.font = 'italic 18px Georgia, serif';
      for (let i = 0; i < refLines.length; i++) {
        ctx.fillText(refLines[i], 98, leftY);
        leftY += refLineH;
      }

      // Divider inside Left Card - guarantees NO vertical collision!
      leftY += 12;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(98, leftY);
      ctx.lineTo(70 + leftCardW - 28, leftY);
      ctx.stroke();
      leftY += 14;

      // Proposito Tag
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('PROPÓSITO DE ACCIÓN:', 98, leftY);
      leftY += 22;

      // Proposito text
      ctx.fillStyle = '#E2D7CC';
      ctx.font = '500 15px sans-serif';
      for (let i = 0; i < propLines.length; i++) {
        ctx.fillText(propLines[i], 98, leftY);
        leftY += propLineH;
      }

      // DRAW RIGHT CARD (EJE TEMÁTICO DE ACCIÓN)
      ctx.fillStyle = 'rgba(18, 14, 11, 0.85)';
      ctx.beginPath();
      ctx.roundRect(rightCardX, bottomY, rightCardW, bottomCardH, 18);
      ctx.fill();
      ctx.strokeStyle = '#4A3B2F';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = 'bold 17px sans-serif';
      const ejeLines = getLines(seleccionado.ejeTematico, rightCardW - 40);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#A89481';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('EJE TEMÁTICO DE ACCIÓN:', rightCardX + rightCardW / 2, bottomY + 28);

      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 17px sans-serif';
      for (let i = 0; i < ejeLines.length; i++) {
        ctx.fillText(ejeLines[i], rightCardX + rightCardW / 2, bottomY + 54 + i * 24);
      }

      const ejeDividerY = bottomY + 54 + (ejeLines.length * 24) + 12;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rightCardX + 35, ejeDividerY);
      ctx.lineTo(rightCardX + rightCardW - 35, ejeDividerY);
      ctx.stroke();

      ctx.fillStyle = '#8E7B6C';
      ctx.font = '12px sans-serif';
      ctx.fillText('Escuela de Líderes Campesinos', rightCardX + rightCardW / 2, ejeDividerY + 18);
      ctx.fillStyle = '#C8B6A2';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('CEDEP AYLLU · 2026', rightCardX + rightCardW / 2, ejeDividerY + 36);

      // Footer
      ctx.textAlign = 'left';
      ctx.fillStyle = '#8E7B6C';
      ctx.font = '12px sans-serif';
      ctx.fillText('Escuela de Líderes CEDEP Ayllu · Sede Regional Cusco y Apurímac · Pasantía Vivencial 2026', 70, h - 38);

      // Download
      c.toBlob(blob => {
        if (!blob) return;
        const link = document.createElement('a');
        link.download = 'Compromiso_' + seleccionado.nombre.replace(/\\s+/g, '_') + '.jpg';
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 'image/jpeg', 0.95);
    }

    function escucharVozOffline() {
      if ('speechSynthesis' in window && seleccionado) {
        const text = 'Compromiso de ' + seleccionado.nombre + '. ' + seleccionado.compromiso;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'es-PE';
        window.speechSynthesis.speak(u);
      }
    }

    renderTerritorios();
    renderParticipantes(participantes);
  </script>
</body>
</html>`;

    const blob = new Blob([singleFileHtmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'compromisos_escuela_lideres_cedep_ayllu_offline.html';
    link.click();
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#221A14] text-[#F5EBE1] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#5E4735] relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#A89481] hover:text-white hover:bg-[#34271D] transition-colors cursor-pointer"
          title="Cerrar ventana"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#005F73] text-white flex items-center justify-center font-bold shadow-md border border-[#0A9396]/40">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FFFDF8]">
              Descargar Versión para USB (Offline)
            </h3>
            <p className="text-xs text-[#B8A490]">Para comunidades campesinas sin internet</p>
          </div>
        </div>

        <p className="text-sm text-[#D8C6B2] leading-relaxed mb-4">
          Esta función crea un <strong>único archivo .HTML independiente</strong> que contiene:
        </p>

        <ul className="text-xs sm:text-sm text-[#D8C6B2] space-y-2 mb-6 bg-[#18130E] p-4 rounded-2xl border border-[#3E3024]">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Los 30 participantes oficiales con sus compromisos reales.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Búsqueda mágica interna y navegación por los 8 territorios.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Generador directo de láminas JPG para guardar e imprimir sin DNI visible.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>No requiere conexión a internet una vez descargado.</span>
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleGenerateAndDownloadSingleFileHtml}
            className={`w-full py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 ${
              downloaded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#005F73] hover:bg-[#0A9396] text-white border border-[#0A9396]/50'
            }`}
          >
            <Download className="w-5 h-5" />
            <span>{downloaded ? '¡Archivo Descargado!' : 'Descargar Archivo .HTML'}</span>
          </button>
        </div>

        <p className="text-[11px] text-[#A89481] text-center mt-3">
          Copia el archivo descargado a una memoria USB o pásalo por Bluetooth a celulares de líderes.
        </p>
      </div>
    </div>
  );
};
