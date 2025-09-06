import React from "react";

const Card = () => {
  return (
    <div class="max-w-80 overflow-hidden rounded-lg shadow">
      <div class="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
        <h3 class="text-xl font-bold">Basic</h3>
        <div class="mt-4 flex items-baseline">
          <span class="text-4xl font-bold">$29</span>
          <span class="ml-1">/month</span>
        </div>
      </div>
      <div class="bg-white p-6">
        <p class="mb-6 text-gray-600">
          Everything you need for advanced projects and teams.
        </p>
        <ul class="mb-6 space-y-1 text-sm text-gray-500">
          <li class="flex items-start">
            <svg
              class="mt-0.5 mr-2 h-5 w-5 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Unlimited everything</span>
          </li>
          <li class="flex items-start">
            <svg
              class="mt-0.5 mr-2 h-5 w-5 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>24/7 support</span>
          </li>
          <li class="flex items-start">
            <svg
              class="mt-0.5 mr-2 h-5 w-5 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Advanced analytics</span>
          </li>
          <li class="flex items-start">
            <svg
              class="mt-0.5 mr-2 h-5 w-5 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Custom integrations</span>
          </li>
          <li class="flex items-start">
            <svg
              class="mt-0.5 mr-2 h-5 w-5 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Service level agreement</span>
          </li>
          <li class="flex items-start">
            <svg
              class="mt-0.5 mr-2 h-5 w-5 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Dedicated account manager</span>
          </li>
        </ul>
        <button class="w-full rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-sm text-white transition-opacity hover:opacity-90">
          Get Premium
        </button>
      </div>
    </div>
  );
};

export default Card;
