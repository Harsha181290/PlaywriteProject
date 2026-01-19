// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
import { on } from 'node:events';
const config=({
  testDir:'./tests',
  retries :1,
  workers:1,
   timeout: 40 *1000,
   expect: { 
    
    timeout: 5000, }, 

    reporter:'html',
    
  projects: 
  [
  {
  name :'Safari',
  use: {
    
    browserName:'webkit',
    headless : true,
    screenshot: 'off',
    trace : 'on', //off , on ,retain-on-fail
    //...devices['iphone 11'],
    }
},
{
  name :'Chrome',
  use: {
    
    browserName:'chromium',
    headless : false,
    screenshot: 'on',
    trace : 'on' ,//off , on ,retain-on-fail
    ignoreHtttpsErrors: true,
    video :'retain-on-failure',
    Permissions:['geolocation'],
    //...devices['Galaxy Note 3']
    //viewport: {width:720,height:720}
  }
},


]  
});
module.exports=config

