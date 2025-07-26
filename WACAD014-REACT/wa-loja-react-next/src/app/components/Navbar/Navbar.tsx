"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';

 export default function Navbar() {
   const pathname = usePathname();

  // Ocultar navbar em rotas específicas
  if (pathname === "/login" || pathname === "/cadastro") {
    return null;
  }
  return (
     <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            Loja WA
          </Link>
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
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Início
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/carrinho">
                  Carrinho
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/favoritos">
                  Favoritos
                </Link>
              </li>
            </ul>

            <button className="btn btn-dark">Sair</button>
          </div>
        </div>
      </nav>
  );
 }
