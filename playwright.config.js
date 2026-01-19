// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
import { on } from 'node:events';


 
const config=({
  testDir:'./tests',
  retries:2,
   timeout: 40 *1000,
   expect: { 
    
    timeout: 5000, }, 

    reporter:'html',
    
  use: {
    
    browserName:'chromium',
    headless : true,
    screenshot: 'on',
    trace : 'retain-on-fail' //off , on ,retain-on-fail

  },
  
});
module.exports=config

