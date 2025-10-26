/**
 * Controlador principal de la aplicación.
 * 
 * Gestiona las rutas base (raíz) del sistema y sirve como punto
 * de prueba para verificar que la API esté en funcionamiento.
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint principal de prueba.
   * 
   * @returns Un mensaje de saludo básico.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
