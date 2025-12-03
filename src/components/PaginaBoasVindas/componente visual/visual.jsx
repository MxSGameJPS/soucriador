import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "./tituloESubtitulo/tituloESubtitulo";
import DotScreenShader from "../DotScreenShader";
import style from "./visual.module.css";
import BotaoGoogle from "../../botãogoogle/botãogoogle";
import Registro from "../../modalCadastro/registro";
import Login from "../../modalLogin/login";
import { supabase } from "../../../lib/supabaseClient";

export default function DemoOne() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      console.log("Check User:", user, "Error:", userError);

      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", user.id)
          .maybeSingle(); // Use maybeSingle to avoid error if no row

        console.log("Profile:", profile, "Profile Error:", profileError);

        // Show modal if profile is missing OR if first/last name are missing
        if (!profile || !profile.first_name || !profile.last_name) {
          console.log("Showing modal...");
          setUserData({
            email: user.email,
            full_name: user.user_metadata.full_name,
          });
          setShowModal(true);
        } else {
          router.push("/PaginaInicial");
        }
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth Event:", event);
        if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
          checkUser();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleRegistroSuccess = () => {
    console.log("handleRegistroSuccess called! Switching to Login modal.");
    setShowModal(false);
    setTimeout(() => {
      console.log("Setting showLoginModal to true");
      setShowLoginModal(true);
    }, 100); // Small delay to ensure state updates don't conflict (optional but safer for debugging)
  };

  return (
    <div className={style.container}>
      <div className={style.bg}>
        <DotScreenShader />
      </div>
      <div className={style.content}>
        <h1 className={style.title}>
          <Loader />
        </h1>
        <p className={style.subtitle}>
          Site criado para ajudar você criador de conteúdo a transformar suas
          ideias em realidade e ter sucesso.
        </p>
        <BotaoGoogle />
      </div>
      <Registro
        isOpen={showModal}
        onClose={handleRegistroSuccess}
        initialData={userData}
      />
      <Login isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
