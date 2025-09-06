import React from "react";
import SectionTitle from "./SectionTitle";
import Card from "./Card";

const PaymentsSection = () => {
  return (
    <div className="space-y-6">
      {/* Existing Pricing Section */}
      <SectionTitle
        title="Pricing"
        subtitle="Choose a plan that fits your flow"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <Card className="p-6 bg-gray-900 rounded-2xl border border-gray-700 shadow-lg">
          <h3 className="text-xl font-semibold text-white">Free</h3>
          <p className="text-3xl font-bold mt-2">₹0</p>
          <p className="text-sm text-gray-400 mt-2">
            10 credits, community queue
          </p>
          <button className="w-full mt-4 py-2 rounded-xl bg-gray-800 text-gray-400 cursor-not-allowed">
            Current Plan
          </button>
        </Card>

        {/* Premium Plan */}
        <Card className="p-6 bg-gray-900 rounded-2xl border border-purple-700 shadow-lg">
          <h3 className="text-xl font-semibold text-white">Premium</h3>
          <p className="text-3xl font-bold mt-2">₹499</p>
          <p className="text-sm text-gray-400 mt-2">100 credits, priority</p>
          <button className="w-full mt-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
            Upgrade
          </button>
        </Card>
      </div>

      {/* New Buy Credits Section */}
      <SectionTitle
        title="Buy Credits"
        subtitle="Top up your account instantly"
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* 25 Credits */}
        <Card className="p-6 bg-gray-900 rounded-2xl border border-gray-700 shadow-lg hover:border-purple-600 transition">
          <h3 className="text-lg font-semibold text-white">₹25</h3>
          <p className="text-sm text-gray-400 mt-2">10 credits</p>
          <button className="w-full mt-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
            Buy Now
          </button>
        </Card>

        {/* 50 Credits */}
        <Card className="p-6 bg-gray-900 rounded-2xl border border-gray-700 shadow-lg hover:border-purple-600 transition">
          <h3 className="text-lg font-semibold text-white">₹50</h3>
          <p className="text-sm text-gray-400 mt-2">25 credits</p>
          <button className="w-full mt-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
            Buy Now
          </button>
        </Card>

        {/* 2000 Credits */}
        <Card className="p-6 bg-gray-900 rounded-2xl border border-gray-700 shadow-lg hover:border-purple-600 transition">
          <h3 className="text-lg font-semibold text-white">₹2000</h3>
          <p className="text-sm text-gray-400 mt-2">1000 credits</p>
          <button className="w-full mt-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
            Buy Now
          </button>
        </Card>
      </div>
    </div>
  );
};

export default PaymentsSection;
