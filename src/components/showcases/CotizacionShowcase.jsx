"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search, Home, Users, Box, FileText, Wallet, Settings,
  X, Check, MousePointer2, User, ChevronRight, RotateCw, ArrowLeft, Trash2,
} from "lucide-react";
import useInView from "@/hooks/useInView";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const CLIENT = { name: "Renata Solís" };
const PRODUCT = { name: "Instalación y Configuración Alarma", price: 600, qty: 5 };
const SUBTOTAL = PRODUCT.price * PRODUCT.qty; // 3000
const TOTAL_IVA = Math.round(SUBTOTAL * 1.16); // 3480

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

export default function CotizacionShowcase() {
  const phoneRef = useRef(null);
  const nuevaRef = useRef(null);
  const seleccionarClienteRef = useRef(null);
  const clientRowRef = useRef(null);
  const agregarConceptoRef = useRef(null);
  const productRowRef = useRef(null);
  const anadirRef = useRef(null);
  const ivaToggleRef = useRef(null);
  const guardarRef = useRef(null);
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const [screen, setScreen] = useState("list");
  const [clientPicked, setClientPicked] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);
  const [ivaOn, setIvaOn] = useState(false);
  const [quoteSaved, setQuoteSaved] = useState(false);
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
        setScreen("list"); setClientPicked(false); setItemAdded(false);
        setIvaOn(false); setQuoteSaved(false); cursor.hide();
        await wait(1000); if (guard()) return;

        cursor.moveTo(nuevaRef); await wait(700); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("form"); await wait(900); if (guard()) return;

        cursor.moveTo(seleccionarClienteRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("selectClient"); await wait(800); if (guard()) return;

        cursor.moveTo(clientRowRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setClientPicked(true); setScreen("form"); await wait(900); if (guard()) return;

        cursor.moveTo(agregarConceptoRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("selectProduct"); await wait(800); if (guard()) return;

        cursor.moveTo(productRowRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("adjust"); await wait(900); if (guard()) return;

        cursor.moveTo(anadirRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setItemAdded(true); setScreen("form"); await wait(1000); if (guard()) return;

        cursor.moveTo(ivaToggleRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;
        setIvaOn(true); await wait(900); if (guard()) return;

        cursor.moveTo(guardarRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setQuoteSaved(true); setScreen("list"); await wait(2200); if (guard()) return;
      }
    }
    run();
    return () => { stopped = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[380px] w-full items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg,#241a3d 0%,#140f24 60%,#0b0813 100%)" }}
    >
      <div ref={stageRef} className="relative z-10 flex flex-col items-center" style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
        <div className="float-wrap">
          <div className="tilt-rig" style={{ transform: "perspective(1500px) rotateX(8deg) rotateY(-14deg)" }}>
            <div className="phone-shadow" />
            <div className="phone-bezel">
              <div className="phone-notch" />
              <div ref={phoneRef} className="phone-screen">
                {screen === "list" && (
                  <ListScreen nuevaRef={nuevaRef} quoteSaved={quoteSaved} />
                )}
                {screen === "form" && (
                  <FormScreen
                    seleccionarClienteRef={seleccionarClienteRef}
                    agregarConceptoRef={agregarConceptoRef}
                    ivaToggleRef={ivaToggleRef}
                    guardarRef={guardarRef}
                    clientPicked={clientPicked}
                    itemAdded={itemAdded}
                    ivaOn={ivaOn}
                  />
                )}
                {screen === "selectClient" && <SelectClientScreen clientRowRef={clientRowRef} />}
                {screen === "selectProduct" && <SelectProductScreen productRowRef={productRowRef} />}
                {screen === "adjust" && <AdjustScreen anadirRef={anadirRef} />}
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
        .phone-shadow { position:absolute; left:50%; bottom:-60px; width:260px; height:60px; transform:translateX(-50%); background: radial-gradient(closest-side, rgba(70,50,140,.55), transparent 75%); filter: blur(6px); z-index:-1; }
        .screen-in { animation: screenIn .35s ease; }
        @keyframes screenIn { from{opacity:0; transform:translateX(10px)} to{opacity:1; transform:translateX(0)} }
        .card-pop { animation: pop .6s ease; }
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

function TabBar() {
  const tabs = [
    { label: "CREADA", active: true },
    { label: "ENVIADA" },
    { label: "APROBADA" },
    { label: "PAGADA" },
  ];
  return (
    <div className="flex items-center gap-1.5 px-4 pt-3">
      {tabs.map((t) => (
        <div
          key={t.label}
          className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold"
          style={{ background: t.active ? "#15111F" : "#EDF0F5", color: t.active ? "#fff" : "#7A8599" }}
        >
          {t.label}
        </div>
      ))}
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

function ListScreen({ nuevaRef, quoteSaved }) {
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#fff" }}>
      <div className="px-5 pt-5 pb-4 rounded-b-[26px]" style={{ background: "linear-gradient(135deg,#2B1B44,#22163A)" }}>
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl font-extrabold">Cotizaciones</h2>
          <button ref={nuevaRef} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-white text-[13px] font-bold" style={{ background: "#3FA84A" }}>
            +  Nueva
          </button>
        </div>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl mt-4" style={{ background: "#3A2A56" }}>
          <Search size={16} color="#B9AEDD" />
          <span className="text-[13px]" style={{ color: "#B9AEDD" }}>Buscar cliente...</span>
        </div>
      </div>
      <TabBar />
      <div className="flex-1 px-4 pt-4">
        {quoteSaved ? (
          <div className="card-pop p-4 rounded-2xl" style={{ background: "#F7F9FC", border: "1px solid #E7EBF2" }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[11px] font-bold" style={{ background: "#3FA84A" }}>V1</div>
                <span className="text-[15px] font-bold" style={{ color: "#1F1B2E" }}>{CLIENT.name}</span>
              </div>
              <span className="text-[15px] font-extrabold" style={{ color: "#E24C4C" }}>${TOTAL_IVA.toLocaleString()}.00</span>
            </div>
            <p className="text-[12px] font-semibold mb-2" style={{ color: "#3A3550" }}>{PRODUCT.name.toUpperCase()}</p>
            <div className="h-px my-1" style={{ background: "#E7EBF2" }} />
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] px-2 py-1 rounded-md font-bold" style={{ background: "#EDF0F5", color: "#7A8599" }}>DAC-4032</span>
              <span className="text-[10px]" style={{ color: "#9AA3B4" }}>05/07/26</span>
              <span className="text-[10px] px-2 py-1 rounded-md font-bold" style={{ background: "#E7F0FF", color: "#2F87E0" }}>BORRADOR</span>
            </div>
          </div>
        ) : (
          <div className="h-full rounded-3xl" style={{ background: "#fff" }} />
        )}
      </div>
      <BottomNav />
    </div>
  );
}

function DarkHeader({ title }) {
  return (
    <div className="px-5 pt-5 pb-4 flex items-center justify-between" style={{ background: "#15111F" }}>
      <span className="text-white text-[13px] font-extrabold tracking-widest">{title}</span>
      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#3A3550" }}>
        <X size={13} color="#fff" />
      </div>
    </div>
  );
}

function FormScreen({ seleccionarClienteRef, agregarConceptoRef, ivaToggleRef, guardarRef, clientPicked, itemAdded, ivaOn }) {
  const total = itemAdded ? (ivaOn ? TOTAL_IVA : SUBTOTAL) : 0;
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#fff" }}>
      <DarkHeader title="NUEVA COTIZACIÓN" />
      <div className="flex-1 px-4 pt-4 space-y-3.5 overflow-hidden">
        <div className="p-3.5 rounded-2xl" style={{ border: "1.5px solid #EDF0F5" }}>
          <p className="text-[10px] font-bold mb-2" style={{ color: "#7A8599" }}>¿PARA QUIÉN ES LA COTIZACIÓN?</p>
          {clientPicked ? (
            <div className="flex items-center justify-between p-2.5 rounded-xl" style={{ background: "#F7F9FC" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#3FA84A" }}>
                  <User size={16} color="#fff" />
                </div>
                <span className="text-[13px] font-bold" style={{ color: "#1F1B2E" }}>{CLIENT.name}</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg" style={{ background: "#E7F0FF" }}>
                <RotateCw size={11} color="#2F87E0" />
                <span className="text-[10px] font-bold" style={{ color: "#2F87E0" }}>Cambiar</span>
              </div>
            </div>
          ) : (
            <button ref={seleccionarClienteRef} className="w-full py-3 rounded-xl text-[12px] font-bold" style={{ border: "1.5px dashed #B9D9A8", color: "#3FA84A" }}>
              SELECCIONAR CLIENTE
            </button>
          )}
        </div>

        <div className="p-3.5 rounded-2xl" style={{ border: "1.5px solid #EDF0F5" }}>
          <p className="text-[10px] font-bold mb-2" style={{ color: "#7A8599" }}>MATERIALES, CONCEPTOS Y NOTAS</p>
          {itemAdded && (
            <div className="flex items-center justify-between p-2.5 rounded-xl mb-2" style={{ background: "#F7F9FC" }}>
              <div>
                <p className="text-[11px] font-bold" style={{ color: "#1F1B2E" }}>{PRODUCT.name.toUpperCase()}</p>
                <p className="text-[11px]" style={{ color: "#7A8599" }}>${PRODUCT.price}.00</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold" style={{ color: "#7A8599" }}>CANT: {PRODUCT.qty}</span>
                <Trash2 size={13} color="#E24C4C" />
              </div>
            </div>
          )}
          <button ref={agregarConceptoRef} className="w-full py-2.5 rounded-xl text-[11px] font-bold" style={{ border: "1.5px dashed #B9D9A8", color: "#3FA84A" }}>
            + AGREGAR CONCEPTO
          </button>
        </div>

        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold" style={{ color: "#7A8599" }}>IVA (16%)</span>
          <button ref={ivaToggleRef} className="w-11 h-6 rounded-full relative" style={{ background: ivaOn ? "#3FA84A" : "#D6DAE3" }}>
            <span className="absolute top-0.5 rounded-full bg-white w-5 h-5 transition-all" style={{ left: ivaOn ? 22 : 2 }} />
          </button>
        </div>

        <div className="flex items-center justify-between px-1 pt-1">
          <span className="text-[11px] font-bold" style={{ color: "#7A8599" }}>TOTAL CONTRATO</span>
          <span className="text-[19px] font-extrabold" style={{ color: "#3FA84A" }}>${total.toLocaleString()}.00 MXN</span>
        </div>
      </div>

      <div className="flex gap-2.5 px-4 pb-5">
        <button className="flex-1 py-3 rounded-xl text-white text-[12px] font-bold flex items-center justify-center gap-1.5" style={{ background: "#A6A0B4" }}>
          <ArrowLeft size={13} /> Regresar
        </button>
        <button ref={guardarRef} className="flex-1 py-3 rounded-xl text-white text-[12px] font-bold flex items-center justify-center gap-1.5" style={{ background: "#3FA84A" }}>
          <Check size={13} /> Guardar
        </button>
      </div>
    </div>
  );
}

const FAKE_CLIENTS = ["Ismael Torres", "Karla Novelo", "Sergio Balam"];

function SelectClientScreen({ clientRowRef }) {
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#fff" }}>
      <DarkHeader title="SELECCIONAR CLIENTE" />
      <div className="px-4 pt-4">
        <button className="w-full py-3 rounded-xl text-white text-[13px] font-bold" style={{ background: "#3FA84A" }}>
          +  Nuevo Cliente
        </button>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl mt-3" style={{ border: "1.5px solid #EDF0F5" }}>
          <Search size={14} color="#9AA3B4" />
          <span className="text-[12px]" style={{ color: "#9AA3B4" }}>Filtrar por nombre...</span>
        </div>
      </div>
      <div className="flex-1 px-4 pt-3">
        <div ref={clientRowRef} className="py-3" style={{ borderBottom: "1px solid #F0F2F6" }}>
          <p className="text-[14px] font-bold" style={{ color: "#1F1B2E" }}>{CLIENT.name.toUpperCase()}</p>
          <p className="text-[11px] mt-0.5" style={{ color: "#9AA3B4" }}>999 214 5583</p>
        </div>
        {FAKE_CLIENTS.map((n) => (
          <div key={n} className="py-3" style={{ borderBottom: "1px solid #F0F2F6" }}>
            <p className="text-[14px] font-bold" style={{ color: "#1F1B2E" }}>{n.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const FAKE_PRODUCTS = [
  { name: "Energizador Yonusa 2500 metros", price: 2800 },
  { name: "Batería de respaldo 12 volts", price: 400 },
  { name: "Kit alarma DSC Powerseries", price: 3400 },
];

function SelectProductScreen({ productRowRef }) {
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#fff" }}>
      <DarkHeader title="SELECCIONAR PRODUCTO" />
      <div className="px-4 pt-4">
        <button className="w-full py-3 rounded-xl text-white text-[13px] font-bold" style={{ background: "#3FA84A" }}>
          📦  Nuevo Producto
        </button>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl mt-3" style={{ border: "1.5px solid #EDF0F5" }}>
          <Search size={14} color="#9AA3B4" />
          <span className="text-[12px]" style={{ color: "#9AA3B4" }}>Buscar producto...</span>
        </div>
      </div>
      <div className="flex-1 px-4 pt-3">
        <div ref={productRowRef} className="py-3 flex items-center justify-between" style={{ borderBottom: "1px solid #F0F2F6" }}>
          <div>
            <p className="text-[13px] font-bold" style={{ color: "#1F1B2E" }}>{PRODUCT.name.toUpperCase()}</p>
            <p className="text-[11px] mt-0.5" style={{ color: "#9AA3B4" }}>${PRODUCT.price}.00 · PZA</p>
          </div>
          <ChevronRight size={16} color="#3FA84A" />
        </div>
        {FAKE_PRODUCTS.map((p) => (
          <div key={p.name} className="py-3 flex items-center justify-between" style={{ borderBottom: "1px solid #F0F2F6" }}>
            <div>
              <p className="text-[13px] font-bold" style={{ color: "#1F1B2E" }}>{p.name.toUpperCase()}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "#9AA3B4" }}>${p.price.toLocaleString()}.00 · PZA</p>
            </div>
            <ChevronRight size={16} color="#3FA84A" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AdjustScreen({ anadirRef }) {
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#fff" }}>
      <DarkHeader title="AJUSTAR PARTIDA" />
      <div className="flex-1 px-4 pt-5 space-y-4">
        <div>
          <p className="text-[10px] font-bold mb-1.5" style={{ color: "#7A8599" }}>CONCEPTO EN COTIZACIÓN</p>
          <div className="px-3.5 py-3 rounded-xl text-[13px] font-bold" style={{ border: "1.5px solid #EDF0F5", color: "#1F1B2E" }}>
            {PRODUCT.name.toUpperCase()}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-bold mb-1.5" style={{ color: "#7A8599" }}>CANTIDAD</p>
            <div className="px-3.5 py-3 rounded-xl text-[16px] font-bold" style={{ border: "1.5px solid #EDF0F5", color: "#1F1B2E" }}>
              {PRODUCT.qty}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold mb-1.5" style={{ color: "#7A8599" }}>PRECIO UNITARIO ($)</p>
            <div className="px-3.5 py-3 rounded-xl text-[16px] font-bold" style={{ border: "1.5px solid #EDF0F5", color: "#1F1B2E" }}>
              {PRODUCT.price}
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ background: "#F7F9FC" }}>
          <p className="text-[10px] font-bold mb-1" style={{ color: "#7A8599" }}>TOTAL DE ESTA PARTIDA (TEMPORAL)</p>
          <p className="text-[20px] font-extrabold" style={{ color: "#3FA84A" }}>${SUBTOTAL.toLocaleString()}.00 MXN</p>
        </div>
      </div>
      <div className="px-4 pb-5">
        <button ref={anadirRef} className="w-full py-3.5 rounded-xl text-white text-[14px] font-bold" style={{ background: "#3FA84A" }}>
          AÑADIR
        </button>
      </div>
    </div>
  );
}
