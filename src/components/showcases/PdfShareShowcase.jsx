"use client";

import { useEffect, useRef, useState } from "react";
import {
  Home, Users, Box, FileText, Wallet, Settings,
  MousePointer2, ArrowLeft, Mic, Smile, Paperclip, Camera,
  FileIcon, ChevronLeft, Share2, Bookmark, PenLine, Grid3x3, Maximize,
} from "lucide-react";
import useInView from "@/hooks/useInView";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const ease = (t) => 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, t)));

const BUSINESS_NAME = "ServiPro Hernández";
const BUSINESS_PHONE = "55 4821 0036";
const BUSINESS_EMAIL = "hola@serviprohdz.mx";
const CLIENT_NAME = "Renata Solís";
const CLIENT_PHONE = "999 214 5583";
const PRODUCT_NAME = "Instalación y Configuración Alarma";
const PRODUCT_PRICE = 600;
const PRODUCT_QTY = 5;
const SUBTOTAL = PRODUCT_PRICE * PRODUCT_QTY;
const IVA = Math.round(SUBTOTAL * 0.16);
const TOTAL = SUBTOTAL + IVA;
const FOLIO = "DAC-4032";
const FILE_NAME = "b294a4d7-c659-4a24-a05f-bf466fc53aea.pdf";

function useCursor(phoneRef, scaleRef) {
  const [pos, setPos] = useState({ x: 150, y: 40, visible: false });
  const [pulse, setPulse] = useState(false);
  const moveTo = (ref) => {
    if (!ref.current || !phoneRef.current) return;
    const t = ref.current.getBoundingClientRect();
    const b = phoneRef.current.getBoundingClientRect();
    const s = scaleRef.current || 1;
    setPos({
      x: (t.left - b.left + t.width / 2) / s,
      y: (t.top - b.top + t.height / 2) / s,
      visible: true,
    });
  };
  const moveToXY = (x, y) => {
    const s = scaleRef.current || 1;
    setPos({ x: x / s, y: y / s, visible: true });
  };
  const click = async () => { setPulse(true); await wait(260); setPulse(false); };
  const hide = () => setPos((p) => ({ ...p, visible: false }));
  return { pos, pulse, moveTo, moveToXY, click, hide };
}

