import Image from "next/image";



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className='w-full overflow-hidden relative h-screen font-sans'>
        <Image src={'/assets/auth.png'} alt="auth-image" className="absolute inset-0 object-cover w-full h-[100vh]" width={800} height={300} />
         <div className="absolute inset-0 bg-[#7852A9]/30 mix-blend-multiply"></div>
        {children}
      </div>
  );
}
