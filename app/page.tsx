import Feed from "./components/Feed";
import Header from "./components/Header";

export default function Home() {
  return (
    <section className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      <Header />
      <Feed />
    </section>

  )
}
