import React from "react";

export default function MainArea() {
  return (
    <main className="flex-1 p-8 bg-gray-100 h-screen overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Dashboard Overview
      </h2>

      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-gray-600">
          Charts and Tables will appear here
        </p>
      </div>
    </main>
  );
}
