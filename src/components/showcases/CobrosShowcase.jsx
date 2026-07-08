"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search, Home, Users, Box, FileText, Wallet, Settings, X, Plus,
  MousePointer2, ArrowLeft, Check, ChevronRight, AlertCircle, Banknote,
  ArrowLeftRight, CreditCard,
} from "lucide-react";
import useInView from "@/hooks/useInView";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const CLIENT_NAME = "Ferretería Domínguez";
const FOLIO = "DAC-2210";
const BASE_QUOTE = 600;
const IVA_RATE = 0.16;
const EXTRA_NAME = "Instalación y Configuración Alarma";
const EXTRA_PRICE = 600;
const EXTRA_QTY = 1;
const ABONO_MONTO = 500;

const SECOND_RECORD = { folio: "DAC-1871", name: "Iván Duarte", abonado: 13000, total: 23500 };

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

export default function CobrosShowcase() {
  const phoneRef = useRef(null);
  const cardRef = useRef(null);
  const conceptoNuevoRef = useRef(null);
  const productRowRef = useRef(null);
  const anadirRef = useRef(null);
  const registrarAbonoRef = useRef(null);
  const guardarAbonoRef = useRef(null);
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const [screen, setScreen] = useState("list");
  const [tab, setTab] = useState("PENDIENTE");
  const [extraAdded, setExtraAdded] = useState(false);
  const [abonado, setAbonado] = useState(0);
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);

  const cursor = useCursor(phoneRef, scaleRef);
  const isVisible = useInView(containerRef, 0.2);

  const subtotal = BASE_QUOTE + (extraAdded ? EXTRA_PRICE * EXTRA_QTY : 0);
  const iva = Math.round(subtotal * IVA_RATE);
  const total = subtotal + iva;
  const saldo = total - abonado;

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
        setScreen("list"); setTab("PENDIENTE"); setExtraAdded(false); setAbonado(0); cursor.hide();
        await wait(1000); if (guard()) return;

        cursor.moveTo(cardRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("detail"); await wait(1000); if (guard()) return;

        cursor.moveTo(conceptoNuevoRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("selectProduct"); await wait(800); if (guard()) return;

        cursor.moveTo(productRowRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("adjust"); await wait(900); if (guard()) return;

        cursor.moveTo(anadirRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setExtraAdded(true); setScreen("detail"); await wait(1100); if (guard()) return;

        cursor.moveTo(registrarAbonoRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("abono"); await wait(1100); if (guard()) return;

        cursor.moveTo(guardarAbonoRef); await wait(650); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setAbonado(ABONO_MONTO); setTab("ABONADO"); setScreen("list");
        await wait(2600); if (guard()) return;
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
                {screen === "list" && (
                  <ListScreen tab={tab} cardRef={cardRef} abonado={abonado} total={total} saldo={saldo} />
                )}
                {screen === "detail" && (
                  <DetailScreen
                    conceptoNuevoRef={conceptoNuevoRef}
                    registrarAbonoRef={registrarAbonoRef}
                    extraAdded={extraAdded}
                    subtotal={subtotal} iva={iva} total={total} abonado={abonado} saldo={saldo}
                  />
                )}
                {screen === "selectProduct" && <SelectProductScreen productRowRef={productRowRef} />}
                {screen === "adjust" && <AdjustScreen anadirRef={anadirRef} />}
                {screen === "abono" && <AbonoScreen guardarAbonoRef={guardarAbonoRef} />}
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
      style={{ left: pos.x, top: pos.y, transform: "translate(-6px,-4px)", transition: "left .6s cubic-bezier(.4,0,.2,1), top .6s cubic-bezier(.4,0,.2,1), opacity .25s", opacity: pos.visible ? 1 : 0 }}
    >
      {pulse && <span className="absolute rounded-full cursor-pulse" style={{ width: 34, height: 34, left: -10, top: -8, background: "rgba(46,151,221,0.5)" }} />}
      <MousePointer2 size={22} color="#1F1B2E" fill="#fff" strokeWidth={1.5} />
    </div>
  );
}

function BottomNav() {
  const items = [
    { icon: Home, label: "Inicio" }, { icon: Users, label: "Clientes" },
    { icon: Box, label: "Productos" }, { icon: FileText, label: "Cotizar" },
    { icon: Wallet, label: "Cobros", active: true }, { icon: Settings, label: "Perfil" },
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

function ListScreen({ tab, cardRef, abonado, total, saldo }) {
  const tabs = ["PENDIENTE", "ABONADO", "LIQUIDADO"];
  const showRecord = tab === "PENDIENTE" || tab === "ABONADO";
  return (
    <div className="h-full flex flex-col" style={{ background: "#fff" }}>
      <div className="px-5 pt-5 pb-4 rounded-b-[26px]" style={{ background: "linear-gradient(135deg,#2B1B44,#22163A)" }}>
        <h2 className="text-white text-2xl font-extrabold mb-3">Cobros</h2>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl" style={{ background: "#fff" }}>
          <Search size={16} color="#9AA3B4" />
          <span className="text-[13px]" style={{ color: "#9AA3B4" }}>Buscar cliente o folio...</span>
        </div>
      </div>

      <div className="flex gap-2.5 px-4 pt-4">
        <div className="flex-1 p-3 rounded-2xl" style={{ border: "1.5px solid #EDF0F5" }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-bold" style={{ color: "#7A8599" }}>TOTAL COBRADO</span>
            <Banknote size={13} color="#3FA84A" />
          </div>
          <p className="text-[17px] font-extrabold" style={{ color: "#3FA84A" }}>${(60520 + abonado).toLocaleString()}.00</p>
        </div>
        <div className="flex-1 p-3 rounded-2xl" style={{ background: "#FCEEEE" }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-bold" style={{ color: "#D94848" }}>TOTAL PENDIENTE</span>
            <AlertCircle size={13} color="#D94848" />
          </div>
          <p className="text-[17px] font-extrabold" style={{ color: "#D94848" }}>${(11196 + (total - 696) - abonado).toLocaleString()}.00</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 px-4 pt-4">
        {tabs.map((t) => (
          <div key={t} className="px-3 py-2 rounded-lg text-[10px] font-bold" style={{ background: t === tab ? "#15111F" : "#EDF0F5", color: t === tab ? "#fff" : "#7A8599" }}>
            {t}
          </div>
        ))}
      </div>

      <div className="flex-1 px-4 pt-4 space-y-3">
        {showRecord && (
          <div ref={cardRef} className={`p-3.5 rounded-2xl ${abonado > 0 ? "card-pop" : ""}`} style={{ background: "#F7F9FC", border: "1px solid #E7EBF2" }}>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[9px] font-bold px-2 py-1 rounded-md" style={{ background: "#EDF0F5", color: "#7A8599" }}>{FOLIO}</span>
              {abonado > 0 && <span className="text-[9px] font-bold px-2 py-1 rounded-md flex items-center gap-1" style={{ background: "#FCEACB", color: "#B8791A" }}><Plus size={9} /> ADIC</span>}
              <span className="text-[13px] font-bold flex-1" style={{ color: "#1F1B2E" }}>{CLIENT_NAME}</span>
              <span className="text-[9px] font-bold px-2 py-1 rounded-md" style={{ background: abonado > 0 ? "#FCEACB" : "#FCEEEE", color: abonado > 0 ? "#B8791A" : "#D94848" }}>
                {abonado > 0 ? "ABONADO" : "PENDIENTE"}
              </span>
            </div>
            <div className="h-1.5 rounded-full mb-3" style={{ background: "#E7EBF2" }}>
              <div className="h-full rounded-full" style={{ width: `${Math.round((abonado / total) * 100)}%`, background: "#E0932F" }} />
            </div>
            <div className="flex justify-between text-[11px]">
              <div>
                <p className="font-bold mb-0.5" style={{ color: "#7A8599" }}>ABONADO</p>
                <p className="font-extrabold text-[14px]" style={{ color: "#3FA84A" }}>${abonado.toLocaleString()}.00</p>
              </div>
              <div>
                <p className="font-bold mb-0.5" style={{ color: "#7A8599" }}>TOTAL GENERAL</p>
                <p className="font-extrabold text-[14px]" style={{ color: "#1F1B2E" }}>${total.toLocaleString()}.00</p>
              </div>
              <div>
                <p className="font-bold mb-0.5" style={{ color: "#7A8599" }}>SALDO</p>
                <p className="font-extrabold text-[14px]" style={{ color: "#D94848" }}>${saldo.toLocaleString()}.00</p>
              </div>
            </div>
          </div>
        )}
        {tab === "ABONADO" && abonado > 0 && (
          <div className="p-3.5 rounded-2xl" style={{ background: "#F7F9FC", border: "1px solid #E7EBF2" }}>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[9px] font-bold px-2 py-1 rounded-md" style={{ background: "#EDF0F5", color: "#7A8599" }}>{SECOND_RECORD.folio}</span>
              <span className="text-[13px] font-bold flex-1" style={{ color: "#1F1B2E" }}>{SECOND_RECORD.name}</span>
              <span className="text-[9px] font-bold px-2 py-1 rounded-md" style={{ background: "#FCEACB", color: "#B8791A" }}>ABONADO</span>
            </div>
            <div className="h-1.5 rounded-full mb-3" style={{ background: "#E7EBF2" }}>
              <div className="h-full rounded-full" style={{ width: `${Math.round((SECOND_RECORD.abonado / SECOND_RECORD.total) * 100)}%`, background: "#E0932F" }} />
            </div>
            <div className="flex justify-between text-[11px]">
              <div><p className="font-bold mb-0.5" style={{ color: "#7A8599" }}>ABONADO</p><p className="font-extrabold text-[14px]" style={{ color: "#3FA84A" }}>${SECOND_RECORD.abonado.toLocaleString()}.00</p></div>
              <div><p className="font-bold mb-0.5" style={{ color: "#7A8599" }}>TOTAL GENERAL</p><p className="font-extrabold text-[14px]" style={{ color: "#1F1B2E" }}>${SECOND_RECORD.total.toLocaleString()}.00</p></div>
              <div><p className="font-bold mb-0.5" style={{ color: "#7A8599" }}>SALDO</p><p className="font-extrabold text-[14px]" style={{ color: "#D94848" }}>${(SECOND_RECORD.total - SECOND_RECORD.abonado).toLocaleString()}.00</p></div>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

function DarkHeader({ title, sub }) {
  return (
    <div className="px-5 pt-5 pb-4 flex items-start justify-between" style={{ background: "#15111F" }}>
      <div>
        <p className="text-white text-[19px] font-extrabold">{title}</p>
        <p className="text-[11px] mt-0.5" style={{ color: "#8C8299" }}>{sub}</p>
      </div>
      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#3A3550" }}>
        <X size={13} color="#fff" />
      </div>
    </div>
  );
}

function DetailScreen({ conceptoNuevoRef, registrarAbonoRef, extraAdded, subtotal, iva, total, abonado, saldo }) {
  const pct = Math.round((abonado / total) * 100);
  return (
    <div className="screen-in h-full flex flex-col overflow-hidden" style={{ background: "#fff" }}>
      <DarkHeader title={CLIENT_NAME} sub={FOLIO} />
      <div className="flex-1 px-4 pt-4 space-y-4 overflow-hidden">
        <div className="p-3.5 rounded-2xl" style={{ border: "1.5px solid #EDF0F5" }}>
          <div className="flex items-center gap-2 text-[10px] font-bold mb-2" style={{ color: "#7A8599" }}>
            <span>COTIZACIÓN</span><span>${BASE_QUOTE}.00</span>
            <span>+</span>
            {extraAdded && <><span style={{ color: "#E0932F" }}>ADICIONALES</span><span style={{ color: "#E0932F" }}>${EXTRA_PRICE}.00</span><span>+</span></>}
            <span>IVA(16%)</span><span>${iva}.00</span>
          </div>
          <div className="flex justify-between items-baseline mb-2">
            <span />
            <div className="text-right">
              <p className="text-[9px] font-bold" style={{ color: "#7A8599" }}>TOTAL GENERAL</p>
              <p className="text-[19px] font-extrabold" style={{ color: "#1F1B2E" }}>${total.toLocaleString()}.00</p>
            </div>
          </div>
          <div className="h-1.5 rounded-full mb-1" style={{ background: "#E7EBF2" }}>
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "#E0932F" }} />
          </div>
          <p className="text-right text-[9px] font-bold mb-3" style={{ color: "#7A8599" }}>{pct}% cobrado</p>
          <div className="flex justify-between mb-3">
            <div><p className="text-[9px] font-bold" style={{ color: "#7A8599" }}>ABONADO</p><p className="text-[15px] font-extrabold" style={{ color: "#3FA84A" }}>${abonado.toLocaleString()}.00</p></div>
            <div className="text-right"><p className="text-[9px] font-bold" style={{ color: "#7A8599" }}>SALDO PENDIENTE</p><p className="text-[15px] font-extrabold" style={{ color: "#D94848" }}>${saldo.toLocaleString()}.00</p></div>
          </div>
          <button ref={registrarAbonoRef} className="w-full py-3 rounded-xl text-white text-[12px] font-bold flex items-center justify-center gap-2" style={{ background: "#3FA84A" }}>
            <Plus size={14} /> REGISTRAR ABONO
          </button>
        </div>

        <div>
          <p className="text-[10px] font-bold mb-1.5" style={{ color: "#7A8599" }}>COTIZACIÓN ORIGINAL</p>
          <div className="p-3 rounded-xl" style={{ background: "#F7F9FC" }}>
            <div className="flex justify-between">
              <div>
                <p className="text-[12px] font-bold" style={{ color: "#1F1B2E" }}>CONFIGURACIÓN DVR | INCLUYE:</p>
                <p className="text-[10px]" style={{ color: "#9AA3B4" }}>1 × ${BASE_QUOTE}.00</p>
              </div>
              <span className="text-[13px] font-extrabold" style={{ color: "#1F1B2E" }}>${BASE_QUOTE}.00</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] font-bold" style={{ color: "#7A8599" }}>ADICIONALES DE OBRA</p>
            <Plus size={14} color="#3FA84A" />
          </div>
          {extraAdded ? (
            <div className="p-3 rounded-xl mb-2" style={{ background: "#FCF6E8" }}>
              <div className="flex justify-between">
                <div>
                  <p className="text-[12px] font-bold" style={{ color: "#1F1B2E" }}>{EXTRA_NAME.toUpperCase()}</p>
                  <p className="text-[10px]" style={{ color: "#9AA3B4" }}>{EXTRA_QTY} × ${EXTRA_PRICE}.00 · pza</p>
                </div>
                <span className="text-[13px] font-extrabold" style={{ color: "#1F1B2E" }}>${EXTRA_PRICE}.00</span>
              </div>
            </div>
          ) : (
            <p className="text-[11px] mb-2" style={{ color: "#B4ABC2" }}>Sin adicionales registrados</p>
          )}
          <button ref={conceptoNuevoRef} className="w-full py-2.5 rounded-xl text-white text-[11px] font-bold flex items-center justify-center gap-1.5" style={{ background: "#3FA84A" }}>
            <Plus size={13} /> Concepto Nuevo en Obra
          </button>
        </div>
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
      <DarkHeader title="Seleccionar Producto" sub="" />
      <div className="px-4 pt-4">
        <button className="w-full py-3 rounded-xl text-white text-[13px] font-bold" style={{ background: "#3FA84A" }}>+  Nuevo Producto</button>
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl mt-3" style={{ border: "1.5px solid #EDF0F5" }}>
          <Search size={14} color="#9AA3B4" />
          <span className="text-[12px]" style={{ color: "#9AA3B4" }}>Buscar producto...</span>
        </div>
      </div>
      <div className="flex-1 px-4 pt-3">
        <div ref={productRowRef} className="py-3 flex items-center justify-between" style={{ borderBottom: "1px solid #F0F2F6" }}>
          <div>
            <p className="text-[13px] font-bold" style={{ color: "#1F1B2E" }}>{EXTRA_NAME.toUpperCase()}</p>
            <p className="text-[11px] mt-0.5" style={{ color: "#9AA3B4" }}>${EXTRA_PRICE}.00 · PZA</p>
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
      <DarkHeader title="Ajustar Partida" sub="" />
      <div className="flex-1 px-4 pt-5 space-y-4">
        <div>
          <p className="text-[10px] font-bold mb-1.5" style={{ color: "#7A8599" }}>CONCEPTO EN COTIZACIÓN</p>
          <div className="px-3.5 py-3 rounded-xl text-[13px] font-bold" style={{ border: "1.5px solid #EDF0F5", color: "#1F1B2E" }}>{EXTRA_NAME.toUpperCase()}</div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-bold mb-1.5" style={{ color: "#7A8599" }}>CANTIDAD</p>
            <div className="px-3.5 py-3 rounded-xl text-[16px] font-bold" style={{ border: "1.5px solid #EDF0F5", color: "#1F1B2E" }}>{EXTRA_QTY}</div>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold mb-1.5" style={{ color: "#7A8599" }}>PRECIO UNITARIO ($)</p>
            <div className="px-3.5 py-3 rounded-xl text-[16px] font-bold" style={{ border: "1.5px solid #EDF0F5", color: "#1F1B2E" }}>{EXTRA_PRICE}</div>
          </div>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ background: "#F7F9FC" }}>
          <p className="text-[10px] font-bold mb-1" style={{ color: "#7A8599" }}>TOTAL DE ESTA PARTIDA (TEMPORAL)</p>
          <p className="text-[20px] font-extrabold" style={{ color: "#3FA84A" }}>${(EXTRA_PRICE * EXTRA_QTY).toLocaleString()}.00 MXN</p>
        </div>
      </div>
      <div className="px-4 pb-5">
        <button ref={anadirRef} className="w-full py-3.5 rounded-xl text-white text-[14px] font-bold" style={{ background: "#3FA84A" }}>AÑADIR</button>
      </div>
    </div>
  );
}

function AbonoScreen({ guardarAbonoRef }) {
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#fff" }}>
      <DarkHeader title="Nuevo Abono" sub={FOLIO} />
      <div className="flex-1 px-5 pt-4 space-y-5">
        <div>
          <p className="text-[10px] font-bold mb-1.5" style={{ color: "#7A8599" }}>MONTO</p>
          <div className="px-3.5 py-3 rounded-xl text-[18px] font-bold flex items-center gap-1" style={{ border: "1.5px solid #E4DCEA", color: "#1F1B2E" }}>
            <span style={{ color: "#3FA84A" }}>$</span> {ABONO_MONTO}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold mb-1.5" style={{ color: "#7A8599" }}>MÉTODO DE PAGO</p>
          <div className="flex gap-2">
            <div className="flex-1 py-3 rounded-xl flex flex-col items-center gap-1" style={{ background: "#15111F" }}>
              <Banknote size={16} color="#fff" />
              <span className="text-[10px] font-bold text-white">Efectivo</span>
            </div>
            <div className="flex-1 py-3 rounded-xl flex flex-col items-center gap-1" style={{ background: "#F1F3F7" }}>
              <ArrowLeftRight size={16} color="#7A8599" />
              <span className="text-[10px] font-bold" style={{ color: "#7A8599" }}>Transferencia</span>
            </div>
            <div className="flex-1 py-3 rounded-xl flex flex-col items-center gap-1" style={{ background: "#F1F3F7" }}>
              <CreditCard size={16} color="#7A8599" />
              <span className="text-[10px] font-bold" style={{ color: "#7A8599" }}>Tarjeta</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold mb-1.5" style={{ color: "#7A8599" }}>REFERENCIA (OPCIONAL)</p>
          <div className="px-3.5 py-3 rounded-xl text-[12px]" style={{ border: "1.5px solid #E4DCEA", color: "#B4ABC2" }}>
            Número de transferencia, folio, etc.
          </div>
        </div>
        <div className="flex gap-2.5">
          <button className="flex-1 py-3 rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5" style={{ background: "#F1F3F7", color: "#5A6478" }}>
            <ArrowLeft size={13} /> Regresar
          </button>
          <button ref={guardarAbonoRef} className="flex-1 py-3 rounded-xl text-white text-[12px] font-bold flex items-center justify-center gap-1.5" style={{ background: "#3FA84A" }}>
            <Check size={13} /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
