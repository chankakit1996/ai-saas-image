export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-center min-h-screen w-full bg-purple-100">
      {children}
    </div>
  );
}
