/**
 * Punto de entrada principal de la aplicación NestJS.
 * 
 * Crea la instancia de la aplicación, configura los pipes globales
 * de validación y lanza el servidor en el puerto definido.
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Configuración global de validación de DTOs.
   * 
   * - `whitelist`: elimina propiedades no declaradas en los DTOs.
   * - `forbidNonWhitelisted`: lanza error si se envían campos no válidos.
   */
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Escucha el puerto definido en las variables de entorno o usa 3000 por defecto.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
