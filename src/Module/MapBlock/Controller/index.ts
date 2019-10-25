import Router from 'koa-router';
import { Rsp } from 'blockrpg-core/built/Koa/Rsp';
import * as MapBlockBLL from 'blockrpg-core/built/Model/MapBlock/BLL';
import { Rect, Point } from 'blockrpg-core';
import { MapBlock } from 'blockrpg-core/built/Model/MapBlock/Entity';
import { MapGrid } from 'blockrpg-core/built/Model/MapBlock/Entity/MapGrid';

const router = new Router();

// 矩形查询地图Block信息
router.post('/api/mapeditor/block/queryrect', async (ctx, next) => {
  const params = ctx.request.body;
  // 参数检查
  const mapId = params.mapId;
  if (!mapId || !mapId.trim()) {
    Rsp.Fail(ctx, 'mapId没有正确传入');
    return;
  }
  const x = params.x;
  if (!isFinite(x)) {
    Rsp.Fail(ctx, 'x没有正确传入');
    return;
  }
  const y = params.y;
  if (!isFinite(y)) {
    Rsp.Fail(ctx, 'y没有正确传入');
    return;
  }
  const w = params.w;
  if (!isFinite(w) || w < 1) {
    Rsp.Fail(ctx, 'w没有正确传入（> 0）');
    return;
  }
  const h = params.h;
  if (!isFinite(h) || h < 1) {
    Rsp.Fail(ctx, 'h没有正确传入（> 0）');
    return;
  }
  // 创建查询矩形
  const rect = new Rect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
  const result = await MapBlockBLL.queryRectBLL(mapId, rect);
  Rsp.Success(ctx, result);
});
// 新增地图Block信息
router.post('/api/mapeditor/block/new', async (ctx, next) => {
  const params = ctx.request.body;
  // 参数检查
  const mapId = params.mapId;
  if (!mapId || !mapId.trim()) {
    Rsp.Fail(ctx, 'mapId没有正确传入');
    return;
  }
  const x = params.x;
  if (!isFinite(x)) {
    Rsp.Fail(ctx, 'x没有正确传入');
    return;
  }
  const y = params.y;
  if (!isFinite(y)) {
    Rsp.Fail(ctx, 'y没有正确传入');
    return;
  }
  let grids: any[] = params.grids;
  if (grids && grids.length > 0) {
    grids = grids.map((grid) => new MapGrid(grid));
  } else {
    Rsp.Fail(ctx, 'grids没有正确传入');
    return;
  }
  const block = new MapBlock({
    id: undefined,
    mapId,
    x,
    y,
    grids,
  });
  await MapBlockBLL.newBlock(block);
  Rsp.Success(ctx);
});
// 删除地图Block信息
router.post('/api/mapeditor/block/delete', async (ctx, next) => {
  const params = ctx.request.body;
  // 参数检查
  const mapId = params.mapId;
  if (!mapId || !mapId.trim()) {
    Rsp.Fail(ctx, 'mapId没有正确传入');
    return;
  }
  const x = params.x;
  if (!isFinite(x)) {
    Rsp.Fail(ctx, 'x没有正确传入');
    return;
  }
  const y = params.y;
  if (!isFinite(y)) {
    Rsp.Fail(ctx, 'y没有正确传入');
    return;
  }
  await MapBlockBLL.deleteBlock(mapId, new Point(x, y));
  Rsp.Success(ctx);
});
// 更新地图Block信息
router.post('/api/mapeditor/block/update', async (ctx, next) => {
  const params = ctx.request.body;
  // 参数检查
  const mapId = params.mapId;
  if (!mapId || !mapId.trim()) {
    Rsp.Fail(ctx, 'mapId没有正确传入');
    return;
  }
  const x = params.x;
  if (!isFinite(x)) {
    Rsp.Fail(ctx, 'x没有正确传入');
    return;
  }
  const y = params.y;
  if (!isFinite(y)) {
    Rsp.Fail(ctx, 'y没有正确传入');
    return;
  }
  let grids: any[] = params.grids;
  if (grids && grids.length > 0) {
    grids = grids.map((grid) => new MapGrid(grid));
  } else {
    Rsp.Fail(ctx, 'grids没有正确传入');
    return;
  }
  const block = new MapBlock({
    id: undefined,
    mapId,
    x,
    y,
    grids,
  });
  await MapBlockBLL.updateBlock(block);
  Rsp.Success(ctx);
});
// 查询地图Block信息
router.post('/api/mapeditor/block/query', async (ctx, next) => {
  const params = ctx.request.body;
  // 参数检查
  const mapId = params.mapId;
  if (!mapId || !mapId.trim()) {
    Rsp.Fail(ctx, 'mapId没有正确传入');
    return;
  }
  const x = params.x;
  if (!isFinite(x)) {
    Rsp.Fail(ctx, 'x没有正确传入');
    return;
  }
  const y = params.y;
  if (!isFinite(y)) {
    Rsp.Fail(ctx, 'y没有正确传入');
    return;
  }
  const result = await MapBlockBLL.queryBlock(mapId, new Point(x, y));
  if (result) {
    Rsp.Success(ctx, result.ToFE());
  } else {
    Rsp.Fail(ctx, '没有查询到MapBlock信息');
  }
});


export default router.routes();
