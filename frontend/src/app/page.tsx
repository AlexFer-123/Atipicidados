"use client";

import Image from "next/image";
import logos from "../../public/images/logos.svg";
import { SlashedEyeIcon, OpenEyeIcon } from "../../public/icons/Icons";
import { useState } from "react";
import Link from "next/link";
import Checkbox from "@/components/Checkbox";
import { useRouter } from "next/navigation";

export default function Home() {
  const [userType, setUserType] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [id, setID] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (key: string, value: string) => {
    setLoginData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (value: string) => {
    setUserType(value);
  }

  const revealLogin = () => {
    console.log(loginData);
  }

  const revealUserType = () => {
    console.log(userType);
  }

  const handleLogin = async (userType: any) => {
    let url = ""
    switch (userType) {
      case ("Gerente"):
        url = "http://https://atipicidades-1.orender.com/gerentes/login"; 
        localStorage.setItem(userType, 'gerente');
        break;
      case ("Colaborador"):
        url = "http://https://atipicidades-1.orender.com/colaboradores/login"
        localStorage.setItem(userType, 'colaborador');

        break;
      case ("Paciente"):
        url = "http://https://atipicidades-1.orender.com/pacientes/login"
        localStorage.setItem(userType, 'paciente');

        break;
      default:
        console.error("Unknown user type");
        return;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email: loginData.email, password: loginData.password }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data);
      const gerente = data.gerente
      setID(gerente.id);
      localStorage.setItem("userEmail", loginData.email);
      localStorage.setItem("userID", gerente.id);
      const homeLink = `/home/${userType.toLowerCase()}?email=${encodeURIComponent(loginData.email)}&id=${encodeURIComponent(gerente.id)}`
      localStorage.setItem("homeLink", homeLink)
      
      router.push(`/home/${userType.toLowerCase()}?email=${encodeURIComponent(loginData.email)}&id=${encodeURIComponent(gerente.id)}`);
    } catch (error) {
      console.log("Erro em seu login", error);
    }
  };

  return (
    <main className="flex min-h-screen">
      <div className="flex w-[40%] justify-center items-center">
        <p>colocar imagem aqui</p>
      </div>

      <div className="flex bg-blue-100 w-[60%] flex-col justify-center items-center gap-10">
        <Image
          src={logos}
          alt="logos atipicidades"
        />

        <form className="flex flex-col justify-center items-center gap-9">
          <h1>Acesse sua conta</h1>
          <div className="flex flex-row gap-4">
            <label className="flex items-center">
              <Checkbox
                value="Gerente"
                onChange={(e) => handleCheckboxChange(e.target.value)}
                checked={userType === "Gerente"}
              />

              Gerente
            </label>
            <label className="flex items-center">
              <Checkbox
                value="Colaborador"
                onChange={(e) => handleCheckboxChange(e.target.value)}
                checked={userType === "Colaborador"}
              />

              Colaborador
            </label>
            <label className="flex items-center">
              <Checkbox
                value="Paciente"
                onChange={(e) => handleCheckboxChange(e.target.value)}
                checked={userType === "Paciente"}
              />

              Paciente
            </label>
          </div>
          <div className="flex flex-col gap-[10px] w-full">
            <input
              className="login"
              type="text"
              name="email"
              placeholder="E-mail ou CPF"
              value={loginData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required />

            <div className="relative w-full">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="login"
                name="senha"
                placeholder="Senha"
                value={loginData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-300 rounded-r-md"
              >
                {passwordVisible ? <SlashedEyeIcon /> : <OpenEyeIcon />}
              </button>
            </div>

            <div className="flex px-[10px] text-[14px] justify-end w-full">
              <Link href='/recuperarsenha'>
                <p className="font-semibold text-blue-800 cursor-pointer">Esqueceu a senha?</p>
              </Link>
            </div>
          </div>
          {/* <button type="button" onClick={revealLogin}>Mostrar Dados do Login</button>
          <button type="button" onClick={revealUserType}>Mostrar Tipo de Usuário</button> */}
          <div className="flex flex-col gap-2 w-full">
            <button
              type="button"
              className="entrar botao"
              onClick={() => handleLogin(userType)}
            >
              Entrar
            </button>
            <Link href='/precadastro'>
              <button
                className="botaoreverse w-full">
                Fazer o pré-cadastro
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
