import type { AppProps /*, AppContext */ } from "next/app";
import { Provider } from "react-redux";
import { Provider as SessionProvider } from "next-auth/client";
import "../styles/globals.css";
import "../styles/skin.css";
import "../styles/content.inline.css";
import "antd/dist/antd.css";
import { useStore } from "../lib/store";

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <SessionProvider
      options={{
        // Client Max Age controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        clientMaxAge: 0,
        // Keep Alive tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <Provider store={store}>
        {" "}
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
