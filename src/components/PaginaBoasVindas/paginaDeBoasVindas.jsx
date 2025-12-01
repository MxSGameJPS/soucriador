"use client";

import DemoOne from "./componente visual/visual";
import DotScreenShader from "./DotScreenShader";
import style from "./paginaDeBoasVindas.module.css";

export default function PaginaDeBoasVindas() {
  return (
    <section className={style.paginaDeBoasVindas}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <DotScreenShader />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <DemoOne />
      </div>
    </section>
  );
}
