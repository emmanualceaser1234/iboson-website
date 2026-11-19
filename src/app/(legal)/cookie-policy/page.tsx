import { LegalRoute, legalMetadata } from "@/components/sections/legal/LegalRoute";
import { cookies } from "@/data/legal";

export const metadata = legalMetadata(cookies);

export default function Page() {
  return <LegalRoute page={cookies} />;
}