export default function PdfShareShowcase() {
  const phoneRef = useRef(null);
  const pdfBtnRef = useRef(null);
  const waIconRef = useRef(null);
  const attachmentRef = useRef(null);
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const [screen, setScreen] = useState("list");
  const [swipe, setSwipe] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(0);
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);

  const cursor = useCursor(phoneRef, scaleRef);
  const isVisible = useInView(containerRef, 0.2);

  useEffect(() => {
    function fit() {
      if (!containerRef.current || !stageRef.current) return;
      const availH = containerRef.current.clientHeight;
      const availW = containerRef.current.clientWidth;
      const needH = stageRef.current.scrollHeight;
      const needW = stageRef.current.scrollWidth;
      const s = Math.min(1, availH / needH, availW / needW);
      const val = Number.isFinite(s) && s > 0 ? s : 1;
      setScale(val);
      scaleRef.current = val;
    }
    fit();
    window.addEventListener("resize", fit);
    const t = setTimeout(fit, 300);
    return () => { window.removeEventListener("resize", fit); clearTimeout(t); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let stopped = false;
    const guard = () => stopped;

    async function animateVal(from, to, ms, setter) {
      const start = performance.now();
      return new Promise((resolve) => {
        function step(now) {
          if (guard()) return resolve();
          const p = Math.min(1, (now - start) / ms);
          setter(from + (to - from) * ease(p));
          if (p < 1) requestAnimationFrame(step);
          else resolve();
        }
        requestAnimationFrame(step);
      });
    }

    async function run() {
      while (!guard()) {
        setScreen("list"); setSwipe(0); setSheetOpen(0); cursor.hide();
        await wait(1000); if (guard()) return;

        const cardEl = phoneRef.current?.querySelector("[data-card-anchor]");
        if (cardEl && phoneRef.current) {
          const r = cardEl.getBoundingClientRect();
          const b = phoneRef.current.getBoundingClientRect();
          const s = scaleRef.current || 1;
          const startX = (r.right - b.left) / s - 60;
          const endX = startX - 150;
          const y = (r.top - b.top) / s + r.height / s / 2;
          cursor.moveToXY(startX * s, y * s);
          await wait(400); if (guard()) return;
          await animateVal(0, 1, 650, setSwipe);
          cursor.moveToXY(endX * s, y * s);
          await wait(50); if (guard()) return;
        }
        await wait(500); if (guard()) return;

        cursor.moveTo(pdfBtnRef); await wait(500); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide();
        await animateVal(0, 1, 380, setSheetOpen);
        await wait(700); if (guard()) return;

        cursor.moveTo(waIconRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("whatsapp"); setSheetOpen(0); setSwipe(0);
        await wait(1300); if (guard()) return;

        cursor.moveTo(attachmentRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("pdf"); await wait(2600); if (guard()) return;
      }
    }
    run();
    return () => { stopped = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[320px] w-full items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(120% 100% at 50% 15%, rgba(37,99,235,0.07), transparent 70%)" }}
    >
      <div ref={stageRef} className="relative z-10 flex flex-col items-center" style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
        <div className="float-wrap">
          <div className="tilt-rig" style={{ transform: "perspective(1500px) rotateX(8deg) rotateY(-14deg)" }}>
            <div className="phone-shadow" />
            <div className="phone-bezel">
              <div className="phone-notch" />
              <div ref={phoneRef} className="phone-screen">
                {screen === "list" && <ListScreen swipe={swipe} pdfBtnRef={pdfBtnRef} />}
                {screen === "whatsapp" && <WhatsAppScreen attachmentRef={attachmentRef} />}
                {screen === "pdf" && <PdfScreen />}
                {screen === "list" && sheetOpen > 0 && (
                  <ShareSheet progress={sheetOpen} waIconRef={waIconRef} />
                )}
                <Cursor pos={cursor.pos} pulse={cursor.pulse} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .float-wrap { animation: floatY 6s ease-in-out infinite; }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .tilt-rig { position: relative; }
        .phone-bezel {
          width: 300px; height: 630px;
          background: linear-gradient(160deg,#1b1622,#0c0a12);
          border-radius: 42px; padding: 12px; position: relative;
          box-shadow: 0 2px 0 rgba(255,255,255,.06) inset, 0 40px 80px -20px rgba(0,0,0,.7);
        }
        .phone-notch { position:absolute; top:22px; left:50%; transform:translateX(-50%); width:80px; height:8px; border-radius:6px; background:#000; z-index:5; }
        .phone-screen { width:100%; height:100%; border-radius:32px; overflow:hidden; position:relative; background:#fff; }
        .phone-shadow { position:absolute; left:50%; bottom:-40px; width:220px; height:44px; transform:translateX(-50%); background: radial-gradient(closest-side, rgba(17,24,39,.18), transparent 75%); filter: blur(8px); z-index:-1; }
        .screen-in { animation: screenIn .35s ease; }
        @keyframes screenIn { from{opacity:0; transform:translateX(10px)} to{opacity:1; transform:translateX(0)} }
        .cursor-pulse { animation: cursorPulse .26s ease; }
        @keyframes cursorPulse { 0%{transform:scale(.4); opacity:.9} 100%{transform:scale(2.2); opacity:0} }
      `}</style>
    </div>
  );
}

function Cursor({ pos, pulse }) {
  return (
    <div
      className="absolute z-50 pointer-events-none"
      style={{
        left: pos.x, top: pos.y, transform: "translate(-6px,-4px)",
        transition: "left .5s cubic-bezier(.4,0,.2,1), top .5s cubic-bezier(.4,0,.2,1), opacity .25s",
        opacity: pos.visible ? 1 : 0,
      }}
    >
      {pulse && <span className="absolute rounded-full cursor-pulse" style={{ width: 34, height: 34, left: -10, top: -8, background: "rgba(46,151,221,0.5)" }} />}
      <MousePointer2 size={22} color="#1F1B2E" fill="#fff" strokeWidth={1.5} />
    </div>
  );
}

function BottomNav() {
  const items = [
    { icon: Home, label: "Inicio" }, { icon: Users, label: "Clientes" },
    { icon: Box, label: "Productos" }, { icon: FileText, label: "Cotizar", active: true },
    { icon: Wallet, label: "Cobros" }, { icon: Settings, label: "Perfil" },
  ];
  return (
    <div className="flex items-center justify-between px-2.5 py-2.5" style={{ background: "#22163A" }}>
      {items.map(({ icon: Icon, label, active }) => (
        <div key={label} className="flex flex-col items-center gap-0.5">
          <Icon size={15} color={active ? "#fff" : "#8577A8"} />
          <span className="text-[7px] font-semibold" style={{ color: active ? "#fff" : "#8577A8" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function ListScreen({ swipe, pdfBtnRef }) {
  const shift = -140 * swipe;
  return (
    <div className="h-full flex flex-col" style={{ background: "#fff" }}>
      <div className="px-5 pt-5 pb-4 rounded-b-[26px]" style={{ background: "linear-gradient(135deg,#2B1B44,#22163A)" }}>
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl font-extrabold">Cotizaciones</h2>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-white text-[13px] font-bold" style={{ background: "#3FA84A" }}>
            +  Nueva
          </button>
        </div>
        <div className="flex items-center px-3 py-2.5 rounded-2xl mt-4" style={{ background: "#3A2A56" }}>
          <span className="text-[13px]" style={{ color: "#B9AEDD" }}>Buscar cliente...</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-4 pt-3">
        {["CREADA", "ENVIADA", "APROBADA", "PAGADA"].map((t, i) => (
          <div key={t} className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold" style={{ background: i === 0 ? "#15111F" : "#EDF0F5", color: i === 0 ? "#fff" : "#7A8599" }}>{t}</div>
        ))}
      </div>
      <div className="flex-1 px-4 pt-4 relative overflow-hidden">
        <div className="relative" style={{ height: 200 }}>
          <button
            ref={pdfBtnRef}
            className="absolute top-0 right-0 h-full flex flex-col items-center justify-center gap-1.5 rounded-2xl text-white"
            style={{ width: 140, background: "#3FA84A" }}
          >
            <FileIcon size={26} />
            <span className="text-[13px] font-bold">PDF</span>
          </button>
          <div
            data-card-anchor
            className="absolute top-0 left-0 right-0 h-full p-4 rounded-2xl"
            style={{ background: "#F7F9FC", border: "1px solid #E7EBF2", transform: `translateX(${shift}px)` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[11px] font-bold" style={{ background: "#3FA84A" }}>V1</div>
                <span className="text-[15px] font-bold" style={{ color: "#1F1B2E" }}>{CLIENT_NAME}</span>
              </div>
              <span className="text-[15px] font-extrabold" style={{ color: "#E24C4C" }}>${TOTAL.toLocaleString()}.00</span>
            </div>
            <p className="text-[12px] font-semibold mb-2" style={{ color: "#3A3550" }}>{PRODUCT_NAME.toUpperCase()}</p>
            <div className="h-px my-1" style={{ background: "#E7EBF2" }} />
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] px-2 py-1 rounded-md font-bold" style={{ background: "#EDF0F5", color: "#7A8599" }}>{FOLIO}</span>
              <span className="text-[10px]" style={{ color: "#9AA3B4" }}>05/07/26</span>
              <span className="text-[10px] px-2 py-1 rounded-md font-bold" style={{ background: "#E7F0FF", color: "#2F87E0" }}>BORRADOR</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function ShareSheet({ progress, waIconRef }) {
  const apps = [
    { name: "Quick Share", color: "#3B82F6" },
    { name: "WhatsApp Bus.", color: "#25D366" },
    { name: "Claude", color: "#D97757" },
    { name: "WhatsApp", color: "#25D366", target: true },
    { name: "X", color: "#000" },
  ];
  const translateY = 100 - progress * 100;
  return (
    <div className="absolute inset-0 z-40" style={{ background: `rgba(0,0,0,${0.55 * progress})` }}>
      <div
        className="absolute left-0 right-0 bottom-0 rounded-t-3xl px-4 pt-4 pb-6"
        style={{ background: "#1c1c1e", transform: `translateY(${translateY}%)` }}
      >
        <div className="w-10 h-1.5 rounded-full mx-auto mb-4" style={{ background: "#48484a" }} />
        <p className="text-white text-[14px] font-semibold mb-3">Se compartirá 1 archivo</p>
        <div className="flex items-center gap-2 p-2.5 rounded-xl mb-4" style={{ background: "#2c2c2e" }}>
          <FileIcon size={16} color="#fff" />
          <span className="text-[10px] text-white truncate">{FILE_NAME}</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {apps.map((a) => (
            <div key={a.name} ref={a.target ? waIconRef : null} className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: a.color }}>
                <span className="text-white text-[13px] font-bold">{a.name[0]}</span>
              </div>
              <span className="text-[7px] text-center" style={{ color: "#c7c7cc" }}>{a.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhatsAppScreen({ attachmentRef }) {
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#0b141a" }}>
      <div className="px-4 pt-5 pb-3 flex items-center gap-3" style={{ background: "#1f2c34" }}>
        <ArrowLeft size={16} color="#fff" />
        <div className="w-8 h-8 rounded-full" style={{ background: "#3FA84A" }} />
        <div>
          <p className="text-white text-[13px] font-bold">Álvaro Milán</p>
          <p className="text-[9px]" style={{ color: "#8696a0" }}>Cuenta de empresa</p>
        </div>
      </div>
      <div className="flex-1 px-4 pt-6">
        <div ref={attachmentRef} className="rounded-xl overflow-hidden ml-auto" style={{ width: 220, background: "#005c4b" }}>
          <div className="p-3 flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#00806a" }}>
              <FileIcon size={18} color="#fff" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-[10px] leading-tight truncate">{FILE_NAME}</p>
              <p className="text-[9px]" style={{ color: "#8fd6c4" }}>1 página · 4.0 MB · PDF</p>
            </div>
          </div>
          <p className="text-right text-[9px] pr-2 pb-1.5" style={{ color: "#8fd6c4" }}>08:37 ✓✓</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 px-3 py-3" style={{ background: "#1f2c34" }}>
        <Smile size={17} color="#8696a0" />
        <div className="flex-1 rounded-full px-3 py-2 text-[11px]" style={{ background: "#2a3942", color: "#8696a0" }}>Mensaje</div>
        <Paperclip size={16} color="#8696a0" />
        <Camera size={16} color="#8696a0" />
        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#00a884" }}>
          <Mic size={13} color="#fff" />
        </div>
      </div>
    </div>
  );
}

function PdfScreen() {
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#eef0f3" }}>
      <div className="px-3 py-3 flex items-center justify-between" style={{ background: "#3a1414" }}>
        <ChevronLeft size={16} color="#fff" />
        <div className="flex items-center gap-3">
          <Share2 size={14} color="#fff" />
          <Grid3x3 size={14} color="#fff" />
        </div>
      </div>
      <div className="flex-1 px-3 pt-3 overflow-hidden">
        <div className="rounded-md p-4" style={{ background: "#fff" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[13px] font-extrabold" style={{ color: "#1F3A93" }}>{BUSINESS_NAME.toUpperCase()}</p>
              <p className="text-[8px]" style={{ color: "#555" }}>{BUSINESS_PHONE}</p>
              <p className="text-[8px]" style={{ color: "#555" }}>{BUSINESS_EMAIL}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold" style={{ color: "#1F3A93" }}>FOLIO: {FOLIO}</p>
              <p className="text-[8px]" style={{ color: "#555" }}>Fecha: 5/7/2026</p>
            </div>
          </div>
          <div className="h-[2px] mb-3" style={{ background: "#1F3A93" }} />
          <p className="text-[13px] font-extrabold" style={{ color: "#1F1B2E" }}>{CLIENT_NAME.toUpperCase()}</p>
          <p className="text-[9px] mb-3" style={{ color: "#555" }}>{CLIENT_PHONE}</p>

          <div className="flex text-[8px] font-bold text-white py-1.5 px-2 mb-1" style={{ background: "#1F3A93" }}>
            <span className="flex-1">DESCRIPCIÓN DEL SERVICIO</span>
            <span style={{ width: 40 }}>CANT</span>
            <span style={{ width: 40 }}>P.U.</span>
            <span style={{ width: 40 }}>TOTAL</span>
          </div>
          <div className="flex text-[8px] py-1 px-2" style={{ color: "#333" }}>
            <span className="flex-1">{PRODUCT_NAME.toUpperCase()}</span>
            <span style={{ width: 40 }}>{PRODUCT_QTY} pza</span>
            <span style={{ width: 40 }}>${PRODUCT_PRICE}</span>
            <span style={{ width: 40 }} className="font-bold">${SUBTOTAL.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mt-4 text-[9px]">
            <span style={{ color: "#333" }}>Subtotal</span>
            <span style={{ color: "#333" }}>${SUBTOTAL.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between text-[9px]">
            <span style={{ color: "#333" }}>IVA (16%)</span>
            <span style={{ color: "#333" }}>${IVA.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between mt-1 text-[13px] font-extrabold" style={{ color: "#1F3A93" }}>
            <span>TOTAL</span>
            <span>${TOTAL.toLocaleString()}.00 MXN</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 py-3" style={{ background: "#1c1c1e" }}>
        <Maximize size={14} color="#fff" />
        <Bookmark size={14} color="#fff" />
        <PenLine size={14} color="#fff" />
        <Grid3x3 size={14} color="#fff" />
      </div>
    </div>
  );
}
