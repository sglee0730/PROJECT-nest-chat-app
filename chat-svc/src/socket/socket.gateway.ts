import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: any) {
    this.logger.log(`${client.id} disconnected...`)
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`${client.id} connected...`)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, msg: any): void {
    this.wss.emit('msgToClient', msg);
  }
}

// @WebSocketGateway()
// export class SocketGateway implements OnGatewayInit {
//   @WebSocketServer() wss: Server;

//   private logger = new Logger('SocketGateway');
  
//   afterInit(server: Server) {
//     this.logger.log('Initialized!');
//   }

//   @SubscribeMessage('msgToServer')
//   handleMessage(client: Socket, message: { socketRoom: string, message: string}) {
//     this.wss.to(message.socketRoom).emit('msgToClient', message);
//   }

//   @SubscribeMessage('joinRoom')
//   handleJoinRoom(client: Socket, room: string) {
//     client.join(room);
//     client.emit('joinedRoom', room);
//   }

//   @SubscribeMessage('leaveRoom')
//   handleLeaveRoom(client: Socket, room: string) {
//     client.leave(room);
//     client.emit('leftRoom', room);
//   }
// }