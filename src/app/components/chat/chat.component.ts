import { Component } from '@angular/core';

import { client } from './../../dialog-flow-client/dialog-flow.client';
import { IMessage } from './../../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css','./chat.component.scss']
})
export class ChatComponent {

  conversation: IMessage[] = [];

  addMessageFromUser(message) {
    this.conversation.push({
      avatar: 'perm_identity',
      from: 'User says',
      content: message.value
    });

    client.textRequest(message.value).then((response) => {
      this.conversation.push({
        avatar: 'android',
        from: 'Agent',
        content: response.result.fulfillment['speech'] || 'I can\'t seem to figure that out!'
      });
      message.value = '';
    });
  }

}
