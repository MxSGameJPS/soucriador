import Image from "next/image";
import styles from "./page.module.css";
import PaginaDeBoasVindas from "@/components/PaginaBoasVindas/paginaDeBoasVindas";

export default function Home() {
  return (
    <div className={styles.page}>
      <PaginaDeBoasVindas />
    </div>
  );
}
