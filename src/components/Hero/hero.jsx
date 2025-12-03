import Image from "next/image";
import style from "./hero.module.css";

export default function Hero() {
    return (
        <div className={style.heroContainer}>
            <div className={style.heroText}>
                <h2>Um site inteiro desenvolvido para fazer você ter sucesso na sua carreira como criador de conteúdo.</h2>
            </div>
            <div className={style.heroImageContainer}>
                <Image className={style.heroImage} src="/image/hero.webp" alt="influencer" width={900} height={500} />  
            </div>
        </div>
    );
}
