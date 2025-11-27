import { useApp } from "../context/appContext";
import { OrderType } from "../types";

const Controls = () => {
  const { createBot, createOrder, removeBot } = useApp();
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-center">
      {/* Add Order */}
      <div className="space-x-2">
        <button
          onClick={() => createOrder(OrderType.NORMAL)}
          className="px-3 py-1 rounded bg-blue-500 text-white cursor-pointer"
        >
          New Normal Order
        </button>
        <button
          onClick={() => createOrder(OrderType.VIP)}
          className="px-3 py-1 rounded bg-purple-500 text-white cursor-pointer"
        >
          New VIP Order
        </button>
      </div>

      {/* Bot Controls */}
      <div className="space-x-2">
        <button
          onClick={() => {
            console.log("clicked");
            createBot();
          }}
          className="px-3 py-1 rounded bg-green-600 text-white cursor-pointer"
        >
          + Bot
        </button>

        <button
          onClick={() => removeBot()}
          className="px-3 py-1 rounded bg-red-600 text-white cursor-pointer"
        >
          - Bot
        </button>
      </div>
    </div>
  );
};

export default Controls;
