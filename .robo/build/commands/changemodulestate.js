import "dotenv/config";
import { portal } from "@roboplay/robo.js";
import { Modules } from "../types/types.js";
const moduleChoices = [];
for (const [key, value] of Object.entries(Modules)){
    moduleChoices.push({
        name: key,
        value: value
    });
}
export const config = {
    description: 'Sets enabled or disabled state of a module',
    options: [
        {
            name: 'module',
            required: true,
            description: 'Choose a module',
            choices: moduleChoices
        },
        {
            name: 'state',
            required: true,
            description: 'Set a state of a module',
            choices: [
                {
                    name: 'Enabled',
                    value: '1'
                },
                {
                    name: 'Disabled',
                    value: '0'
                }
            ]
        }
    ]
};
export default (async (event)=>{
    try {
        const module = event.options.get('module').value;
        const state = Boolean(Number(event.options.get('state').value));
        portal.module(module).setEnabled(state);
        if (state) {
            return `${module} is enabled.`;
        } else {
            return `${module} is disabled.`;
        }
    } catch (error) {
        console.log(error);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxjb21tYW5kc1xcY2hhbmdlbW9kdWxlc3RhdGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdkb3RlbnYvY29uZmlnJ1xyXG5pbXBvcnQgdHlwZSB7IENvbW1hbmRDb25maWcgfSBmcm9tICdAcm9ib3BsYXkvcm9iby5qcydcclxuaW1wb3J0IHsgcG9ydGFsIH0gZnJvbSAnQHJvYm9wbGF5L3JvYm8uanMnO1xyXG5pbXBvcnQgeyBNb2R1bGVzIH0gZnJvbSAnLi4vdHlwZXMvdHlwZXMuanMnXHJcblxyXG5jb25zdCBtb2R1bGVDaG9pY2VzID0gW107XHJcbmZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKE1vZHVsZXMpKSB7XHJcbiAgbW9kdWxlQ2hvaWNlcy5wdXNoKHtcclxuICAgIG5hbWU6IGtleSxcclxuICAgIHZhbHVlOiB2YWx1ZVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnOiBDb21tYW5kQ29uZmlnID0ge1xyXG4gIGRlc2NyaXB0aW9uOiAnU2V0cyBlbmFibGVkIG9yIGRpc2FibGVkIHN0YXRlIG9mIGEgbW9kdWxlJyxcclxuICBvcHRpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdtb2R1bGUnLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgZGVzY3JpcHRpb246ICdDaG9vc2UgYSBtb2R1bGUnLFxyXG4gICAgICBjaG9pY2VzOiBtb2R1bGVDaG9pY2VzXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnc3RhdGUnLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgZGVzY3JpcHRpb246ICdTZXQgYSBzdGF0ZSBvZiBhIG1vZHVsZScsXHJcbiAgICAgIGNob2ljZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAnRW5hYmxlZCcsXHJcbiAgICAgICAgICB2YWx1ZTogJzEnLFxyXG4gICAgICAgIH0sIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdEaXNhYmxlZCcsXHJcbiAgICAgICAgICB2YWx1ZTogJzAnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXSxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IG1vZHVsZSA9IGV2ZW50Lm9wdGlvbnMuZ2V0KCdtb2R1bGUnKS52YWx1ZTtcclxuICAgIGNvbnN0IHN0YXRlID0gQm9vbGVhbihOdW1iZXIoZXZlbnQub3B0aW9ucy5nZXQoJ3N0YXRlJykudmFsdWUpKTtcclxuICAgIHBvcnRhbC5tb2R1bGUobW9kdWxlKS5zZXRFbmFibGVkKHN0YXRlKTtcclxuICAgIGlmIChzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gYCR7bW9kdWxlfSBpcyBlbmFibGVkLmBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBgJHttb2R1bGV9IGlzIGRpc2FibGVkLmAgXHJcbiAgICB9IFxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICB9XHJcbn0iXSwibmFtZXMiOlsicG9ydGFsIiwiTW9kdWxlcyIsIm1vZHVsZUNob2ljZXMiLCJrZXkiLCJ2YWx1ZSIsIk9iamVjdCIsImVudHJpZXMiLCJwdXNoIiwibmFtZSIsImNvbmZpZyIsImRlc2NyaXB0aW9uIiwib3B0aW9ucyIsInJlcXVpcmVkIiwiY2hvaWNlcyIsImV2ZW50IiwibW9kdWxlIiwiZ2V0Iiwic3RhdGUiLCJCb29sZWFuIiwiTnVtYmVyIiwic2V0RW5hYmxlZCIsImVycm9yIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZTtBQUV0QixTQUFTQSxNQUFNLFFBQVEsb0JBQW9CO0FBQzNDLFNBQVNDLE9BQU8sUUFBUSxvQkFBbUI7QUFFM0MsTUFBTUMsZ0JBQWdCLEVBQUU7QUFDeEIsS0FBSyxNQUFNLENBQUNDLEtBQUtDLE1BQU0sSUFBSUMsT0FBT0MsT0FBTyxDQUFDTCxTQUFVO0lBQ2xEQyxjQUFjSyxJQUFJLENBQUM7UUFDakJDLE1BQU1MO1FBQ05DLE9BQU9BO0lBQ1Q7QUFDRjtBQUVBLE9BQU8sTUFBTUssU0FBd0I7SUFDbkNDLGFBQWE7SUFDYkMsU0FBUztRQUNQO1lBQ0VILE1BQU07WUFDTkksVUFBVTtZQUNWRixhQUFhO1lBQ2JHLFNBQVNYO1FBQ1g7UUFDQTtZQUNFTSxNQUFNO1lBQ05JLFVBQVU7WUFDVkYsYUFBYTtZQUNiRyxTQUFTO2dCQUNQO29CQUNFTCxNQUFNO29CQUNOSixPQUFPO2dCQUNUO2dCQUNBO29CQUNFSSxNQUFNO29CQUNOSixPQUFPO2dCQUNUO2FBQ0Q7UUFDSDtLQUNEO0FBQ0gsRUFBQztBQUVELGVBQWUsQ0FBQSxPQUFPVTtJQUNwQixJQUFJO1FBQ0YsTUFBTUMsU0FBU0QsTUFBTUgsT0FBTyxDQUFDSyxHQUFHLENBQUMsVUFBVVosS0FBSztRQUNoRCxNQUFNYSxRQUFRQyxRQUFRQyxPQUFPTCxNQUFNSCxPQUFPLENBQUNLLEdBQUcsQ0FBQyxTQUFTWixLQUFLO1FBQzdESixPQUFPZSxNQUFNLENBQUNBLFFBQVFLLFVBQVUsQ0FBQ0g7UUFDakMsSUFBSUEsT0FBTztZQUNULE9BQU8sQ0FBQyxFQUFFRixPQUFPLFlBQVksQ0FBQztRQUNoQyxPQUFPO1lBQ0wsT0FBTyxDQUFDLEVBQUVBLE9BQU8sYUFBYSxDQUFDO1FBQ2pDO0lBQ0YsRUFBRSxPQUFPTSxPQUFPO1FBQ2RDLFFBQVFDLEdBQUcsQ0FBQ0Y7SUFDZDtBQUNGLENBQUEsRUFBQyJ9