import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';
import { auth } from '../_interfaces/auth';


/**
 * LoginService es un servicio que gestiona las operaciones de autenticación y registro de usuarios.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // URL base de la API de autenticación
  private apiUrl = 'http://localhost:5031/api/Auth';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Inicia sesión con las credenciales proporcionadas.
   *
   * @param form El formulario con las credenciales de inicio de sesión.
   * @returns Una promesa que se resuelve con los datos de inicio de sesión si la operación es exitosa.
   * @throws Un error si la operación falla.
   */
  async login(form: any): Promise<auth> {
    try {
      const data = await firstValueFrom(
        this.http.post<auth>(`${this.apiUrl}/login`, form.value)
      );
      if (data && data.token) {
        await this.authService.setToken(data.token);
      }
      return data;
    } catch (error: any) {
      let errorMessage = this.handleError(error);
      return Promise.reject({ error: { message: errorMessage } });
    }
  }

  /**
   * Registra un nuevo usuario con los datos proporcionados.
   *
   * @param form El formulario con los datos de registro.
   * @returns Una promesa que se resuelve con los datos de registro si la operación es exitosa.
   * @throws Un error si la operación falla.
   */
  async register(form: any): Promise<auth> {
    try {
      const data = await firstValueFrom(
        this.http.post<auth>(`${this.apiUrl}/register`, form.value)
      );
      if (data && data.token) {
        await this.authService.setToken(data.token);
      }
      return data;
    } catch (error: any) {
      let errorMessage = this.handleError(error);
      return Promise.reject({ error: { message: errorMessage } });
    }
  }

  /**
   * Maneja los errores ocurridos durante las solicitudes HTTP.
   *
   * @param error El error ocurrido durante la solicitud.
   * @returns Un mensaje descriptivo del error.
   */
  private handleError(error: any): string {
    let errorMessage = 'Error desconocido';
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // error del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // respuesta fallida del servidor
        errorMessage = `Error: ${error.status} - ${error.error.message}`;
      }
    } else {
      // error desconocido
      errorMessage = `Error: ${error.message}`;
    }
    console.error(errorMessage);
    return errorMessage;
  }
}
