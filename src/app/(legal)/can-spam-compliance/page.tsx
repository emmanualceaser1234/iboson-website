import { LegalRoute, legalMetadata } from "@/components/sections/legal/LegalRoute";
import { canSpam } from "@/data/legal";

export const metadata = legalMetadata(canSpam);

export default function Page() {
  return <LegalRoute page={canSpam} />;
}
