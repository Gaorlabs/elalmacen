import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { useApp } from '../context/AppContext';
import {
  QrCode,
  Download,
  Copy,
  Check,
  Share2,
  Printer,
  X,
  ExternalLink,
  Sparkles,
  Smartphone
} from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const { businessConfig, showToast } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Dynamically derive current web catalog URL or fallback
  const catalogUrl = window.location.origin + window.location.pathname;

  useEffect(() => {
    if (!isOpen) return;

    // Generate high-resolution QR Code onto hidden or preview canvas
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(catalogUrl, {
          width: 600,
          margin: 2,
          color: {
            dark: '#0F172A',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'H'
        });
        setQrDataUrl(url);

        if (canvasRef.current) {
          QRCode.toCanvas(canvasRef.current, catalogUrl, {
            width: 280,
            margin: 2,
            color: {
              dark: '#0F172A',
              light: '#FFFFFF'
            },
            errorCorrectionLevel: 'H'
          });
        }
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };

    generateQR();
  }, [isOpen, catalogUrl]);

  if (!isOpen) return null;

  // Handle Download Branded PNG image
  const handleDownloadPNG = () => {
    // Create an offscreen composite canvas with logo and title for printing / downloading
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 800;
    exportCanvas.height = 1000;
    const ctx = exportCanvas.getContext('2d');

    if (!ctx) return;

    // 1. Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, 1000);
    bgGradient.addColorStop(0, '#0F172A');
    bgGradient.addColorStop(1, '#1E293B');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 800, 1000);

    // 2. White main card background
    ctx.fillStyle = '#FFFFFF';
    ctx.roundRect(50, 60, 700, 880, 40);
    ctx.fill();

    // 3. Top accent gradient header bar inside card
    const headerGrad = ctx.createLinearGradient(50, 60, 750, 60);
    headerGrad.addColorStop(0, '#FA436B');
    headerGrad.addColorStop(1, '#FA7088');
    ctx.fillStyle = headerGrad;
    ctx.roundRect(50, 60, 700, 140, [40, 40, 0, 0]);
    ctx.fill();

    // Header Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(businessConfig.name.toUpperCase(), 400, 125);

    ctx.font = '700 20px sans-serif';
    ctx.fillStyle = '#FEF08A';
    ctx.fillText(businessConfig.tagline || 'CATÁLOGO DIGITAL PARA MÓVILES', 400, 165);

    // Subtitle instructions
    ctx.fillStyle = '#334155';
    ctx.font = '800 26px sans-serif';
    ctx.fillText('¡ESCANEA EL CÓDIGO QR!', 400, 260);

    ctx.font = '600 20px sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('Abre la cámara de tu celular y mira nuestros productos en vivo', 400, 295);

    // Render QR image in middle
    const img = new Image();
    img.onload = () => {
      // Draw QR image
      ctx.drawImage(img, 175, 330, 450, 450);

      // Bottom footer branding
      ctx.fillStyle = '#F8FAFC';
      ctx.roundRect(90, 810, 620, 90, 20);
      ctx.fill();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.font = '800 20px monospace';
      ctx.fillText(catalogUrl.replace(/^https?:\/\//, ''), 400, 850);

      ctx.fillStyle = '#059669';
      ctx.font = '700 16px sans-serif';
      ctx.fillText('📲 WhatsApp Pedidos Directos: ' + businessConfig.whatsappDisplay, 400, 880);

      // Trigger download
      const link = document.createElement('a');
      link.download = `Codigo_QR_${businessConfig.name.replace(/\s+/g, '_')}_Catalogo.png`;
      link.href = exportCanvas.toDataURL('image/png', 1.0);
      link.click();

      showToast('¡Imagen QR descargada en alta resolución!', 'success');
    };
    img.src = qrDataUrl;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(catalogUrl);
      setIsCopied(true);
      showToast('¡Enlace del catálogo copiado al portapapeles!', 'success');
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      showToast('No se pudo copiar el enlace', 'warning');
    }
  };

  const handleShareWhatsApp = () => {
    const text = `👋 *¡Hola! Te comparto el Catálogo Digital de ${businessConfig.name}* 🛍️\n\nIngresa desde tu celular para ver todas nuestras novedades, ofertas y hacer tus pedidos directo por WhatsApp:\n\n🔗 ${catalogUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-slate-800 overflow-hidden relative my-auto transition-all">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#FA436B] via-[#FF5876] to-[#FA7088] p-4 text-white flex items-center justify-between relative">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
              <QrCode className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-black text-base uppercase tracking-tight">
                Código QR del Catálogo
              </h3>
              <p className="text-[11px] text-rose-100 font-medium">
                Listo para compartir o descargar e imprimir
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white cursor-pointer transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 text-center">
          {/* Printable Brand Badge & Canvas Container */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-rose-50/50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-inner space-y-3">
            <div className="flex items-center justify-center gap-2">
              <img
                src={businessConfig.logoUrl}
                alt={businessConfig.name}
                className="w-7 h-7 object-contain rounded-md bg-white p-0.5 border border-slate-200"
              />
              <span className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white">
                {businessConfig.name}
              </span>
            </div>

            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-rose-500" />
              <span>Escanea con tu celular para ver la tienda</span>
            </p>

            {/* Canvas QR Code Display */}
            <div className="bg-white p-4 rounded-2xl inline-block shadow-md border border-slate-200 mx-auto">
              <canvas ref={canvasRef} className="mx-auto rounded-lg max-w-full h-auto" />
            </div>

            <div className="text-[11px] text-slate-500 font-mono truncate px-2">
              {catalogUrl}
            </div>
          </div>

          {/* Actions Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleDownloadPNG}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#FA436B] to-[#FA7088] text-white font-black text-xs uppercase tracking-wide shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer col-span-2 sm:col-span-1"
            >
              <Download className="w-4 h-4" />
              <span>Descargar QR (PNG)</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wide shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer col-span-2 sm:col-span-1"
            >
              <Share2 className="w-4 h-4" />
              <span>Enviar x WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{isCopied ? '¡Copiado!' : 'Copiar Link'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Imprimir QR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
