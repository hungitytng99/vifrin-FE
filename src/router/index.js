import store from "redux/store";
import { compareByIndex } from "utils/compare";

export function getRoutesFromContainer(context) {
  let routes = [];
  context.keys().forEach((path) => {
    routes.push(context(`${path}`).default);
    if (context(`${path}`).childRoutes) {
      context(`${path}`).childRoutes.forEach((childRoute) => {
        routes.push({ ...childRoute, isChildRoute: true });
      });
    }
  });
  return routes;
}
const authContext = require.context("../screens/auth", true, /route.js$/);
const appContext = require.context("../screens/app", true, /route.js$/);

export const authRoutes = getRoutesFromContainer(authContext);
export const appRoutes =
  getRoutesFromContainer(appContext).sort(compareByIndex);

console.debug("appRoutes: ", appRoutes);
console.debug("authRoutes: ", authRoutes);

export const initModules = async (modules = [], container = "app") => {
  await Promise.all([
    modules.map(async (item) => {
      const [reducer, saga] = await Promise.all([
        import(`../screens/${container}/${item.path}/redux/reducer`),
        import(`../screens/${container}/${item.path}/redux/saga`),
      ]);
      store.injectReducer(item.key, reducer.default);
      store.injectSaga(item.key, saga.default);
    }),
  ]);
};
