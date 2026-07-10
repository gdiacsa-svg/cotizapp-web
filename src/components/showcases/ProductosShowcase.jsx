"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search, Plus, Wrench, Package, Layers, MousePointer2, X, Check,
  Home, Users, Box, FileText, Wallet, Settings,
} from "lucide-react";
import useInView from "@/hooks/useInView";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const TYPE_META = {
  Pieza: { icon: Package, color: "#2F87E0", bg: "#E7F0FF" },
  Servicio: { icon: Wrench, color: "#3FA84A", bg: "#E3F5E7" },
  Kit: { icon: Layers, color: "#9B4FC4", bg: "#F1E6FA" },
};

const BASE_PRODUCTS = [
  { id: 1, name: "Fusible térmico 30A", type: "Pieza", price: 85 },
  { id: 2, name: "Instalación de contactos", type: "Servicio", price: 450 },
  { id: 3, name: "Kit alarma DSC Powerseries", type: "Kit", price: 3400 },
  { id: 4, name: "Cable calibre 12 (metro)", type: "Pieza", price: 22 },
];

const NEW_PRODUCT = { id: 0, name: "Mantenimiento preventivo A/C", type: "Servicio", price: 650 };

function useCursor(phoneRef, scaleRef) {
  const [pos, setPos] = useState({ x: 150, y: 40, visible: false });
  const [pulse, setPulse] = useState(false);
  const moveTo = (ref) => {
    if (!ref.current || !phoneRef.current) return;
    const t = ref.current.getBoundingClientRect();
    const b = phoneRef.current.getBoundingClientRect();
    const s = scaleRef.current || 1;
    setPos({ x: (t.left - b.left + t.width / 2) / s, y: (t.top - b.top + t.height / 2) / s, visible: true });
  };
  const click = async () => { setPulse(true); await wait(260); setPulse(false); };
  const hide = () => setPos((p) => ({ ...p, visible: false }));
  return { pos, pulse, moveTo, click, hide };
}

