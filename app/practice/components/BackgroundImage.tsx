import Image from "next/image";

export default function BackgroundImage() {
  return (
    <>
      <div
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{ overflow: "hidden" }}
      >
        <Image
          src="/background.png"
          alt=""
          fill
          className="object-cover opacity-60"
          style={{ filter: "url(#paper-filter)" }}
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:from-transparent to-amber-100/50 dark:to-lime-900/70"></div>
    </>
  );
}