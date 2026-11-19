import { LegalRoute, legalMetadata } from "@/components/sections/legal/LegalRoute";
import { dpa } from "@/data/legal";

export const metadata = legalMetadata(dpa);

export default function Page() {
  return <LegalRoute page={dpa} />;
}
