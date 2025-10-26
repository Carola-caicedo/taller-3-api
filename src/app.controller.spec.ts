/**
 * Pruebas unitarias para el controlador principal (AppController).
 * 
 * Verifica que la aplicación retorne correctamente el mensaje esperado.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('debería retornar "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
