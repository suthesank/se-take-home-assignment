"use client";
import { useApp } from "../context/appContext";
import Bots from "./bots";
import Controls from "./controls";
import Orders from "./orders";

const Dashboard = () => {
  const { pendingOrders, inProgressOrders, completeOrders, bots } = useApp();
  return (
    <div className="flex items-center justify-center font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between py-16 px-4 dark:bg-black sm:items-start gap-10">
        <h1 className="text-2xl font-bold">Order Controller</h1>
        <Controls />
        <hr className="border-gray-300 border-b-0 w-full" />
        {/* Status Preview */}
        <div className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white space-y-2 w-full">
          <h2 className="text-lg font-bold">Current Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <p>
              Pending Orders: <strong>{pendingOrders.length}</strong>
            </p>
            <p>
              In Progress Orders: <strong>{inProgressOrders.length}</strong>
            </p>
            <p>
              Completed Orders: <strong>{completeOrders.length}</strong>
            </p>
            <p>
              Total Bots: <strong>{bots.length}</strong>
            </p>
          </div>
        </div>
        <hr className="border-gray-300 border-b-0 w-full" />
        <Orders />
        <hr className="border-gray-300 border-b-0 w-full" />
        <Bots />
      </main>
    </div>
  );
};

export default Dashboard;
