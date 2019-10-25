import Router from 'koa-router';
import { Rsp } from 'blockrpg-core/built/Koa/Rsp';
import { queryRectBLL } from 'blockrpg-core/built/Model/MapBlock/BLL';
import { Rect } from 'blockrpg-core';

const router = new Router();

// 矩形查询地图Block信息
router.post('/api/map/block/queryrect', async (ctx, next) => {
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
  const result = await queryRectBLL(mapId, rect);
  Rsp.Success(ctx, result);
});

export default router.routes();
