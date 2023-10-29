import Image from "next/image";

export default function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main>
      <Image
        src="/initial.png"
        alt="A background pattern"
        width={298}
        height={224}
        className="mx-auto mt-44"
      />
      <h1 className="mt-4 block text-center text-2xl font-bold">NOSH NODES</h1>
      <p className="block text-center text-sm">connect new dots</p>
      <em className="absolute bottom-12 left-0 right-0 block text-center text-sm font-semibold not-italic">
        powered by Endress+Hauser
      </em>
    </main>
  );
}
