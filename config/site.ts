export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Lyft - Workout Tracker",
  description: "Best way to track your workouts.",

  navMenuItems: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Workout", href: "/workout" },
  ],
};
