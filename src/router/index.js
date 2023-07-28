import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

window.onload = getPath;
Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.replace = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

function getPath() {
  axios.get("/JBTSHJ/ScreenRoute/EnableTempletonScreenRoute").then((res) => {
    // console.log("获取路由", res);
    if (res.status == 200) {
      let routerlist = res.data;
      routes.push({
        path: "/",
        redirect: routerlist[0].path,
      });
      routerlist.forEach((item) => {
        routes.push({
          path: item.path,
          name: item.name,
          component: () => import(`../views/${item.name}/index`),
          meta: {
            hidden: item.hidden,
          },
        });
      });
      console.log("处理好的路由", routes);
      router.addRoutes(routes);
    }
  });
}
const routes = [
  // 运营监测
  // {
  //   path: '/',
  //   name: 'operationMonitoring',
  //   component: () => import('../views/operationMonitoring/index')
  // },
  // 检修作业管控
  // {
  //   path: "/maintenanceWork",
  //   name: "maintenanceWork",
  //   component: () => import("../views/maintenanceWork/index"),
  // },
  // 非抢工单管控  orderControl
  // {
  //   path: "/orderControl",
  //   name: "orderControl",
  //   component: () => import("../views/orderControl/index"),
  // },
  // 阳光业扩 sunshineIndustryExpansion
  // {
  //   path: "/sunshineIndustryExpansion",
  //   name: "sunshineIndustryExpansion",
  //   component: () => import("../views/sunshineIndustryExpansion/index"),
  // },
  // 中心概括   centerSummarized
  // {
  //   path: "/centerSummarized",
  //   name: "centerSummarized",
  //   component: () => import("../views/centerSummarized/index"),
  // },
  // 工作成果   workAchievement
  // {
  //   path: "/workAchievement",
  //   name: "workAchievement",
  //   component: () => import("../views/workAchievement/index"),
  // },
  // 质量服务    qualityService
  // {
  //   path: "/qualityService",
  //   name: "qualityService",
  //   component: () => import("../views/qualityService/index"),
  // },
  // 配电自动化   distributionAutomation
  // {
  //   path: "/distributionAutomation",
  //   name: "distributionAutomation",
  //   component: () => import("../views/distributionAutomation/index"),
  // },
  // 配电资源   distributionResources
  // {
  //   path: "/distributionResources",
  //   name: "distributionResources",
  //   component: () => import("../views/distributionResources/index"),
  // },
  // { path: '*', redirect: '/partyConstruction' },
  // {
  //   path: "/",
  //   redirect: "/gridOverview",
  // },
  // 电网一览
  {
    path: "/gridOverview",
    name: "gridOverview",
    component: () => import("../views/gridOverview/index"),
  },
  // // 服务指挥
  // {
  //   path: "/serviceCommand",
  //   name: "serviceCommand",
  //   component: () => import("../views/serviceCommand/index"),
  // },
  // // 保供电管控  powerSupplyControl
  // {
  //   path: "/powerSupplyControl",
  //   name: "powerSupplyControl",
  //   component: () => import("../views/powerSupplyControl/index"),
  // },
  // // 供电可靠性  powerSupplyReliability
  // {
  //   path: "/powerSupplyReliability",
  //   name: "powerSupplyReliability",
  //   component: () => import("../views/powerSupplyReliability/index"),
  // },
  // // 党建
  // {
  //   path: "/partyConstruction",
  //   name: "partyConstruction",
  //   component: () => import("../views/partyConstruction/index"),
  // },
  // // 指挥中心   powerServiceCenter
  // {
  //   path: "/powerServiceCenter",
  //   name: "powerServiceCenter",
  //   component: () => import("../views/powerServiceCenter/index"),
  // },
  // // 绿色双碳   powerServiceCenter
  // {
  //   path: "/greendoublecarbon",
  //   name: "greendoublecarbon",
  //   component: () => import("../views/greendoublecarbon/index"),
  // },
  // // 配网概况   guyuansurvey
  // {
  //   path: "/guyuansurvey",
  //   name: "guyuansurvey",
  //   component: () => import("../views/guyuansurvey/index"),
  // },
  // // 配网检修   distributionNetworkMaintenance
  // {
  //   path: "/distributionNetworkMaintenance",
  //   name: "distributionNetworkMaintenance",
  //   component: () => import("../views/distributionNetworkMaintenance/index"),
  // },
  // // 抢修指挥   emergencyRepair
  // {
  //   path: "/emergencyRepair",
  //   name: "emergencyRepair",
  //   component: () => import("../views/emergencyRepair/index"),
  // },
  // // 业扩管控   industryExpansionControl
  // {
  //   path: "/industryExpansionControl",
  //   name: "industryExpansionControl",
  //   component: () => import("../views/industryExpansionControl/index"),
  // },
  // // 运营指标监测   operationIndexMonitoring
  // {
  //   path: "/operationIndexMonitoring",
  //   name: "operationIndexMonitoring",
  //   component: () => import("../views/operationIndexMonitoring/index"),
  // },
  // // 春节保供电   guaranteedPowerSupply
  // {
  //   path: "/guaranteedPowerSupply",
  //   name: "guaranteedPowerSupply",
  //   component: () => import("../views/guaranteedPowerSupply/index"),
  // },
  // // 智能化配网   intelligentDistributionNetwork
  // {
  //   path: "/intelligentDistributionNetwork",
  //   name: "intelligentDistributionNetwork",
  //   component: () => import("../views/intelligentDistributionNetwork/index"),
  // },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});
export default router;
