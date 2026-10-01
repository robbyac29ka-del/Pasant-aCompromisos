import { Participant, TERRITORIOS } from '../data/participants';

// Helper function: Splits text cleanly into an array of lines based on canvas width
export function getWrappedLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  if (!text) return [];
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

export async function downloadCommitmentJpg(
  participant: Participant, 
  theme: 'cordillera' | 'textil' | 'laguna' | 'terrazas' | 'pergamino' = 'cordillera'
): Promise<void> {
  // Wait for fonts to be ready so measureText calculates accurately
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue even if font ready promise fails
    }
  }

  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('No se pudo inicializar el lienzo Canvas 2D.');
      }

      // Fixed width 1400px; height is 1060px for ample, generous vertical spacing
      const width = 1400;
      const height = 1060;
      canvas.width = width;
      canvas.height = height;

      // 1. Background Theme Colors
      let bgColor = '#181310';
      let accentColor = '#D97706';

      if (theme === 'textil') {
        bgColor = '#260B0B';
        accentColor = '#DC2626';
      } else if (theme === 'laguna') {
        bgColor = '#081D28';
        accentColor = '#0284C7';
      } else if (theme === 'terrazas') {
        bgColor = '#061E14';
        accentColor = '#059669';
      } else if (theme === 'pergamino') {
        bgColor = '#221A14';
        accentColor = '#F59E0B';
      }

      // Fill main canvas background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // 2. Decorative Andean Border Ribbon at Top and Bottom
      const ribbonHeight = 16;
      const ribbonColors = ['#D97706', '#9B2226', '#059669', '#0284C7'];
      const segmentWidth = 24;
      for (let x = 0; x < width; x += segmentWidth) {
        const colorIdx = Math.floor(x / segmentWidth) % ribbonColors.length;
        ctx.fillStyle = ribbonColors[colorIdx];
        ctx.fillRect(x, 0, segmentWidth, ribbonHeight);
        ctx.fillRect(x, height - ribbonHeight, segmentWidth, ribbonHeight);
      }

      // 3. Card Outer Frame & Inner Border
      const margin = 35;
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 4;
      ctx.strokeRect(margin, margin + ribbonHeight, width - margin * 2, height - (margin * 2 + ribbonHeight * 2));

      // 4. Header Zone: Logo & Institution Badges
      const contentX = 70;
      const logoY = 70;
      const logoSize = 76;

      // Logo container
      ctx.fillStyle = '#9B2226';
      ctx.beginPath();
      ctx.roundRect(contentX, logoY, logoSize, logoSize, 18);
      ctx.fill();
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Logo acronym
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 34px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CA', contentX + logoSize / 2, logoY + logoSize / 2 - 6);

      ctx.fillStyle = '#FDE68A';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('AYLLU', contentX + logoSize / 2, logoY + logoSize / 2 + 20);

      // Titles next to logo
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('ESCUELA DE LÍDERES CAMPESINOS · PASANTÍA 2026', contentX + logoSize + 22, logoY + 4);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 30px Georgia, serif';
      ctx.fillText(`Territorio ${participant.territorio}`, contentX + logoSize + 22, logoY + 25);

      const territorioData = TERRITORIOS.find(t => t.nombre === participant.territorio);
      ctx.fillStyle = '#C8B6A2';
      ctx.font = '500 15px sans-serif';
      ctx.fillText(`${territorioData?.region || ''} · ${participant.comunidad}`, contentX + logoSize + 22, logoY + 62);

      // Official Verification Badge at Top Right (NO DNI DISPLAYED)
      const badgeW = 270;
      const badgeH = 48;
      const badgeX = width - contentX - badgeW;
      const badgeY = logoY + 12;

      ctx.fillStyle = '#120E0B';
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 14);
      ctx.fill();
      ctx.strokeStyle = '#4A3B2F';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#34D399';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✓ REGISTRO ACREDITADO', badgeX + badgeW / 2, badgeY + badgeH / 2);

      // 5. Divider Line
      let currentY = 170;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(contentX, currentY);
      ctx.lineTo(width - contentX, currentY);
      ctx.stroke();

      // 6. Leader Name & Role
      currentY = 190;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('LÍDER / LIDERESA COMUNITARIA:', contentX, currentY);

      currentY += 24;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 42px Georgia, serif';
      ctx.fillText(participant.nombre, contentX, currentY);

      currentY += 50;
      ctx.fillStyle = '#FDE68A';
      ctx.font = '600 19px sans-serif';
      ctx.fillText(participant.cargo, contentX, currentY);

      currentY += 34;

      // 7. THE GIANT COMMITMENT BOX (DYNAMIC HEIGHT, GUARANTEED NO CLIPPING)
      const boxW = width - contentX * 2; // 1260px
      const boxY = currentY;

      // Calculate commitment text wrapped lines
      ctx.font = 'bold italic 26px Georgia, serif';
      const maxCommitmentWidth = boxW - 100; // 1160px
      const commitmentLineHeight = 38;
      const commitmentLines = getWrappedLines(ctx, participant.compromiso, maxCommitmentWidth);

      // Dynamic box height: adapts to commitment length with comfortable padding
      const commitmentContentH = commitmentLines.length * commitmentLineHeight;
      const boxH = Math.max(185, 48 + commitmentContentH + 28);

      // Box background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.beginPath();
      ctx.roundRect(contentX, boxY, boxW, boxH, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Thick Gold Left Accent Bar
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.roundRect(contentX, boxY, 14, boxH, [20, 0, 0, 20]);
      ctx.fill();

      // Giant decorative quotation mark
      ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.font = 'italic 84px Georgia, serif';
      ctx.fillText('“', contentX + 28, boxY + 14);

      // Draw Commitment text line by line with absolute precision
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold italic 26px Georgia, serif';
      for (let i = 0; i < commitmentLines.length; i++) {
        ctx.fillText(commitmentLines[i], contentX + 50, boxY + 48 + i * commitmentLineHeight);
      }

      // 8. BOTTOM SECTION: TWO COMPLETELY SEPARATED CARDS (LEFT: REFLEXIÓN Y PROPÓSITO, RIGHT: EJE DE ACCIÓN)
      // This guarantees that texts NEVER cross, collide, or touch horizontally or vertically!
      const bottomSectionY = boxY + boxH + 24;

      // Dimensions for the 2 side-by-side cards
      const leftCardW = 860;
      const cardGap = 25;
      const rightCardW = boxW - leftCardW - cardGap; // 1260 - 860 - 25 = 375px
      const rightCardX = contentX + leftCardW + cardGap; // 70 + 860 + 25 = 955px

      // Measure lines for Reflexión Comunal & Propósito de Acción inside the Left Card
      const innerLeftW = leftCardW - 56; // 804px usable width inside card padding

      ctx.font = 'italic 18px Georgia, serif';
      const reflexionLines = getWrappedLines(ctx, `"${participant.mensajeComunal}"`, innerLeftW);
      const reflexionLineH = 26;

      ctx.font = '500 15px sans-serif';
      const propositoLines = getWrappedLines(ctx, participant.propositoAccion, innerLeftW);
      const propositoLineH = 22;

      // Calculate total required height for Left Card
      // Padding Top (20) + Label (16) + Gap (8) + Reflexion Lines + Gap (14) + Label (16) + Gap (8) + Proposito Lines + Padding Bottom (18)
      const leftContentH = 20 + 16 + 8 + (reflexionLines.length * reflexionLineH) + 16 + 16 + 8 + (propositoLines.length * propositoLineH) + 18;
      const bottomCardH = Math.max(195, leftContentH);

      // --- DRAW LEFT CARD (REFLEXIÓN COMUNAL Y PROPÓSITO) ---
      ctx.fillStyle = 'rgba(18, 14, 11, 0.85)';
      ctx.beginPath();
      ctx.roundRect(contentX, bottomSectionY, leftCardW, bottomCardH, 18);
      ctx.fill();
      ctx.strokeStyle = '#4A3B2F';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Left card subtle golden top accent
      ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.beginPath();
      ctx.roundRect(contentX + 2, bottomSectionY + 2, leftCardW - 4, 3, 2);
      ctx.fill();

      let leftCursorY = bottomSectionY + 20;

      // 8a. Reflexión Comunal Tag
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('REFLEXIÓN COMUNAL:', contentX + 28, leftCursorY);

      leftCursorY += 22;

      // 8b. Reflexión Comunal Text
      ctx.fillStyle = '#FDE68A';
      ctx.font = 'italic 18px Georgia, serif';
      for (let i = 0; i < reflexionLines.length; i++) {
        ctx.fillText(reflexionLines[i], contentX + 28, leftCursorY);
        leftCursorY += reflexionLineH;
      }

      // Safe separation between Reflection and Propósito (16px gap)
      leftCursorY += 12;

      // Divider line inside Left Card
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(contentX + 28, leftCursorY);
      ctx.lineTo(contentX + leftCardW - 28, leftCursorY);
      ctx.stroke();

      leftCursorY += 14;

      // 8c. Propósito de Acción Tag
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('PROPÓSITO DE ACCIÓN:', contentX + 28, leftCursorY);

      leftCursorY += 22;

      // 8d. Propósito de Acción Text (Never overlaps because it is drawn sequentially below!)
      ctx.fillStyle = '#E2D7CC';
      ctx.font = '500 15px sans-serif';
      for (let i = 0; i < propositoLines.length; i++) {
        ctx.fillText(propositoLines[i], contentX + 28, leftCursorY);
        leftCursorY += propositoLineH;
      }

      // --- DRAW RIGHT CARD (EJE TEMÁTICO DE ACCIÓN) ---
      ctx.fillStyle = 'rgba(18, 14, 11, 0.85)';
      ctx.beginPath();
      ctx.roundRect(rightCardX, bottomSectionY, rightCardW, bottomCardH, 18);
      ctx.fill();
      ctx.strokeStyle = '#4A3B2F';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Right card subtle accent
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.roundRect(rightCardX + 2, bottomSectionY + 2, rightCardW - 4, 3, 2);
      ctx.fill();

      // Measure Eje Temático lines inside right card
      ctx.font = 'bold 17px sans-serif';
      const ejeLines = getWrappedLines(ctx, participant.ejeTematico, rightCardW - 40);

      // Centered content inside right card
      ctx.textAlign = 'center';

      // Header Tag
      ctx.fillStyle = '#A89481';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('EJE TEMÁTICO DE ACCIÓN:', rightCardX + rightCardW / 2, bottomSectionY + 28);

      // Value (bold amber)
      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 17px sans-serif';
      for (let i = 0; i < ejeLines.length; i++) {
        ctx.fillText(ejeLines[i], rightCardX + rightCardW / 2, bottomSectionY + 54 + i * 24);
      }

      // Center divider
      const ejeDividerY = bottomSectionY + 54 + (ejeLines.length * 24) + 12;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rightCardX + 35, ejeDividerY);
      ctx.lineTo(rightCardX + rightCardW - 35, ejeDividerY);
      ctx.stroke();

      // Institutional note inside right card
      ctx.fillStyle = '#8E7B6C';
      ctx.font = '12px sans-serif';
      ctx.fillText('Escuela de Líderes Campesinos', rightCardX + rightCardW / 2, ejeDividerY + 18);
      ctx.fillStyle = '#C8B6A2';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('CEDEP AYLLU · 2026', rightCardX + rightCardW / 2, ejeDividerY + 36);

      // 9. Footer Text at Bottom of Card
      ctx.textAlign = 'left';
      ctx.fillStyle = '#8E7B6C';
      ctx.font = '12px sans-serif';
      ctx.fillText(
        'Escuela de Líderes CEDEP Ayllu · Sede Regional Cusco y Apurímac · Pasantía Vivencial de Gobernanza 2026', 
        contentX, 
        height - ribbonHeight - 22
      );

      // 10. Generate High-Quality JPEG Blob & Trigger Download
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('No se pudo generar el archivo JPG del lienzo.'));
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const cleanName = participant.nombre.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '_');
        const cleanTerritory = participant.territorio.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '_');
        
        link.download = `Compromiso_Oficial_${cleanName}_${cleanTerritory}.jpg`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          URL.revokeObjectURL(url);
          resolve();
        }, 1000);
      }, 'image/jpeg', 0.95);

    } catch (err) {
      console.error('Error generating canvas JPG:', err);
      reject(err);
    }
  });
}
