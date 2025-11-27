import { Order } from "../types";
import { useApp } from "../context/appContext";

const Card = ({ title, orders }: { title: string; orders: Order[] }) => (
  <div className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white space-y-2">
    <h2 className="text-lg font-bold">{title}</h2>
    {orders.length === 0 ? (
      <p className="text-gray-500 text-sm">No orders</p>
    ) : (
      <ul className="space-y-1">
        {orders.map((order) => (
          <li
            key={order.id}
            className="p-2 rounded border border-gray-300 bg-gray-50 flex justify-between gap-4"
          >
            <div className="flex flex-col gap-4 w-full">
              <strong>Order #{order.orderNumber}</strong>
              <div className="flex flex-col">
                <p>
                  Order Type: <strong>{order.type.toUpperCase()}</strong>
                </p>
                <p>
                  Order ID: <strong>{order.id}</strong>
                </p>
                {order.bot && (
                  <p>
                    Attending Bot ID: <strong>{order.bot.id}</strong>
                  </p>
                )}
              </div>
            </div>
            <span className="text-sm text-gray-600">{order.status}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default function Orders() {
  const { pendingOrders, inProgressOrders, completeOrders } = useApp();

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      <Card title="Pending Orders" orders={pendingOrders} />
      <Card title="In Progress Orders" orders={inProgressOrders} />
      <Card title="Completed Orders" orders={completeOrders} />
    </div>
  );
}
