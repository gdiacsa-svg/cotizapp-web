export type TutorialSectionMeta = {
  id: string;
  num: string;
  label: string;
};

export const TUTORIAL_SECTIONS: TutorialSectionMeta[] = [
  { id: "que-es", num: "01", label: "¿Qué es CotizApp?" },
  { id: "instalacion", num: "02", label: "Primeros pasos" },
  { id: "dashboard", num: "03", label: "Inicio" },
  { id: "clientes", num: "04", label: "Clientes" },
  { id: "productos", num: "05", label: "Productos" },
  { id: "cotizaciones", num: "06", label: "Cotizaciones" },
  { id: "cobros", num: "07", label: "Cobros" },
  { id: "perfil", num: "08", label: "Perfil" },
  { id: "planes", num: "09", label: "Gratis vs Pro" },
  { id: "respaldo", num: "10", label: "Respaldo" },
];
