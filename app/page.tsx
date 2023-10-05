import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-4 py-8 md:py-10">
      <h1>Lyft - Workout Tracker</h1>
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
    </section>
  );
}
