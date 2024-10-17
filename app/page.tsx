import Body from "./components/HomePage/Body";
import Header from "./components/HomePage/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50 text-foreground">
      <Header />
      <Body/>
    </div>
  )
}