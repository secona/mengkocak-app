export default function AuthLayout(props: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-[90vh] grid place-items-center">
      <main className="bg-white rounded-lg py-10 px-20">
        {props.children}
      </main>
    </div>
  )
}
