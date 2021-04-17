import {
  ConnectedSocket,
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Order } from '../domain/order';
import { IOrderPublicDTO } from '../interfaces/order.dto';

@WebSocketGateway({ namespace: '/admin' })
export class AdminSocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  handleConnection(client: Socket) {
    const token = client.handshake.query?.token;
    // TODO:  implement admin authentication
    // const payloadOrNull = this.authService.decodeToken(token);
    // if (payloadOrNull === null) {
    //   client.disconnect();
    // } else {
    //   client.join(payloadOrNull.id);
    //   client['sessionId'] = payloadOrNull.id;
    //   client.emit('connection', 'Yeah my brother xD');
    // }
    console.log('Connected as admin');
    client.emit('connection', 'Conectado como admin');
  }

  newOrderCreated(order: IOrderPublicDTO, @ConnectedSocket() client: Socket) {
    client.to(order.id).emit('order-created', { order });
  }

  orderStatusUpdated(@ConnectedSocket() client: Socket, order: Order) {
    this.server.emit('order-status-updated', { status: order.status });
  }

  @SubscribeMessage('send-message')
  orderMessage(data: any, @ConnectedSocket() client: Socket) {
    // TODO: Implement order message
    client.emit('message', { message: 'Alta tula tiene el admin' });
  }
}
