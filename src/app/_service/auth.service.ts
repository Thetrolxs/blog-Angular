import { Injectable } from '@angular/core';

/**
 * AuthService es un servicio que gestiona la autenticación del usuario utilizando el almacenamiento local del navegador.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Clave utilizada para almacenar el token en el localStorage.
  private tokenKey = 'token';

  constructor() {}

  /**
   * Guarda un token en el almacenamiento local.
   *
   * @param token El token que se guardará.
   */
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Recupera el token del almacenamiento local.
   *
   * @returns El token almacenado o null si no existe.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Elimina el token del almacenamiento local.
   */
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Verifica si el usuario está autenticado.
   *
   * @returns true si el token existe en el almacenamiento local, false de lo contrario.
   */
  isAuth(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  /**
   * Cierra la sesión del usuario eliminando el token del almacenamiento local.
   */
  logOut(): void {
    this.removeToken();
  }
}

