import { Pulsar } from "@uiball/loaders";

import { useAppSelector } from "@/shared/lib/hooks/use-redux";

export default function PulsarLoader({ size }: { size: number }) {
  const theme = useAppSelector((state) => state.settings.theme);
  return (
    <Pulsar size={size} color={theme === "light" ? "#121212" : "#ffffff"} />
  );
}
