import "@mantine/core/styles.css";
import ReactDOM from "react-dom/client";
import { useFullscreen, useHotkeys } from "@mantine/hooks";
import { useMantineColorScheme, MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import { Router } from "./Router.tsx";

const Main = () => {
  const { toggleColorScheme } = useMantineColorScheme();
  const { toggle: toggleFulScreenMode } = useFullscreen();

  useHotkeys([
    ["mod+J", () => toggleColorScheme()],
    ["mod+f", () => toggleFulScreenMode()],
  ]);

  return <Router />;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider defaultColorScheme="dark" theme={theme}>
    <Main />
  </MantineProvider>,
);
