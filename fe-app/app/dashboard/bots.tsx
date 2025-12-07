import { Bot } from "../types";
import { useApp } from "../context/appContext";

const Card = ({ bot }: { bot: Bot }) => (
  <div className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white space-y-2">
    <div className="flex flex-col gap-4 w-full">
      <strong>Bot ID: {bot.id}</strong>
      <div className="flex flex-col">
        <p>
          Bot Status: <strong>{bot.status.toUpperCase()}</strong>
        </p>
        {bot.currentOrderId && (
          <p>
            Current Order ID: <strong>{bot.currentOrderId}</strong>
          </p>
        )}
      </div>
    </div>
  </div>
);

export default function Bots() {
  const { bots } = useApp();

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-lg font-bold">Bots</h2>
      {bots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {bots.map((bot) => {
            return <Card bot={bot} key={bot.id} />;
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No bots</p>
      )}
    </div>
  );
}
