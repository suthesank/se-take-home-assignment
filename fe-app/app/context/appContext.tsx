import React, { createContext, useContext, useRef, useState } from "react";
import { Bot, BotStatus, Order, OrderStatus, OrderType } from "../types";

type AppProviderProps = { children: React.ReactNode };

export interface AppContextType {
  pendingOrders: Order[];
  inProgressOrders: Order[];
  completeOrders: Order[];
  bots: Bot[];
  createBot: () => void;
  createOrder: (type?: OrderType) => void;
  removeBot: () => void;
}

export const AppContext = createContext<AppContextType>({
  pendingOrders: [],
  inProgressOrders: [],
  completeOrders: [],
  bots: [],
  createBot: () => {},
  createOrder: () => {},
  removeBot: () => {},
});

export const AppProvider = ({ children }: AppProviderProps) => {
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);
  const [completeOrders, setCompleteOrders] = useState<Order[]>([]);
  const [bots, setBots] = useState<Bot[]>([]);
  const [currentOrderNumber, setCurrentOrderNumber] = useState(1);

  const pendingOrdersRef = useRef(pendingOrders);
  const inProgressRef = useRef(inProgressOrders);
  const completeOrdersRef = useRef(completeOrders);

  React.useEffect(() => {
    inProgressRef.current = inProgressOrders;
  }, [inProgressOrders]);

  React.useEffect(() => {
    pendingOrdersRef.current = pendingOrders;
  }, [pendingOrders]);

  React.useEffect(() => {
    completeOrdersRef.current = completeOrders;
  }, [completeOrders]);

  const createBot = () => {
    console.log("creating");
    const newBot = {
      id: crypto.randomUUID(),
      active: true,
      status: BotStatus.IDLE,
      currentOrderCompleteTime: null,
      currentOrderId: null,
    };
    setBots((prev) => [...prev, newBot]);
  };

  const createOrder = (type: OrderType = OrderType.NORMAL) => {
    const newOrder = {
      id: crypto.randomUUID(),
      type,
      status: OrderStatus.PENDING,
      bot: null,
      orderNumber: currentOrderNumber,
    };
    setPendingOrders((prev) => {
      if (type === OrderType.VIP) {
        const idx = prev.findIndex((o) => o.type === OrderType.NORMAL);
        return idx === -1
          ? [...prev, newOrder]
          : [...prev.slice(0, idx), newOrder, ...prev.slice(idx)];
      }
      return [...prev, newOrder];
    });
    setCurrentOrderNumber((prev) => prev + 1);
  };

  const assignOrdersToBots = () => {
    const availableBots = bots.filter(
      (b) => b.active && b.status === BotStatus.IDLE
    );
    if (availableBots.length === 0 || pendingOrders.length === 0) return;

    const bot = availableBots[0];
    const order = pendingOrders[0];
    const updatedOrder = { ...order, bot, status: OrderStatus.IN_PROGRESS };

    setPendingOrders((prev) => prev.slice(1));
    setInProgressOrders((prev) => [...prev, updatedOrder]);

    const completeAt = Date.now() + 10000;
    setBots((prev) =>
      prev.map((b) =>
        b.id === bot.id
          ? {
              ...b,
              status: BotStatus.BUSY,
              currentOrderCompleteTime: completeAt,
              currentOrderId: order.id,
            }
          : b
      )
    );

    setTimeout(() => {
      if (
        inProgressRef.current.find(
          (o) =>
            o.id === order.id &&
            o.status === OrderStatus.IN_PROGRESS &&
            o.bot?.id === bot.id
        )
      ) {
        setInProgressOrders((prev) => prev.filter((o) => o.id !== order.id));
        setCompleteOrders((prev) => [
          ...prev,
          { ...updatedOrder, status: OrderStatus.COMPLETE },
        ]);
        setBots((prev) =>
          prev.map((b) =>
            b.currentOrderId === order.id
              ? {
                  ...b,
                  status: BotStatus.IDLE,
                  currentOrderCompleteTime: null,
                  currentOrderId: null,
                }
              : b
          )
        );
      }
    }, 10000);
  };

  React.useEffect(() => {
    console.log("bots", bots);
    console.log("pendingOrders", pendingOrders);
    assignOrdersToBots();
  }, [pendingOrders, bots]);

  const removeBot = () => {
    setBots((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];

      if (last.status === BotStatus.BUSY) {
        const activeOrder = inProgressRef.current.find(
          (o) => o.bot?.id === last.id
        );
        if (activeOrder) {
          setInProgressOrders((prev) =>
            prev.filter((o) => o.id !== activeOrder.id)
          );
          setPendingOrders((prev) => {
            if (activeOrder.type === OrderType.VIP) {
              const nIdx = prev
                .filter((o) => o.id !== activeOrder.id)
                .findIndex((o) => o.type === OrderType.NORMAL);
              return nIdx === -1
                ? [...prev.filter((o) => o.id !== activeOrder.id), activeOrder]
                : [
                    ...prev
                      .filter((o) => o.id !== activeOrder.id)
                      .slice(0, nIdx),
                    activeOrder,
                    ...prev.filter((o) => o.id !== activeOrder.id).slice(nIdx),
                  ];
            }
            return [
              ...prev.filter((o) => o.id !== activeOrder.id),
              activeOrder,
            ];
          });
        }
      }

      const updated = prev.slice(0, -1);
      return updated;
    });
  };

  const value = {
    pendingOrders,
    inProgressOrders,
    completeOrders,
    bots,
    createBot,
    createOrder,
    removeBot,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
