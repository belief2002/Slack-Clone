import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";


export const current = query({
    args:{},
    handler: async(ctx)=>{
        const userid = await getAuthUserId(ctx) 

        if(userid === null){
            return null;
        }
        return await ctx.db.get(userid);
    }
})