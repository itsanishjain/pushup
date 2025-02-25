import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <h1
        className="text-6xl font-bold mb-8 text-center"
        style={{ fontFamily: "Comic Sans MS, cursive" }}
      >
        What did you do last week?
      </h1>
      <p
        className="text-2xl mb-12 text-center max-w-2xl"
        style={{ fontFamily: "Comic Sans MS, cursive" }}
      >
        The <span className="text-red-500 animate-pulse">hardcore</span> way to
        track employee productivity
      </p>
      <div className="flex gap-8">
        <Link
          href="/manager"
          className="bg-yellow-400 text-black px-8 py-4 rounded-lg text-xl font-bold hover:bg-yellow-300 transition-all hover:scale-105"
          style={{ fontFamily: "Comic Sans MS, cursive" }}
        >
          I&apos;m a Manager
        </Link>
      </div>
    </main>
  );
}
