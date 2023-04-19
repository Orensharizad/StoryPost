import Feed from "./components/Feed";
import MiniProfile from "./components/MiniProfile";
import SideBar from "./components/SideBar";
import Suggestions from "./components/Suggestions";

export default function Home() {
  return (
    <section className=' h-screen grid grid-cols-6'>
      <section className="col-span-1 md:border md:border-r-slate-200  ">
        <SideBar />
      </section>

      <section className="col-span-6 md:col-span-3">
        <Feed />
      </section>

      <section className='hidden md:inline-grid md:col-span-2'>
        <div className='fixed top-0'>
          <MiniProfile />
          <Suggestions />
        </div>
      </section>

    </section>

  )
}
