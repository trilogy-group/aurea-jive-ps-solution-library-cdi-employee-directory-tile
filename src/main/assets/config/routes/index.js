import Config from '../layouts/Config/Config.js';

/* DEFAULT ROUTE FORMAT
{
  path: '/__PATH__',
  component: __COMPONENT_IMPORTED_ABOVE__
}
*/

// Hook up routes to components (Multuple routes are supported)
const routes = [
  {
    path: '/',
    component: Config
  }
];

export default routes;