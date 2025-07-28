"use client";

import Link from "next/link";
import { useAuth } from "@/app/contextos/AuthContexto";


export default function Navbar() {
  const { emailUsuario, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Loja WA
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0 ">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/favoritos">
                Lista de Favoritos
              </Link>
            </li>
          </ul>

          {/* Se usuário estiver logado */}
          {emailUsuario ? (
            <div className="d-flex align-items-center gap-3">
              <span className="text-secondary">{emailUsuario}</span>
              <button type="button" className="btn btn-secondary" onClick={logout}>
                Sair
              </button>
            </div>
          ) : (
            // Se não estiver logado
            <Link className="nav-link" href="/login">
              <button type="button" className="btn btn-success">
                Entrar
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
