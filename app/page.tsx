import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[83vh] flex-col items-center justify-center p-4 lg:px-24">
      <div className="relative flex flex-col w-full max-w-4xl gap-8 place-items-center">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 z-10 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black">
          <span className="text-transparent bg-clip-text bg-gradient-to-br gradient-radial from-blue-500 to-blue-900">
            Git_resume
          </span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-4xl font-semibold">
          Elevate your&nbsp;
        
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700">
          Github
        </span>
        &nbsp;to a dynamic&nbsp;
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700">resume</span>
        &nbsp;effortlessly
        </p>
      </div>
      <div className="flex w-full md:max-w-sm items-center space-x-4 md:space-x-8">
        <form className="flex w-full space-x-3">
          //TODO: input field and button
        </form>
      </div>
    </main>
  );
}
