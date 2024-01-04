import Image from "next/image";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-5/6">
      <Image src="/isotipo.png" alt="Logo" width={300} height={600} priority />
      <p className="mt-4 text-4xl">Papelera</p>
      <p className="mt-1 text-5xl text-sky-700 font-bold antialiased">
        Progreso
      </p>
      <p className="mt-6 text-xl">evolución continua</p>
      <p className="mt-1 text-xl">www.papprogreso.com</p>
    </div>
  );
};

export default Home;
