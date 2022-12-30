import { Nav } from 'components/Nav/Nav'
import { Footer } from 'components/Footer/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflowX: 'hidden', width: '100%' }}>
      <Nav />
      <div className="content">{children}</div>
    </div>
  )
}
