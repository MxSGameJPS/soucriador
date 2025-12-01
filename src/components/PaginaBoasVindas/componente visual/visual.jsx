import Loader from "./tituloESubtitulo/tituloESubtitulo";
import DotScreenShader from "../DotScreenShader";
import style from "./visual.module.css";

export default function DemoOne() {
  return (
    <div className={style.container}>
      <div className={style.bg}>
        <DotScreenShader />
      </div>
      <div className={style.content}>
        <h1 className={style.title}><Loader /></h1>
        <p className={style.subtitle}>
          Site criado para ajudar você criador de conteúdo a transformar suas
          ideias em realidade e ter sucesso.
        </p>
      </div>
    </div>
  );
}
