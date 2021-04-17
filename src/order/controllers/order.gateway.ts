import {
  ConnectedSocket,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/users/services/auht.service';
import { Order } from '../domain/order';
import { IOrderPublicDTO } from '../interfaces/order.dto';

@WebSocketGateway({ namespace: '/order' })
export class OrderSocketGateway implements OnGatewayConnection {
  constructor(private authService: AuthService) {}

  @WebSocketServer()
  private server: Server;

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.query?.token;
      const payloadOrNull = this.authService.decodeToken(token);
      if (payloadOrNull === null) return client.disconnect();

      // Connection debbugin
      console.log('Connected to order as: ', payloadOrNull.id);
      client.join(payloadOrNull.id);
      client['sessionId'] = payloadOrNull.id;
    } catch (err) {
      client.disconnect();
    }
  }

  newOrderCreated(order: IOrderPublicDTO) {
    this.server.to(order.owner).emit('order-created', { order });
  }

  orderStatusUpdated(order: Order) {
    this.server.to(order.owner).emit('order-status-update', { ...order });
  }

  // TODO: Will be chat message functionality
  // @SubscribeMessage('send-message')
  // orderMessage(@ConnectedSocket() client: Socket, @MessageBody() message) {
  //   const id = client['sessionId'];
  //   this.server.to(id).emit('message', { ...message, from: id });
  // }
}
