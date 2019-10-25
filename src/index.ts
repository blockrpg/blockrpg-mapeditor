import Koa from 'koa';
import Router from 'koa-router';
import * as BRCore from 'blockrpg-core';
import MapBlockController from './Module/MapBlock/Controller';

const app = new BRCore.Koa.App('MapEditor', (app) => {
  return app.use(MapBlockController);
}, false);

app.Listen();
