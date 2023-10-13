import { portal } from "@roboplay/robo.js";
import fs from "fs";
/**
 * @type {import('@roboplay/robo.js').Config}
 **/ const updateModulesStatus = ()=>{
    const jsonString = fs.readFileSync('./modules.json', 'utf8');
    const json = JSON.parse(jsonString);
    const modules = json.modules;
    try {
        for(let i = 0; i < modules.length; i++){
            portal.module(modules[i].name).setEnabled(modules[i].isEnabled);
        }
    } catch (error) {
        throw error;
    }
};
export default (async ()=>{
    try {
        updateModulesStatus();
    } catch (error) {
        console.log(error);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxldmVudHNcXF9zdGFydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwb3J0YWwgfSBmcm9tICdAcm9ib3BsYXkvcm9iby5qcyc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcblxyXG4vKipcclxuICogQHR5cGUge2ltcG9ydCgnQHJvYm9wbGF5L3JvYm8uanMnKS5Db25maWd9XHJcbiAqKi9cclxuY29uc3QgdXBkYXRlTW9kdWxlc1N0YXR1cyA9ICgpID0+IHtcclxuICBjb25zdCBqc29uU3RyaW5nID0gZnMucmVhZEZpbGVTeW5jKCcuL21vZHVsZXMuanNvbicsICd1dGY4Jyk7XHJcbiAgY29uc3QganNvbiA9IEpTT04ucGFyc2UoanNvblN0cmluZyk7XHJcbiAgY29uc3QgbW9kdWxlcyA9IGpzb24ubW9kdWxlcztcclxuICB0cnkge1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgcG9ydGFsLm1vZHVsZShtb2R1bGVzW2ldLm5hbWUpLnNldEVuYWJsZWQobW9kdWxlc1tpXS5pc0VuYWJsZWQpXHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHRocm93KGVycm9yKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICB1cGRhdGVNb2R1bGVzU3RhdHVzKCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsicG9ydGFsIiwiZnMiLCJ1cGRhdGVNb2R1bGVzU3RhdHVzIiwianNvblN0cmluZyIsInJlYWRGaWxlU3luYyIsImpzb24iLCJKU09OIiwicGFyc2UiLCJtb2R1bGVzIiwiaSIsImxlbmd0aCIsIm1vZHVsZSIsIm5hbWUiLCJzZXRFbmFibGVkIiwiaXNFbmFibGVkIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxNQUFNLFFBQVEsb0JBQW9CO0FBQzNDLE9BQU9DLFFBQVEsS0FBSztBQUVwQjs7RUFFRSxHQUNGLE1BQU1DLHNCQUFzQjtJQUMxQixNQUFNQyxhQUFhRixHQUFHRyxZQUFZLENBQUMsa0JBQWtCO0lBQ3JELE1BQU1DLE9BQU9DLEtBQUtDLEtBQUssQ0FBQ0o7SUFDeEIsTUFBTUssVUFBVUgsS0FBS0csT0FBTztJQUM1QixJQUFJO1FBQ0YsSUFBSSxJQUFJQyxJQUFJLEdBQUdBLElBQUlELFFBQVFFLE1BQU0sRUFBRUQsSUFBSztZQUN0Q1QsT0FBT1csTUFBTSxDQUFDSCxPQUFPLENBQUNDLEVBQUUsQ0FBQ0csSUFBSSxFQUFFQyxVQUFVLENBQUNMLE9BQU8sQ0FBQ0MsRUFBRSxDQUFDSyxTQUFTO1FBQ2hFO0lBQ0YsRUFBRSxPQUFPQyxPQUFPO1FBQ2QsTUFBTUE7SUFDUjtBQUNGO0FBRUEsZUFBZSxDQUFBO0lBQ2IsSUFBSTtRQUNGYjtJQUNGLEVBQUUsT0FBT2EsT0FBTztRQUNkQyxRQUFRQyxHQUFHLENBQUNGO0lBQ2Q7QUFDRixDQUFBLEVBQUMifQ==