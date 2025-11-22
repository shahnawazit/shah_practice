import React from 'react'
import '../../assets/css/common.css'

export default function Dashboard() {
  return (
    <main className="main">
      <div className="topbar">
        <div className="flex gap-8">
          <div className="search card" style="padding:6px 10px;display:flex;align-items:center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/></svg>
            <input placeholder="Search..." />
          </div>
        </div>
        <div className="actions">
          <div className="muted">EN</div>
          <button className="btn">+ New</button>
        </div>
      </div>

      <section className="grid">

        <div className="card col-12">
          <h3>Orders</h3>
          <table className="table" style={{marginBottom: "8px"}}>
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Status</th><th>Amount</th></tr>
            </thead>
            <tbody>
              <tr><td>#1001</td><td>Ravi Kumar</td><td>Delivered</td><td>₹1,250</td></tr>
              <tr><td>#1002</td><td>Neha Sharma</td><td>Processing</td><td>₹2,850</td></tr>
              <tr><td>#1003</td><td>Ajay</td><td>Cancelled</td><td>₹0</td></tr>
            </tbody>
          </table>
        </div>


        <div className="card col-12">
          <h3>Activity</h3>
          <div id="activity" style="margin-top:12px;display:flex;gap:12px;overflow:auto">
           <canvas id="miniChart" width="700" height="120" style="max-width:100%"></canvas>
          </div>
        </div>
      </section>

    </main>

  )
}
