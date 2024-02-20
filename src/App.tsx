import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

import "./App.css";

import ReduxProvider from "./ReduxProvider";
import Layout from "./Layout";

export default function App() {
  return (
    <ReduxProvider>
      <MantineProvider theme={theme}>
        <Layout />
      </MantineProvider>
    </ReduxProvider>
  );
}
