"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { BellIcon, CalendarIcon, CardIcon, ChatIcon, HomeIcon, UsersIcon } from "./Icons";

const CLIENT_TABS = [
  { href: "/app", label: "Home", icon: HomeIcon },
  { href: "/app/book", label: "Book", icon: CalendarIcon },
  { href: "/app/pay", label: "Pay", icon: CardIcon },
  { href: "/app/alerts", label: "Alerts", icon: BellIcon },
  { href: "/app/assistant", label: "Assistant", icon: ChatIcon },
];

const ADMIN_TABS = [
  { href: "/app", label: "Today", icon: HomeIcon },
  { href: "/app/clients", label: "Clients", icon: UsersIcon },
  { href: "/app/book", label: "Schedule", icon: CalendarIcon },
  { href: "/app/pay", label: "Payments", icon: CardIcon },
  { href: "/app/alerts", label: "Alerts", icon: BellIcon },
];

export default function TabBar({ role, unread = 0 }: { role: "admin" | "client"; unread?: number }) {
  const pathname = usePathname();
  const tabs = role === "admin" ? ADMIN_TABS : CLIENT_TABS;
  return (
    <nav
      aria-label="Portal"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-black/90 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-xl">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = href === "/app" ? pathname === "/app" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "flex flex-col items-center gap-1 py-2.5 text-[10px] tracking-wide transition-colors",
                  active ? "text-gold" : "text-text-secondary hover:text-cream"
                )}
              >
                <span className="relative">
                  <Icon />
                  {label === "Alerts" && unread > 0 && (
                    <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-black">
                      {unread > 9 ? "9+" : unread}
                    </span>
                  )}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
