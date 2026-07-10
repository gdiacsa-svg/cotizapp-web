"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft, ChevronRight, Home, Users, Box, FileText, Wallet, Settings,
  MousePointer2, X, Check, TrendingUp, Send, ThumbsUp, Lock,
} from "lucide-react";
import useInView from "@/hooks/useInView";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const MONTHS = [
  { label: "Junio 2026", cot: 14, enviadas: 9, aprobadas: 6, pagado: 31800, saldo: 5200 },
  { label: "Julio 2026", cot: 18, enviadas: 12, aprobadas: 9, pagado: 42300, saldo: 8150 },
];

const STATUS_STYLE = {
  CREADA: { bg: "#FCEACB", fg: "#B8791A" },
  ENVIADA: { bg: "#E7F0FF", fg: "#2F87E0" },
  APROBADA: { bg: "#E3F5E7", fg: "#2E8B44" },
  CANCELADA: { bg: "#EDF0F5", fg: "#7A8599" },
};

const BASE_QUOTES = [
  { id: 1, client: "Ferretería Domínguez", folio: "COT-0231", amount: 4200, status: "APROBADA" },
  { id: 2, client: "Marisol Chan", folio: "COT-0230", amount: 1850, status: "ENVIADA" },
  { id: 3, client: "Andrés Ku", folio: "COT-0229", amount: 3100, status: "CREADA" },
  { id: 4, client: "Rodolfo Aké", folio: "COT-0227", amount: 960, status: "CANCELADA" },
];

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

export default function DashboardShowcase() {
  const phoneRef = useRef(null);
  const nextMonthRef = useRef(null);
  const rowRef = useRef(null);
  const aproburRef = useRef(null);
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const [screen, setScreen] = useState("dashboard");
  const [monthIdx, setMonthIdx] = useState(0);
  const [quotes, setQuotes] = useState(BASE_QUOTES);
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);

  const cursor = useCursor(phoneRef, scaleRef);
  const isVisible = useInView(containerRef, 0.2);
  const month = MONTHS[monthIdx];

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
        setScreen("dashboard"); setMonthIdx(0); setQuotes(BASE_QUOTES); cursor.hide();
        await wait(1200); if (guard()) return;

        cursor.moveTo(nextMonthRef); await wait(700); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setMonthIdx(1); await wait(1600); if (guard()) return;

        cursor.moveTo(rowRef); await wait(700); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide(); setScreen("detail"); await wait(1100); if (guard()) return;

        cursor.moveTo(aproburRef); await wait(700); if (guard()) return;
        await cursor.click(); await wait(150); if (guard()) return;

        cursor.hide();
        setQuotes((qs) => qs.map((q) => (q.id === 2 ? { ...q, status: "APROBADA" } : q)));
        await wait(1000); if (guard()) return;

        setScreen("dashboard"); await wait(2600); if (guard()) return;
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
                {screen === "dashboard" && (
                  <DashboardScreen month={month} quotes={quotes} nextMonthRef={nextMonthRef} rowRef={rowRef} />
                )}
                {screen === "detail" && <DetailScreen aproburRef={aproburRef} />}
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
        .kpi-pop { animation: pop .5s ease; }
        .row-pop { animation: pop .6s ease; }
        @keyframes pop { 0%{transform:scale(.94); opacity:.4} 100%{transform:scale(1); opacity:1} }
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
    { icon: Home, label: "Inicio", active: true }, { icon: Users, label: "Clientes" },
    { icon: Box, label: "Productos" }, { icon: FileText, label: "Cotizar" },
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

function Kpi({ icon: Icon, label, value, locked, tone, keyed }) {
  return (
    <div key={keyed} className="kpi-pop rounded-2xl p-3" style={{ border: "1.5px solid #EDF0F5" }}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[8px] font-bold tracking-wide" style={{ color: "#7A8599" }}>{label}</span>
        <Icon size={12} color={tone} />
      </div>
      {locked ? (
        <p className="text-[15px] font-extrabold tracking-widest" style={{ color: "#B4ABC2" }}>$ ••••</p>
      ) : (
        <p className="text-[15px] font-extrabold" style={{ color: tone }}>{value}</p>
      )}
    </div>
  );
}

