import { LegalRoute, legalMetadata } from "@/components/sections/legal/LegalRoute";
import { refund } from "@/data/legal";

export const metadata = legalMetadata(refund);

export default function Page() {
  return <LegalRoute page={refund} />;
}
