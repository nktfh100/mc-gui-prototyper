export const Header = () => {
  return (
    <header className="h-2-block w-full bg-block-dirt relative">
      <div className="h-1-block w-full bg-block-grass-side bg-repeat-x absolute z-0"></div>
      <div className="flex flex-col items-center justify-center h-full w-full p-5 pt-0 pb-0 bg-cover bg-gradient-to-t from-[rgba(0,0,0,0.75)] to-[rgba(0,0,0,0.25)] relative z-10">
        <h1 className="text-white text-3xl font-bolder">
          Minecraft GUI Prototyper (1.0.0, MC 1.21.6)
        </h1>
        <h2 className="text-white">
          Made by{" "}
          <a
            href="https://github.com/nktfh100"
            target="_blank"
            className="text-link"
          >
            nktfh100
          </a>
        </h2>
      </div>
    </header>
  );
};
