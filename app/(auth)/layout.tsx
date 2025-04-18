export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full ">
      <div className="w-full flex text-center justify-center">
        {children}
      </div>
    </section>
  );
}
