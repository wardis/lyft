import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-between p-24 gap-24">
      <h1>Lyft - Workout Tracker</h1>
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
    </main>
  );
}