export default function ProductosShowcase() {
  const phoneRef = useRef(null);
  const nuevoRef = useRef(null);
  const servicioTypeRef = useRef(null);
  const guardarRef = useRef(null);
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const [screen, setScreen] = useState("list");
  const [selectedType, setSelectedType] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
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
      setScale(val); scaleRef.current = val;
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
        setScreen("list"); setNewProduct(null); setSelectedType(null); cursor.hide();
        await wait(1100); if (guard()) return;

        cursor.moveTo(nuevoRef); await wait(700); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("form"); await wait(1000); if (guard()) return;

        cursor.moveTo(servicioTypeRef); await wait(700); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setSelectedType("Servicio"); await wait(1100); if (guard()) return;

        cursor.moveTo(guardarRef); await wait(700); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("list"); setNewProduct(NEW_PRODUCT);
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
                {screen === "list" && <ListScreen nuevoRef={nuevoRef} newProduct={newProduct} />}
                {screen === "form" && (
                  <FormScreen selectedType={selectedType} servicioTypeRef={servicioTypeRef} guardarRef={guardarRef} />
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
        .item-pop { animation: pop .6s ease; }
        @keyframes pop { 0%{transform:scale(.9); opacity:0} 40%{transform:scale(1.02); opacity:1} 100%{transform:scale(1); opacity:1} }
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
      style={{ left: pos.x, top: pos.y, transform: "translate(-6px,-4px)", transition: "left .7s cubic-bezier(.4,0,.2,1), top .7s cubic-bezier(.4,0,.2,1), opacity .25s", opacity: pos.visible ? 1 : 0 }}
    >
      {pulse && <span className="absolute rounded-full cursor-pulse" style={{ width: 34, height: 34, left: -10, top: -8, background: "rgba(46,151,221,0.5)" }} />}
      <MousePointer2 size={22} color="#1F1B2E" fill="#fff" strokeWidth={1.5} />
    </div>
  );
}

function BottomNav() {
  const items = [
    { icon: Home, label: "Inicio" }, { icon: Users, label: "Clientes" },
    { icon: Box, label: "Productos", active: true }, { icon: FileText, label: "Cotizar" },
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

function ListScreen({ nuevoRef, newProduct }) {
  const list = newProduct ? [newProduct, ...BASE_PRODUCTS] : BASE_PRODUCTS;
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#fff" }}>
      <div className="px-5 pt-5 pb-4 rounded-b-[26px]" style={{ background: "linear-gradient(135deg,#2B1B44,#22163A)" }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white text-2xl font-extrabold">Productos</h2>
          <button ref={nuevoRef} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-white text-[13px] font-bold" style={{ background: "#3FA84A" }}>
            <Plus size={15} /> Nuevo
          </button>
        </div>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl" style={{ background: "#fff" }}>
          <Search size={16} color="#9AA3B4" />
          <span className="text-[13px]" style={{ color: "#9AA3B4" }}>Buscar producto...</span>
        </div>
      </div>

      <div className="flex gap-1.5 px-4 pt-3.5">
        {["Todos", "Pieza", "Servicio", "Kit"].map((t) => (
          <div key={t} className="px-3 py-1.5 rounded-full text-[10px] font-bold" style={{ background: t === "Todos" ? "#15111F" : "#F1F3F7", color: t === "Todos" ? "#fff" : "#7A8599" }}>
            {t}
          </div>
        ))}
      </div>

      <div className="flex-1 px-4 pt-3.5 space-y-2.5 overflow-hidden">
        {list.slice(0, 5).map((p) => {
          const meta = TYPE_META[p.type];
          const Icon = meta.icon;
          return (
            <div
              key={p.id}
              className={`flex items-center gap-3 p-3 rounded-2xl ${p.id === 0 ? "item-pop" : ""}`}
              style={{ background: "#F7F9FC", border: "1px solid #E7EBF2" }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: meta.bg }}>
                <Icon size={16} color={meta.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-bold truncate" style={{ color: "#1F1B2E" }}>{p.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] font-bold px-1.5 py-[2px] rounded-md" style={{ background: meta.bg, color: meta.color }}>{p.type}</span>
                  <span className="text-[10px] font-semibold" style={{ color: "#7A8599" }}>${p.price.toLocaleString()}.00</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <BottomNav />
    </div>
  );
}

function FormScreen({ selectedType, servicioTypeRef, guardarRef }) {
  const types = [
    { key: "Pieza", icon: Package },
    { key: "Servicio", icon: Wrench },
    { key: "Kit", icon: Layers },
  ];
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#fff" }}>
      <div className="px-5 pt-5 pb-4 flex items-center justify-between" style={{ background: "#15111F" }}>
        <span className="text-white text-[13px] font-extrabold tracking-widest">NUEVO PRODUCTO</span>
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#3A3550" }}>
          <X size={13} color="#fff" />
        </div>
      </div>

      <div className="flex-1 px-5 pt-6 space-y-5">
        <div>
          <p className="text-[10px] font-bold tracking-wide mb-2" style={{ color: "#8C8299" }}>TIPO</p>
          <div className="flex gap-2">
            {types.map(({ key, icon: Icon }) => {
              const meta = TYPE_META[key];
              const active = selectedType === key;
              return (
                <div
                  key={key}
                  ref={key === "Servicio" ? servicioTypeRef : null}
                  className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl"
                  style={{ background: active ? meta.bg : "#F7F9FC", border: active ? `1.5px solid ${meta.color}` : "1.5px solid #E7EBF2" }}
                >
                  <Icon size={16} color={active ? meta.color : "#9AA3B4"} />
                  <span className="text-[10px] font-bold" style={{ color: active ? meta.color : "#9AA3B4" }}>{key}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold tracking-wide mb-1.5" style={{ color: "#8C8299" }}>NOMBRE</p>
          <div className="px-3.5 py-3 rounded-xl text-[14px] font-medium" style={{ border: "1.5px solid #E4DCEA", color: selectedType ? "#231B33" : "#B4ABC2" }}>
            {selectedType ? "Mantenimiento preventivo A/C" : "Nombre del producto o servicio"}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-wide mb-1.5" style={{ color: "#8C8299" }}>PRECIO UNITARIO</p>
          <div className="px-3.5 py-3 rounded-xl text-[14px] font-medium" style={{ border: "1.5px solid #E4DCEA", color: selectedType ? "#231B33" : "#B4ABC2" }}>
            {selectedType ? "$650.00" : "$0.00"}
          </div>
        </div>

        <button ref={guardarRef} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-[13px] font-bold mt-2" style={{ background: "#3FA84A" }}>
          <Check size={15} /> Guardar en Catálogo
        </button>
      </div>
    </div>
  );
}
