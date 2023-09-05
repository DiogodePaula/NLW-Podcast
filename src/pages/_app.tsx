// toda página da nossa aplicação vai ser exibida dentro do app.
// Sempre que eu quiser um componente sempre fique visível dentro
// da aplicação eu chamo ele aqui no app.
import "../styles/global.scss";
import { useState } from "react";

import { Header } from "../components/Header";
import { Player } from "../components/Player";

import styles from "../styles/app.module.scss";
import { PlayerContextProvider } from "../contexts/PlayerContext";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
