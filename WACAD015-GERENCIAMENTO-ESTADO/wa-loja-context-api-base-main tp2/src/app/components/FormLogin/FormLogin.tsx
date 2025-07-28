"use client";

import Link from "next/link";
import { useAuth } from "@/app/contextos/AuthContexto";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  senha: string;
};

export default function FormLogin() {
  const { login } = useAuth(); // ✅ Importa o login do contexto

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // aqui você poderia validar senha com backend se quisesse
    login(data.email); // ✅ Faz login com email
  };

  return (
    <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control form-control-lg"
            id="email"
            aria-describedby="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-danger">Esse campo é obrigatório</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="senha" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control form-control-lg"
            id="senha"
            {...register("senha", { required: true, minLength: 6 })}
          />
          {errors.senha?.type === "required" && (
            <span className="text-danger">Esse campo é obrigatório</span>
          )}
          {errors.senha?.type === "minLength" && (
            <span className="text-danger">Mínimo de 6 (seis) caracteres</span>
          )}
        </div>

        <div className="d-grid col-12">
          <button type="submit" className="btn btn-success">
            Entrar
          </button>
        </div>

        <div className="text-center mt-3">
          <Link href="/cadastro" className="btn btn-link">
            Não tenho cadastro
          </Link>
        </div>
      </form>
    </div>
  );
}
