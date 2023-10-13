import "dotenv/config";
import { portal } from "@roboplay/robo.js";
import { Modules } from "../types/types.js";
import { generateEmbedMessage } from "./utils/modules-message-template.js";
export const config = {
    description: 'Gets a list of all modules and their states'
};
export default (async (event)=>{
    try {
        const modules = [];
        for (const [key, value] of Object.entries(Modules)){
            modules.push({
                moduleName: key,
                isEnabled: portal.module(value).isEnabled
            });
        }
        const message = generateEmbedMessage(modules);
        return {
            embeds: [
                message
            ],
            ephemeral: true
        };
    } catch (error) {
        console.log(error);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxjb21tYW5kc1xcY2hlY2ttb2R1bGVzdGF0ZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdkb3RlbnYvY29uZmlnJ1xyXG5pbXBvcnQgdHlwZSB7IENvbW1hbmRDb25maWcgfSBmcm9tICdAcm9ib3BsYXkvcm9iby5qcydcclxuaW1wb3J0IHsgcG9ydGFsIH0gZnJvbSAnQHJvYm9wbGF5L3JvYm8uanMnO1xyXG5pbXBvcnQgeyBNb2R1bGVzLCBQb3J0YWxNb2R1bGUgfSBmcm9tICcuLi90eXBlcy90eXBlcy5qcydcclxuaW1wb3J0IHtnZW5lcmF0ZUVtYmVkTWVzc2FnZX0gZnJvbSAnLi91dGlscy9tb2R1bGVzLW1lc3NhZ2UtdGVtcGxhdGUuanMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZzogQ29tbWFuZENvbmZpZyA9IHtcclxuICBkZXNjcmlwdGlvbjogJ0dldHMgYSBsaXN0IG9mIGFsbCBtb2R1bGVzIGFuZCB0aGVpciBzdGF0ZXMnXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChldmVudCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBtb2R1bGVzOiBQb3J0YWxNb2R1bGVbXSA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKE1vZHVsZXMpKSB7XHJcbiAgICAgIG1vZHVsZXMucHVzaCh7XHJcbiAgICAgICAgbW9kdWxlTmFtZToga2V5LFxyXG4gICAgICAgIGlzRW5hYmxlZDogcG9ydGFsLm1vZHVsZSh2YWx1ZSkuaXNFbmFibGVkXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBnZW5lcmF0ZUVtYmVkTWVzc2FnZShtb2R1bGVzKTtcclxuICAgIHJldHVybiB7ZW1iZWRzOiBbbWVzc2FnZV0sIGVwaGVtZXJhbDogdHJ1ZX1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbInBvcnRhbCIsIk1vZHVsZXMiLCJnZW5lcmF0ZUVtYmVkTWVzc2FnZSIsImNvbmZpZyIsImRlc2NyaXB0aW9uIiwiZXZlbnQiLCJtb2R1bGVzIiwia2V5IiwidmFsdWUiLCJPYmplY3QiLCJlbnRyaWVzIiwicHVzaCIsIm1vZHVsZU5hbWUiLCJpc0VuYWJsZWQiLCJtb2R1bGUiLCJtZXNzYWdlIiwiZW1iZWRzIiwiZXBoZW1lcmFsIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGdCQUFlO0FBRXRCLFNBQVNBLE1BQU0sUUFBUSxvQkFBb0I7QUFDM0MsU0FBU0MsT0FBTyxRQUFzQixvQkFBbUI7QUFDekQsU0FBUUMsb0JBQW9CLFFBQU8sc0NBQXNDO0FBRXpFLE9BQU8sTUFBTUMsU0FBd0I7SUFDbkNDLGFBQWE7QUFDZixFQUFDO0FBRUQsZUFBZSxDQUFBLE9BQU9DO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxVQUEwQixFQUFFO1FBRWxDLEtBQUssTUFBTSxDQUFDQyxLQUFLQyxNQUFNLElBQUlDLE9BQU9DLE9BQU8sQ0FBQ1QsU0FBVTtZQUNsREssUUFBUUssSUFBSSxDQUFDO2dCQUNYQyxZQUFZTDtnQkFDWk0sV0FBV2IsT0FBT2MsTUFBTSxDQUFDTixPQUFPSyxTQUFTO1lBQzNDO1FBQ0Y7UUFFQSxNQUFNRSxVQUFVYixxQkFBcUJJO1FBQ3JDLE9BQU87WUFBQ1UsUUFBUTtnQkFBQ0Q7YUFBUTtZQUFFRSxXQUFXO1FBQUk7SUFDNUMsRUFBRSxPQUFPQyxPQUFPO1FBQ2RDLFFBQVFDLEdBQUcsQ0FBQ0Y7SUFDZDtBQUNGLENBQUEsRUFBQyJ9