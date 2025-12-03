import Header from "@/components/Header/header";
import Hero from "@/components/Hero/hero";
import style from "./paginaInicial.module.css";

export default function PaginaInicial() {
    return (
        <div>
            <Header className={style.header} />
            <Hero className={style.hero} />
        </div>
    );
}