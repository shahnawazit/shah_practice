import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/common.css'
export default function Navigation() {
  return (
    <>
    {/* <Link to={`/`} style={{marginRight: '10px'}}>Login</Link>  */}
    {/* <Link to={`/contactus`} style={{marginRight: '10px'}}>Contact Us</Link>
    <Link to={`/aboutus`} style={{marginRight: '10px'}}>About Us</Link> */}
      <aside id="sidebar" className="sidebar">
      <div className="brand">
        <div className="logo">AP</div>
        <div>
          <h1>Admin Panel</h1>
          <div className="muted" style="font-size:12px">Dashboard</div>
        </div>
      </div>

      <nav className="nav">
        <Link to="#/dashboard" data-section="overview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z"/></svg><span className="label">Overview</span></Link>
        <Link to="#" data-section="users"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM6 11c1.657 0 3-1.567 3-3.5S7.657 4 6 4 3 5.567 3 7.5 4.343 11 6 11zM6 13c-3 1.5-3 4.5-3 6h12c0-1.5 0-4.5-3-6"/></svg><span className="label">Users</span></Link>
        <Link to="#" data-section="orders"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3h18v4H3zM5 11h14l-1 8H6l-1-8z"/></svg><span className="label">Orders</span></Link>
        <Link to="#" data-section="settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 8a4 4 0 100 8 4 4 0 000-8zM21 12.7v-1.4l2-1.2-2-3.4-2.6.6A7.9 7.9 0 0016 6.2l-.7-2.6H8.7L8 6.2A7.9 7.9 0 005.6 6.1L3 5.5 1 8.9l2 1.2v1.4L1 12.7l2 3.4 2.6-.6c.6.3 1.3.6 2 .8l.7 2.6h6.6l.7-2.6c.7-.2 1.4-.5 2-.8l2.6.6 2-3.4-2-1.2z"/></svg><span className="label">Settings</span></Link>
      </nav>

      <div className="footer">
        <div style="margin-bottom:8px">Logged in as <strong>Admin</strong></div>
        <div className="muted" style="font-size:12px">simple-admin-panel v1.0</div>
      </div>
    </aside>

    </>
  )
}

