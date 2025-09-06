import SectionTitle from "./SectionTitle";
import Card from "./Card";
import { useAuth } from "../../hooks/useAuth";
import { CREDIT_PACKS, PLAN_DEFINITIONS } from "../../data";

const PricingSection = ({
  setSelectedAmount,
  setIsUpgradeModalOpen,
  handleConfirmUpgrade,
}) => {
  const { user } = useAuth();
  const isPremium = user?.plan === "UNLIMITED";
  const plans = PLAN_DEFINITIONS.map((plan) => {
    if (plan.id === "free") {
      return {
        ...plan,
        cta: isPremium ? "Already got Premium" : "Current Plan",
        disabled: true,
      };
    }
    if (plan.id === "premium") {
      return {
        ...plan,
        cta: isPremium ? "You are Premium" : "Upgrade",
        disabled: isPremium,
      };
    }
  });
  return (
    <div className="space-y-10">
      {/* Subscription Plans */}
      <div>
        <SectionTitle
          title="Pricing"
          subtitle="Choose a plan that fits your flow"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {plans.map((p) => (
            <Card key={p.id} className={`ring-1 ${p.ring}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-base md:text-lg font-semibold">
                    {p.name}
                  </div>
                  <div className="text-2xl md:text-3xl font-extrabold">
                    {p.price}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">{p.note}</div>
                </div>
                <div
                  className={`h-10 w-10 rounded-xl bg-gradient-to-br ${p.gradient} opacity-80`}
                />
              </div>
              <button
                disabled={p.disabled}
                onClick={() => {
                  if (p.id === "premium") {
                    setSelectedAmount(4999);
                    setIsUpgradeModalOpen(true);
                  }
                }}
                className={`mt-5 w-full rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  p.disabled
                    ? "bg-white/10 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                }`}
              >
                {p.cta}
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* One-time Credit Packs */}
      <div>
        <SectionTitle
          title="Buy Credits"
          subtitle="Top up your account instantly"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CREDIT_PACKS.map((pack) => (
            <Card key={pack.id} className={`ring-1 ${pack.ring}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-base md:text-lg font-semibold">
                    {pack.name}
                  </div>
                  <div className="text-2xl md:text-3xl font-extrabold">
                    {pack.price}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">{pack.note}</div>
                </div>
                <div
                  className={`h-10 w-10 rounded-xl bg-gradient-to-br ${pack.gradient} opacity-80`}
                />
              </div>
              <button
                onClick={() => {
                  // setIsUpgradeModalOpen(true);
                  let numeric = pack.price.replace("₹", "");
                  console.log(numeric);
                  handleConfirmUpgrade(Number(numeric));
                }}
                className="mt-5 w-full rounded-xl px-4 py-2 text-sm font-semibold transition bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
              >
                {pack.cta}
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
