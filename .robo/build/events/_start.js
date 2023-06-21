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
    updateModulesStatus();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxldmVudHNcXF9zdGFydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwb3J0YWwgfSBmcm9tICdAcm9ib3BsYXkvcm9iby5qcyc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcblxyXG4vKipcclxuICogQHR5cGUge2ltcG9ydCgnQHJvYm9wbGF5L3JvYm8uanMnKS5Db25maWd9XHJcbiAqKi9cclxuY29uc3QgdXBkYXRlTW9kdWxlc1N0YXR1cyA9ICgpID0+IHtcclxuICBjb25zdCBqc29uU3RyaW5nID0gZnMucmVhZEZpbGVTeW5jKCcuL21vZHVsZXMuanNvbicsICd1dGY4Jyk7XHJcbiAgY29uc3QganNvbiA9IEpTT04ucGFyc2UoanNvblN0cmluZyk7XHJcbiAgY29uc3QgbW9kdWxlcyA9IGpzb24ubW9kdWxlcztcclxuICB0cnkge1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgcG9ydGFsLm1vZHVsZShtb2R1bGVzW2ldLm5hbWUpLnNldEVuYWJsZWQobW9kdWxlc1tpXS5pc0VuYWJsZWQpXHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHRocm93KGVycm9yKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKCkgPT4ge1xyXG4gIHVwZGF0ZU1vZHVsZXNTdGF0dXMoKVxyXG59XHJcbiJdLCJuYW1lcyI6WyJwb3J0YWwiLCJmcyIsInVwZGF0ZU1vZHVsZXNTdGF0dXMiLCJqc29uU3RyaW5nIiwicmVhZEZpbGVTeW5jIiwianNvbiIsIkpTT04iLCJwYXJzZSIsIm1vZHVsZXMiLCJpIiwibGVuZ3RoIiwibW9kdWxlIiwibmFtZSIsInNldEVuYWJsZWQiLCJpc0VuYWJsZWQiLCJlcnJvciJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsTUFBTSxRQUFRLG9CQUFvQjtBQUMzQyxPQUFPQyxRQUFRLEtBQUs7QUFFcEI7O0VBRUUsR0FDRixNQUFNQyxzQkFBc0I7SUFDMUIsTUFBTUMsYUFBYUYsR0FBR0csWUFBWSxDQUFDLGtCQUFrQjtJQUNyRCxNQUFNQyxPQUFPQyxLQUFLQyxLQUFLLENBQUNKO0lBQ3hCLE1BQU1LLFVBQVVILEtBQUtHLE9BQU87SUFDNUIsSUFBSTtRQUNGLElBQUksSUFBSUMsSUFBSSxHQUFHQSxJQUFJRCxRQUFRRSxNQUFNLEVBQUVELElBQUs7WUFDdENULE9BQU9XLE1BQU0sQ0FBQ0gsT0FBTyxDQUFDQyxFQUFFLENBQUNHLElBQUksRUFBRUMsVUFBVSxDQUFDTCxPQUFPLENBQUNDLEVBQUUsQ0FBQ0ssU0FBUztRQUNoRTtJQUNGLEVBQUUsT0FBT0MsT0FBTztRQUNkLE1BQU1BO0lBQ1I7QUFDRjtBQUVBLGVBQWUsQ0FBQTtJQUNiYjtBQUNGLENBQUEsRUFBQyJ9