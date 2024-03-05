import { Pulsar } from "@uiball/loaders";

import { useTheme } from "@/shared/lib/hooks/use-theme";

export default function PulsarLoader({ size }: { size: number }) {
  const { isDark } = useTheme();
  return <Pulsar size={size} color={isDark ? "#121212" : "#ffffff"} />;
}
