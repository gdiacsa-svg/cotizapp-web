"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search, MoreVertical, Home, Users, Box, FileText, Wallet, Settings,
  ChevronLeft, X, Check, UserPlus, MousePointer2, MessageCircle,
} from "lucide-react";
import useInView from "@/hooks/useInView";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const BASE_CLIENTS = [
  { id: 1, name: "Fabiola Castro", phone: "Sin teléfono", quotes: 1, color: "#8C4FC4", initials: "FA" },
  { id: 2, name: "Emilio Pech", phone: "999 452 7710", quotes: 1, color: "#3FA84A", initials: "EM" },
  { id: 3, name: "Andrés Ku", phone: "999 118 3345", quotes: 0, color: "#2E97DD", initials: "AN" },
  { id: 4, name: "Marisol Chan", phone: "722 890 4471", quotes: 3, color: "#E1594B", initials: "MA" },
  { id: 5, name: "Rodolfo Aké", phone: "999 224 5588", quotes: 1, color: "#9B4FC4", initials: "RO" },
  { id: 6, name: "Ing. Carla Nah", phone: "981 337 2290", quotes: 1, color: "#9B4FC4", initials: "CA" },
];

const CONTACTS = [
  { key: "c1", name: "Alicia Duarte", color: "#C4A5E8" },
  { key: "c2", name: "Alonso Reyes", color: "#E0B23C" },
  { key: "target", name: "Andrea Marín", color: "#C4A5E8", target: true },
  { key: "c3", name: "Andy Puc", color: "#C4A5E8" },
  { key: "c4", name: "ARC Instalaciones", color: "#E0B23C" },
  { key: "c5", name: "Armando Chi", color: "#C4A5E8" },
  { key: "c6", name: "Astrid Balam", color: "#5B8FE0" },
  { key: "c7", name: "Aurora Nuñez", color: "#E17FA6" },
];

const NEW_CLIENT = { id: 0, name: "Andrea Marín", phone: "999 305 8847", quotes: 0, color: "#2E97DD", initials: "AN" };

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
  const click = async () => { setPulse(true); await wait(260); setPulse(false); };
  const hide = () => setPos((p) => ({ ...p, visible: false }));
  return { pos, pulse, moveTo, click, hide };
}

export default function ClientesShowcase() {
  const phoneRef = useRef(null);
  const nuevoRef = useRef(null);
  const importarRef = useRef(null);
  const guardarRef = useRef(null);
  const contactRef = useRef(null);
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const [screen, setScreen] = useState("clients");
  const [form, setForm] = useState({ name: "", phone: "" });
  const [newClient, setNewClient] = useState(null);
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

    async function run() {
      while (!guard()) {
        setScreen("clients"); setNewClient(null); setForm({ name: "", phone: "" }); cursor.hide();
        await wait(1100); if (guard()) return;

        cursor.moveTo(nuevoRef); await wait(750); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("form"); await wait(1000); if (guard()) return;

        cursor.moveTo(importarRef); await wait(750); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("contacts"); await wait(900); if (guard()) return;

        cursor.moveTo(contactRef); await wait(750); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setForm({ name: "Andrea Marín", phone: "999 305 8847" }); setScreen("form");
        await wait(1200); if (guard()) return;

        cursor.moveTo(guardarRef); await wait(750); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("clients"); setNewClient(NEW_CLIENT);
        await wait(2400); if (guard()) return;
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
                {screen === "clients" && <ClientsScreen nuevoRef={nuevoRef} newClient={newClient} />}
                {screen === "form" && <FormScreen form={form} importarRef={importarRef} guardarRef={guardarRef} />}
                {screen === "contacts" && <ContactsScreen contactRef={contactRef} />}
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
        .phone-screen { width:100%; height:100%; border-radius:32px; overflow:hidden; position:relative; background:#FDF7F2; }
        .phone-shadow { position:absolute; left:50%; bottom:-40px; width:220px; height:44px; transform:translateX(-50%); background: radial-gradient(closest-side, rgba(17,24,39,.18), transparent 75%); filter: blur(8px); z-index:-1; }
        .screen-in { animation: screenIn .35s ease; }
        @keyframes screenIn { from{opacity:0; transform:translateX(10px)} to{opacity:1; transform:translateX(0)} }
        .client-pop { animation: pop .6s ease; }
        @keyframes pop { 0%{transform:scale(.9); opacity:0; box-shadow:0 0 0 rgba(46,151,221,0)} 40%{transform:scale(1.02); opacity:1; box-shadow:0 0 0 6px rgba(46,151,221,.25)} 100%{transform:scale(1); opacity:1; box-shadow:0 0 0 0 rgba(46,151,221,0)} }
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
        transition: "left .7s cubic-bezier(.4,0,.2,1), top .7s cubic-bezier(.4,0,.2,1), opacity .25s",
        opacity: pos.visible ? 1 : 0,
      }}
    >
      {pulse && <span className="absolute rounded-full cursor-pulse" style={{ width: 34, height: 34, left: -10, top: -8, background: "rgba(46,151,221,0.5)" }} />}
      <MousePointer2 size={22} color="#1F1B2E" fill="#fff" strokeWidth={1.5} />
    </div>
  );
}

