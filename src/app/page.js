import Image from 'next/image'
import List from './Component/List/Index'
import Jumbotron from './Component/Jumbotron/Index'

export default function Home() {
  return (
    <main>
      <Jumbotron />
      <List />
    </main>
  )
}
