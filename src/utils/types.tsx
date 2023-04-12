export type message = {
  msg: string;
  type: MessageType.Sender | MessageType.Receiver;
};

export const enum MessageType {
  Sender = "sender",
  Receiver = "receiver",
}
