import type { Metadata } from "next";
import ComingSoon from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Tutorial — CotizApp",
};

export default function TutorialPage() {
  return <ComingSoon folio="003" title="Tutorial" />;
}