function DashboardScreen({ month, quotes, nextMonthRef, rowRef }) {
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#fff" }}>
      <div className="px-5 pt-5 pb-4 rounded-b-[26px]" style={{ background: "linear-gradient(135deg,#2B1B44,#22163A)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-extrabold text-white">Instalaciones López</p>
            <p className="text-[9px] mt-0.5" style={{ color: "#B9AEDD" }}>Panel de inicio</p>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold" style={{ background: "#3A2A56" }}>IL</div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl px-2 py-1.5" style={{ background: "#3A2A56" }}>
          <ChevronLeft size={14} color="#B9AEDD" />
          <span className="text-[11px] font-bold text-white">{month.label}</span>
          <button ref={nextMonthRef}>
            <ChevronRight size={14} color="#fff" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 grid grid-cols-2 gap-2.5" key={month.label}>
        <Kpi keyed={`cot-${month.label}`} icon={FileText} label="TOTAL COT." value={month.cot} tone="#2F87E0" />
        <Kpi keyed={`env-${month.label}`} icon={Send} label="ENVIADAS" value={month.enviadas} tone="#E0932F" />
        <Kpi keyed={`apr-${month.label}`} icon={ThumbsUp} label="APROBADAS" value={month.aprobadas} tone="#3FA84A" />
        <Kpi keyed={`pag-${month.label}`} icon={TrendingUp} label="TOTAL PAGADO" value={`$${month.pagado.toLocaleString()}`} tone="#3FA84A" />
      </div>
      <div className="px-4 pt-2.5" key={`saldo-${month.label}`}>
        <Kpi keyed="saldo" icon={Lock} label="SALDO PENDIENTE" locked tone="#B4ABC2" />
      </div>

      <div className="flex-1 px-4 pt-3.5 space-y-2 overflow-hidden">
        <p className="text-[10px] font-bold" style={{ color: "#7A8599" }}>ÚLTIMAS COTIZACIONES</p>
        {quotes.map((q) => {
          const s = STATUS_STYLE[q.status];
          return (
            <div
              key={q.id}
              ref={q.id === 2 ? rowRef : null}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${q.id === 2 ? "row-pop" : ""}`}
              style={{ background: "#F7F9FC", border: "1px solid #E7EBF2" }}
            >
              <div className="min-w-0">
                <p className="text-[11.5px] font-bold truncate" style={{ color: "#1F1B2E" }}>{q.client}</p>
                <p className="text-[9px] mt-0.5" style={{ color: "#9AA3B4" }}>{q.folio} · ${q.amount.toLocaleString()}</p>
              </div>
              <span className="shrink-0 text-[8px] font-bold px-2 py-1 rounded-md" style={{ background: s.bg, color: s.fg }}>{q.status}</span>
            </div>
          );
        })}
      </div>
      <BottomNav />
    </div>
  );
}

function DetailScreen({ aproburRef }) {
  return (
    <div className="screen-in h-full flex flex-col" style={{ background: "#fff" }}>
      <div className="px-5 pt-5 pb-4 flex items-start justify-between" style={{ background: "#15111F" }}>
        <div>
          <p className="text-white text-[16px] font-extrabold">Marisol Chan</p>
          <p className="text-[11px] mt-0.5" style={{ color: "#8C8299" }}>COT-0230 · $1,850.00</p>
        </div>
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#3A3550" }}>
          <X size={13} color="#fff" />
        </div>
      </div>

      <div className="flex-1 px-5 pt-6 space-y-5">
        <div>
          <p className="text-[10px] font-bold mb-2.5" style={{ color: "#7A8599" }}>SEGUIMIENTO</p>
          <div className="flex items-center gap-1.5">
            {["CREADA", "ENVIADA", "APROBADA"].map((s, i) => (
              <div key={s} className="flex items-center gap-1.5 flex-1">
                <div className="flex-1 h-1.5 rounded-full" style={{ background: i <= 1 ? "#2F87E0" : "#E7EBF2" }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[8px] font-bold" style={{ color: "#2F87E0" }}>CREADA</span>
            <span className="text-[8px] font-bold" style={{ color: "#2F87E0" }}>ENVIADA</span>
            <span className="text-[8px] font-bold" style={{ color: "#B4ABC2" }}>APROBADA</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl" style={{ background: "#F7F9FC" }}>
          <div className="flex justify-between text-[11px]">
            <span style={{ color: "#7A8599" }}>Instalación de contactos</span>
            <span className="font-bold" style={{ color: "#1F1B2E" }}>$1,850.00</span>
          </div>
        </div>

        <button ref={aproburRef} className="w-full py-3 rounded-xl text-white text-[12px] font-bold flex items-center justify-center gap-2" style={{ background: "#3FA84A" }}>
          <Check size={14} /> Marcar como Aprobada
        </button>
      </div>
    </div>
  );
}
