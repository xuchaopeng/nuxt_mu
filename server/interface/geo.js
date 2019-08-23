const Router = require('koa-router');
const axios = require('./utils/axios');
const Province = require('../dbs/models/province');
const City = require('../dbs/models/city');

let router = new Router({ prefix: '/geo' });

router.get('/getPosition', async ctx => {
  let {
    status,
    data: { province, city }
  } = await axios.get(`http://cp-tools.cn/geo/getPosition`);
  if (status === 200) {
    ctx.body = {
      province,
      city
    };
  } else {
    ctx.body = {
      province: '',
      city: ''
    };
  }
});

router.get('/province', async ctx => {
  let province = await Province.find();
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      };
    })
  };
});

router.get('province/:id', async ctx => {
  let city = await City.findOne({ id: ctx.params.id });
  ctx.body = {
    code: 0,
    city: city.value.map(item => {
      return { province: item.province, id: item.id, name: item.name };
    })
  };
});

router.get('/city', async (ctx) => {
  let city = [];
  let result = await City.find();
  result.forEach(item => {
    city = city.concat(item.value)
  });
  ctx.body = {
    code:0,
    city:city.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划' ? item.province : item.name
      }
    })
  }
})

module.exports = router
