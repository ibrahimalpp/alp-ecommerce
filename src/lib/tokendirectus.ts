import { createDirectus, rest, staticToken } from '@directus/sdk';

const tokendirectus =(token:string)=>
 createDirectus('https://directus-wgea.onrender.com')
.with(staticToken(token))
.with(rest());



export default tokendirectus;
