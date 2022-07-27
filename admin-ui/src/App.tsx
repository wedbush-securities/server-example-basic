import AdminUI from "@glue42/server-admin-ui";
import '@glue42/theme';
import '@glue42/theme/dist/packages/rc-select.css';
import "@glue42/server-admin-ui/dist/src/styles/index.css";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import { BasicAuthProvider } from "./basicAuth";
import { Login } from "./Login";
import { Options } from "@glue42/server-api";
import { useState } from "react";

// Some configs
const serverBase = "http://localhost:4356/api";
const base = "";

function App() {
  console.log(`hello - ${serverBase}, ${base}`);

  const [options, setOptions] = useState<Options | undefined>(undefined);
  const [_, setChange] = useState(new Date());
  const [provider, __] = useState(new BasicAuthProvider(setChange, () => setOptions(undefined)));

  if (!options) {
    return (
      <Login url={serverBase} success={setOptions} />
    )
  }
  provider.setOptions(options);

  return (
    <AdminUI
      agGridLicKey="<AG_GRID_LIC_KEY>"
      apiURL={serverBase}
      baseName={base}
      theme="dark"
      auth={provider}
      users={{ canAdd: true, havePasswords: true }}
    />
  );
}

export default App;
