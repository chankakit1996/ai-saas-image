export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <div className="root-layout">
        <div className="root-container">
            <div className="wrapper">
                {children}
            </div>
        </div>
    </div>;
  }
  