function TopBar({ title, right }) {
  return (
    <div className="px-5 pt-5 pb-4 rounded-b-[26px]" style={{ background: "linear-gradient(135deg,#2B1B44,#22163A)" }}>
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-extrabold">{title}</h2>
        {right}
      </div>
    </div>
  );
}

function ClientsScreen({ nuevoRef, newClient }) {
  const list = newClient ? [newClient, ...BASE_CLIENTS] : BASE_CLIENTS;
  return (
    <div className="screen-in h-full flex flex-col">
      <TopBar
        title="Clientes"
        right={
          <button ref={nuevoRef} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-white text-[13px] font-bold" style={{ background: "#3FA84A" }}>
            <UserPlus size={15} /> Nuevo
          </button>
        }
      />
      <div className="px-4 -mt-2">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl" style={{ background: "#3A2A56" }}>
          <Search size={16} color="#B9AEDD" />
          <span className="text-[13px]" style={{ color: "#B9AEDD" }}>Buscar...</span>
        </div>
      </div>

      <div className="flex-1 px-4 pt-4 space-y-2.5 overflow-hidden">
        {list.slice(0, 5).map((c) => (
          <div
            key={c.id}
            className={`flex items-center gap-3 p-3 rounded-2xl ${c.id === 0 ? "client-pop" : ""}`}
            style={{ background: "#FBF1EB", border: "1px solid #F0E2D8" }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0" style={{ background: c.color }}>
              {c.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold truncate" style={{ color: "#231B33" }}>{c.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MessageCircle size={11} color="#3FA84A" />
                <span className="text-[11px] font-medium" style={{ color: "#2F97DD" }}>{c.phone}</span>
                {c.quotes > 0 && (
                  <span className="ml-1 text-[10px] font-bold text-white px-2 py-[2px] rounded-full" style={{ background: "#2F87E0" }}>
                    Cotizaciones {c.quotes}
                  </span>
                )}
              </div>
            </div>
            <MoreVertical size={14} color="#9A8FA8" />
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

function BottomNav() {
  const items = [
    { icon: Home, label: "Inicio" }, { icon: Users, label: "Clientes", active: true },
    { icon: Box, label: "Productos" }, { icon: FileText, label: "Cotizar" },
    { icon: Wallet, label: "Cobros" }, { icon: Settings, label: "Perfil" },
  ];
  return (
    <div className="flex items-center justify-between px-2.5 py-2.5" style={{ background: "#22163A" }}>
      {items.map(({ icon: Icon, label, active }) => (
        <div key={label} className="flex flex-col items-center gap-0.5">
          <Icon size={16} color={active ? "#FFFFFF" : "#8577A8"} />
          <span className="text-[8px] font-semibold" style={{ color: active ? "#FFFFFF" : "#8577A8" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function FormScreen({ form, importarRef, guardarRef }) {
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#FDF7F2" }}>
      <div className="px-5 pt-5 pb-4 flex items-center justify-between" style={{ background: "#15111F" }}>
        <span className="text-white text-[13px] font-extrabold tracking-widest">NUEVO CLIENTE</span>
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#3A3550" }}>
          <X size={13} color="#fff" />
        </div>
      </div>

      <div className="flex-1 px-5 pt-6 space-y-5">
        <div>
          <p className="text-[10px] font-bold tracking-wide mb-1.5" style={{ color: "#8C8299" }}>NOMBRE COMPLETO</p>
          <div className="px-3.5 py-3 rounded-xl text-[14px] font-medium" style={{ border: "1.5px solid #E4DCEA", color: form.name ? "#231B33" : "#B4ABC2" }}>
            {form.name || "Nombre del cliente"}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-wide mb-1.5" style={{ color: "#8C8299" }}>TELÉFONO</p>
          <div className="px-3.5 py-3 rounded-xl text-[14px] font-medium" style={{ border: "1.5px solid #E4DCEA", color: form.phone ? "#231B33" : "#B4ABC2" }}>
            {form.phone || "10 dígitos"}
          </div>
        </div>

        <button ref={importarRef} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-[13px] font-bold mt-2" style={{ background: "#2F87E0" }}>
          <UserPlus size={15} /> Importar de Contactos
        </button>
        <button ref={guardarRef} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-[13px] font-bold" style={{ background: "#3FA84A" }}>
          <Check size={15} /> Guardar Registro
        </button>
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-[13px] font-bold" style={{ background: "#A6A0B4" }}>
          <X size={15} /> Regresar
        </button>
      </div>
    </div>
  );
}

function ContactsScreen({ contactRef }) {
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#121016" }}>
      <div className="px-5 pt-5 pb-4 flex items-center gap-2">
        <ChevronLeft size={18} color="#fff" />
        <span className="text-white text-[16px] font-bold">Seleccionar contacto</span>
      </div>
      <div className="px-4">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl" style={{ background: "#232028" }}>
          <Search size={14} color="#8A8590" />
          <span className="text-[12px]" style={{ color: "#8A8590" }}>Buscar</span>
        </div>
      </div>
      <div className="flex-1 px-4 pt-3">
        <p className="text-[12px] font-bold mb-1" style={{ color: "#6b6672" }}>A</p>
        <div className="space-y-3.5">
          {CONTACTS.map((c) => (
            <div key={c.key} ref={c.target ? contactRef : null} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0" style={{ background: c.color }}>
                {c.name[0]}
              </div>
              <span className="text-[13px] font-medium text-white truncate">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
