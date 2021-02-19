import { IoAdapter } from "@nestjs/platform-socket.io";
import * as redisIoAdapter from 'socket.io-redis';
import { adapterConfig } from "src/config/adapter.config";

export class RedisIoAdapter extends IoAdapter {
    createIOServer(port: number, options?: any): any {
        const server = super.createIOServer(port, options);
        const redisAdapter = redisIoAdapter({ 
          host: adapterConfig.host, 
          port: adapterConfig.port 
        });
    
        server.adapter(redisAdapter);
        return server;
      }
}