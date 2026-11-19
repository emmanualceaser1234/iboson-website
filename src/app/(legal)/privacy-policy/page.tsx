import { LegalRoute, legalMetadata } from "@/components/sections/legal/LegalRoute";
import { privacy } from "@/data/legal";

export const metadata = legalMetadata(privacy);

export default function Page() {
  return <LegalRoute page={privacy} />;
}
