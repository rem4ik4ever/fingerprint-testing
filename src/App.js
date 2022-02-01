import "./App.css";
import {
  getClientJSClient,
  getFingerprintJSClient,
} from "./fingerprint";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [fpClient, setFP] = useState(null);

  useEffect(() => {
    getFingerprintJSClient().then((client) => setFP(client));
  }, []);
  const clientJSHash = useMemo(
    () =>
      Object.getOwnPropertyNames(
        Object.getPrototypeOf(getClientJSClient())
      ).reduce((mp, method) => {
        const name = method.replace("get", "").replace("is", "");
        try {
          return {
            ...mp,
            [name]: getClientJSClient()[method](),
          };
        } catch (error) {
          return {
            ...mp,
            [name]: null,
          };
        }
      }, {}),
    []
  );
  console.log({ clientJSHash, type: typeof clientJSHash });
  return (
    <div className="row">
      <table className="table">
        <thead>
          <tr>
            <td colSpan={2} className="center">ClientJS</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fingerprint</td>
            <td>{clientJSHash['Fingerprint']}</td>
          </tr>
          {Object.keys(clientJSHash).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td className="content-cell">{ typeof clientJSHash === 'object' ? (<pre>{JSON.stringify(clientJSHash[key], null, 2)}</pre>) : clientJSHash[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {fpClient && <table className="table">
        <thead>
          <tr>
            <td colSpan={2} className="center">FingerprintJS</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fingerprint</td>
            <td>{fpClient.visitorId}</td>
          </tr>
          <tr>
            <td>Confidence</td>
            <td><pre>{JSON.stringify(fpClient.confidence, null, 2)}</pre></td>
          </tr>
          {Object.keys(fpClient.components).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td className="content-cell">{ typeof fpClient.components[key].value === 'object' ? (<pre>{JSON.stringify(fpClient.components[key].value, null, 2)}</pre>) : fpClient.components[key].value}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}

export default App;
