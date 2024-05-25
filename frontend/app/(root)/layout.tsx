import { Nav } from "./nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full pt-16">
      <Nav />
      {children}
    </div>
  );
}
