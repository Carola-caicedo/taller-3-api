/**
 * Pruebas end-to-end (E2E) del módulo principal de la aplicación.
 *
 * Estas pruebas verifican el correcto funcionamiento del servidor NestJS
 * desde un punto de vista externo, realizando peticiones HTTP reales
 * mediante la librería `supertest`.
 *
 * Se asegura que el endpoint raíz (`/`) devuelva la respuesta esperada:
 * "Hello World!" con código de estado HTTP 200.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest'; // Importación correcta para evitar errores de tipos
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  /** Instancia de la aplicación NestJS utilizada para las pruebas */
  let app: INestApplication;

  /**
   * Se ejecuta una vez antes de todas las pruebas.
   *
   * - Crea un módulo de prueba basado en `AppModule`.
   * - Inicializa la aplicación NestJS.
   * - Aplica los mismos `ValidationPipe` globales definidos en `main.ts`.
   */
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Cargamos el módulo raíz completo
    }).compile();

    app = moduleFixture.createNestApplication();

    // Pipes globales para validar y limpiar los DTOs (igual que en main.ts)
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,             // Elimina propiedades no definidas en los DTOs
        forbidNonWhitelisted: true,  // Lanza error si se envían propiedades desconocidas
      }),
    );

    await app.init(); // Inicializa la app antes de correr los tests
  });

  /**
   * Se ejecuta una sola vez al final de todas las pruebas.
   *
   * - Cierra la aplicación y libera los recursos.
   * - Evita que Jest quede colgado al terminar los tests.
   */
  afterAll(async () => {
    await app.close();
  });

  /**
   * Prueba principal:
   * Verifica que la ruta raíz (`/`) devuelva el texto "Hello World!"
   * y un estado HTTP 200 (OK).
   */
  it('GET / → debería responder "Hello World!"', async () => {
    const response = await request(app.getHttpServer()).get('/');

    // Verificamos el código de estado de la respuesta
    expect(response.status).toBe(200);

    // Verificamos el cuerpo de la respuesta (trim para evitar saltos de línea)
    expect(response.text.trim()).toBe('Hello World!');
  });
});
