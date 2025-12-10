import Image from "next/image";



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className='w-full overflow-auto relative min-h-screen font-sans'>
        <Image src={'/assets/auth.png'} alt="auth-image" className="absolute inset-0 object-cover w-full min-h-[100vh]" width={800} height={300} />
         <div className="absolute inset-0 min-h-screen bg-[#7852A9]/20 mix-blend-multiply"></div>
        {children}
      </div>
  );
}
