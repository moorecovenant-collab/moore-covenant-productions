import { supabaseAdmin } from "./supabase";

export type PaymentSettings = {
  paypalHandle: string; // paypal.me/<handle>
  zelleEmail: string;
  squareLink: string; // a Square payment link or online checkout URL, blank until set up
  cashAppTag: string; // $cashtag without the $, blank until set up
};

export const DEFAULT_PAYMENTS: PaymentSettings = {
  paypalHandle: "isthatelii",
  zelleEmail: "elijahandisaacsworld@gmail.com",
  squareLink: "",
  cashAppTag: "",
};

export async function getPaymentSettings(): Promise<PaymentSettings> {
  const { data } = await supabaseAdmin().from("settings").select("value").eq("key", "payments").maybeSingle();
  return { ...DEFAULT_PAYMENTS, ...((data?.value ?? {}) as Partial<PaymentSettings>) };
}

export async function savePaymentSettings(s: PaymentSettings) {
  const { error } = await supabaseAdmin().from("settings").upsert({ key: "payments", value: s });
  if (error) throw new Error(error.message);
}
