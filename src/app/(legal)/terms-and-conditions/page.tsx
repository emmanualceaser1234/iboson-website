import { LegalRoute, legalMetadata } from "@/components/sections/legal/LegalRoute";
import { terms } from "@/data/legal";

export const metadata = legalMetadata(terms);

export default function Page() {
  return <LegalRoute page={terms} />;
}
