// dentro do next usamos o css modules onde cada component tem sua própria estilização
// ou seja os nomes das classes usados aqui só terão efeito efeito nesse componente
import styles from "./styles.module.scss";

import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

export function Header() {
  const currentDate = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="podcast" />
      <p>O melhor para você ouvir, sempre!</p>
      <span>{currentDate}</span>
    </header>
  );
}
