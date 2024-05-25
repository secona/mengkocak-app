async function getData() {
  const res = await fetch(`${process.env.API_URL}`);
  return res.text();
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      {data}
    </main>
  );
}
