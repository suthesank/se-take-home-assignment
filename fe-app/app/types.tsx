export type Bot = {
  id: string;
  active: boolean;
  status: BotStatus;
  currentOrderCompleteTime: number | null;
  currentOrderId: string | null;
};

export type Order = {
  id: string;
  orderNumber: number;
  type: OrderType;
  status: OrderStatus;
  bot: Bot | null;
};

export enum OrderType {
  NORMAL = "normal",
  VIP = "vip",
}

export enum OrderStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETE = "complete",
}

export enum BotStatus {
  IDLE = "idle",
  BUSY = "busy",
}
