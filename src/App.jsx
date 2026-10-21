
import { useMemo, useState } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, CalendarDays, ChevronDown,
  ChevronLeft, ChevronRight, CircleHelp, Command, CreditCard, Download,
  LayoutDashboard, LogOut, Menu, MoreHorizontal, Package, Search, Settings,
  ShoppingBag, Sparkles, Users, X, Zap,
} from "lucide-react";
import "./index.css";

const weeklyData = [
  { name: "Mon", revenue: 4200, orders: 240 },
  { name: "Tue", revenue: 5800, orders: 380 },
  { name: "Wed", revenue: 4900, orders: 310 },
  { name: "Thu", revenue: 7200, orders: 460 },
  { name: "Fri", revenue: 6100, orders: 410 },
  { name: "Sat", revenue: 8900, orders: 590 },
  { name: "Sun", revenue: 7600, orders: 520 },
];

const monthlyData = [
  { name: "Jan", revenue: 28000, orders: 1600 },
  { name: "Feb", revenue: 34000, orders: 1900 },
  { name: "Mar", revenue: 31000, orders: 1750 },
  { name: "Apr", revenue: 42000, orders: 2400 },
  { name: "May", revenue: 39000, orders: 2250 },
  { name: "Jun", revenue: 51000, orders: 2900 },
  { name: "Jul", revenue: 47000, orders: 2700 },
  { name: "Aug", revenue: 62000, orders: 3400 },
  { name: "Sep", revenue: 57000, orders: 3200 },
  { name: "Oct", revenue: 73000, orders: 4100 },
  { name: "Nov", revenue: 68000, orders: 3900 },
  { name: "Dec", revenue: 85000, orders: 4800 },
];

const yearlyData = [
  { name: "2021", revenue: 320000, orders: 18000 },
  { name: "2022", revenue: 460000, orders: 25000 },
  { name: "2023", revenue: 590000, orders: 34000 },
  { name: "2024", revenue: 780000, orders: 43000 },
  { name: "2025", revenue: 960000, orders: 57000 },
  { name: "2026", revenue: 1120000, orders: 69000 },
];

const initialOrders = [
  { id: "#ORD-7829", customer: "Olivia Martin", email: "olivia.m@example.com", product: "Wireless Headphones", date: "Oct 21, 2026", amount: 129.00, status: "Completed", initials: "OM", color: "lavender" },
  { id: "#ORD-7828", customer: "Jackson Lee", email: "jackson.lee@example.com", product: "Smart Watch Pro", date: "Oct 21, 2026", amount: 249.00, status: "Processing", initials: "JL", color: "peach" },
  { id: "#ORD-7827", customer: "Isabella Chen", email: "isabella.c@example.com", product: "Minimal Backpack", date: "Oct 20, 2026", amount: 89.00, status: "Completed", initials: "IC", color: "mint" },
  { id: "#ORD-7826", customer: "William Kim", email: "william.k@example.com", product: "Mechanical Keyboard", date: "Oct 20, 2026", amount: 159.00, status: "Pending", initials: "WK", color: "blue" },
  { id: "#ORD-7825", customer: "Sophia Patel", email: "sophia.p@example.com", product: "Studio Speaker", date: "Oct 19, 2026", amount: 199.00, status: "Completed", initials: "SP", color: "pink" },
];

const products = [
  { name: "Wireless Headphones", category: "Electronics", sales: 1248, revenue: "$62,400", icon: "🎧", percent: 82 },
  { name: "Smart Watch Pro", category: "Wearables", sales: 968, revenue: "$48,400", icon: "⌚", percent: 68 },
  { name: "Minimal Backpack", category: "Accessories", sales: 754, revenue: "$22,620", icon: "🎒", percent: 53 },
  { name: "Mechanical Keyboard", category: "Electronics", sales: 621, revenue: "$31,050", icon: "⌨️", percent: 44 },
];

const trafficData = [
  { name: "Direct", value: 38, color: "#8b7cff" },
  { name: "Social", value: 28, color: "#42c9a5" },
  { name: "Search", value: 22, color: "#ffb86b" },
  { name: "Referral", value: 12, color: "#6ab7ff" },
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Analytics", icon: Activity },
  { label: "Orders", icon: ShoppingBag },
  { label: "Products", icon: Package },
  { label: "Customers", icon: Users },
];

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <>
      {open && <button className="sidebar-overlay" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Command size={22} /></div>
          <span>pulse<span className="brand-dot">.</span></span>
          <button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={19} /></button>
        </div>

        <div className="workspace">
          <div className="workspace-logo">N</div>
          <div className="workspace-copy"><strong>Nexus Studio</strong><span>Pro workspace</span></div>
          <ChevronDown size={16} className="muted-icon" />
        </div>

        <p className="nav-heading">WORKSPACE</p>
        <nav className="nav-list">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${active === label ? "nav-active" : ""}`}
              onClick={() => { setActive(label); setOpen(false); }}
            >
              <Icon size={18} strokeWidth={1.9} />
              <span>{label}</span>
              {label === "Orders" && <span className="nav-count">8</span>}
            </button>
          ))}
        </nav>

        <p className="nav-heading nav-heading-spaced">PREFERENCES</p>
        <nav className="nav-list">
          <button className={`nav-item ${active === "Settings" ? "nav-active" : ""}`} onClick={() => { setActive("Settings"); setOpen(false); }}>
            <Settings size={18} /><span>Settings</span>
          </button>
          <button className={`nav-item ${active === "Help center" ? "nav-active" : ""}`} onClick={() => { setActive("Help center"); setOpen(false); }}>
            <CircleHelp size={18} /><span>Help center</span>
          </button>
        </nav>

        <div className="sidebar-spacer" />

        <div className="upgrade-card">
          <div className="upgrade-icon"><Sparkles size={17} /></div>
          <strong>Unlock your potential</strong>
          <p>Get deeper insights with Pulse Pro.</p>
          <button onClick={() => alert("You're already exploring the Pulse Pro demo!")}>Explore Pro <ArrowUpRight size={14} /></button>
        </div>

        <button className="profile">
          <div className="profile-avatar">AC</div>
          <div className="profile-copy"><strong>Alex Carter</strong><span>alex@nexus.studio</span></div>
          <MoreHorizontal size={19} className="muted-icon" />
        </button>
      </aside>
    </>
  );
}

function StatCard({ title, value, change, note, icon: Icon, tone }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className="stat-title">{title}</span>
        <div className={`stat-icon ${tone}`}><Icon size={19} /></div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-bottom">
        <span className="stat-change"><ArrowUpRight size={14} /> {change}</span>
        <span className="stat-note">{note}</span>
      </div>
    </article>
  );
}

function SectionHeading({ title, description, action }) {
  return (
    <div className="section-heading">
      <div><h2>{title}</h2>{description && <p>{description}</p>}</div>
      {action}
    </div>
  );
}

function Overview({ period, setPeriod, orders, setActive }) {
  const chartData = period === "Weekly" ? weeklyData : period === "Monthly" ? monthlyData : yearlyData;
  const revenue = period === "Weekly" ? "$44,700" : period === "Monthly" ? "$685,000" : "$1.12M";
  const orderCount = period === "Weekly" ? "2,910" : period === "Monthly" ? "38,450" : "69,000";

  return (
    <>
      <div className="welcome-row">
        <div>
          <div className="eyebrow"><span className="live-dot" /> YOUR BUSINESS AT A GLANCE</div>
          <h1>Good morning, Alex <span className="wave">✳</span></h1>
          <p className="welcome-subtitle">Here's what's happening with your store today.</p>
        </div>
        <div className="welcome-actions">
          <button className="button button-secondary" onClick={() => window.print()}><Download size={16} /> Export report</button>
          <button className="button button-primary" onClick={() => setActive("Analytics")}><Zap size={16} /> View insights</button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard title="Total Revenue" value={revenue} change="+12.8%" note="vs. previous period" icon={CreditCard} tone="purple" />
        <StatCard title="Total Orders" value={orderCount} change="+8.2%" note="vs. previous period" icon={ShoppingBag} tone="green" />
        <StatCard title="Active Customers" value="8,549" change="+18.6%" note="vs. previous period" icon={Users} tone="orange" />
        <StatCard title="Conversion Rate" value="3.64%" change="+2.4%" note="vs. previous period" icon={Activity} tone="blue" />
      </div>

      <section className="panel revenue-panel">
        <div className="panel-heading chart-heading">
          <div><h2>Revenue overview</h2><p>Track your store's financial performance</p></div>
          <div className="chart-controls">
            <div className="period-switch">
              {["Weekly", "Monthly", "Yearly"].map((item) => (
                <button key={item} className={period === item ? "period-active" : ""} onClick={() => setPeriod(item)}>{item}</button>
              ))}
            </div>
            <button className="icon-button" aria-label="More chart options" onClick={() => alert("Revenue chart options: export, compare, or customize your report.")}><MoreHorizontal size={20} /></button>
          </div>
        </div>
        <div className="chart-summary">
          <strong>{revenue}</strong>
          <span className="summary-growth"><ArrowUpRight size={15} /> 12.8%</span>
          <span className="summary-caption">Total revenue for this {period.toLowerCase().replace("ly", "")}</span>
        </div>
        <div className="revenue-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b7cff" stopOpacity={0.24} />
                  <stop offset="95%" stopColor="#8b7cff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#252a38" strokeDasharray="4 5" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#858ba0", fontSize: 12 }} dy={12} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#858ba0", fontSize: 11 }} tickFormatter={(v) => v >= 1000000 ? `$${v / 1000000}m` : v >= 1000 ? `$${v / 1000}k` : `$${v}`} />
              <Tooltip
                contentStyle={{ background: "#191d29", border: "1px solid #30364a", borderRadius: 12, color: "#fff" }}
                formatter={(value) => [formatMoney(value), "Revenue"]}
                labelStyle={{ color: "#b6bbcc", marginBottom: 5 }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#9a8cff" strokeWidth={3} fill="url(#revenueFill)" activeDot={{ r: 5, fill: "#b4aaff", stroke: "#191d29", strokeWidth: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-footer">
          <span><i className="legend-dot revenue-dot" /> Revenue</span>
          <span className="chart-footer-note"><span className="tiny-trend">↗</span> Revenue is trending upward this period</span>
        </div>
      </section>

      <div className="middle-grid">
        <section className="panel">
          <SectionHeading title="Recent orders" description="Keep track of your latest sales" action={<button className="text-action" onClick={() => setActive("Orders")}>View all <ArrowUpRight size={15} /></button>} />
          <div className="table-wrap">
            <table className="orders-table">
              <thead><tr><th>Customer</th><th>Order</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {orders.slice(0, 4).map((order) => (
                  <tr key={order.id}>
                    <td><div className="customer-cell"><div className={`customer-avatar ${order.color}`}>{order.initials}</div><div><strong>{order.customer}</strong><span>{order.email}</span></div></div></td>
                    <td className="order-id">{order.id}</td>
                    <td className="amount-cell">${order.amount.toFixed(2)}</td>
                    <td><span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel traffic-panel">
          <SectionHeading title="Traffic sources" description="Where your visitors come from" />
          <div className="traffic-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trafficData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={4} stroke="none">
                  {trafficData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#191d29", border: "1px solid #30364a", borderRadius: 10 }} formatter={(value) => [`${value}%`, "Visitors"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="traffic-center"><strong>24.8k</strong><span>Visitors</span></div>
          </div>
          <div className="traffic-legend">
            {trafficData.map((item) => <div className="traffic-legend-row" key={item.name}><span className="traffic-name"><i style={{ background: item.color }} />{item.name}</span><strong>{item.value}%</strong></div>)}
          </div>
        </section>
      </div>

      <section className="panel products-panel">
        <SectionHeading title="Top performing products" description="Your best sellers this month" action={<button className="text-action" onClick={() => setActive("Products")}>All products <ArrowUpRight size={15} /></button>} />
        <div className="product-list">
          {products.map((product) => (
            <div className="product-row" key={product.name}>
              <div className="product-emoji">{product.icon}</div>
              <div className="product-info"><strong>{product.name}</strong><span>{product.category} · {product.sales.toLocaleString()} sold</span></div>
              <div className="product-progress"><div className="progress-track"><div style={{ width: `${product.percent}%` }} /></div></div>
              <strong className="product-revenue">{product.revenue}</strong>
              <button className="icon-button product-more" aria-label={`More options for ${product.name}`} onClick={() => alert(`${product.name}: ${product.sales.toLocaleString()} units sold, ${product.revenue} revenue.`)}><MoreHorizontal size={18} /></button>
            </div>
          ))}
        </div>
      </section>

      <div className="dashboard-footnote"><span><i className="live-dot" /> All systems operational</span><span>Last updated just now · Demo analytics data</span></div>
    </>
  );
}

function OrdersPage({ orders, search, setSearch, statusFilter, setStatusFilter }) {
  const filtered = orders.filter((order) =>
    `${order.id} ${order.customer} ${order.email} ${order.product}`.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "All statuses" || order.status === statusFilter)
  );

  return (
    <>
      <div className="welcome-row page-title-row"><div><div className="eyebrow">SALES MANAGEMENT</div><h1>Orders</h1><p className="welcome-subtitle">View and manage all your recent transactions.</p></div><button className="button button-secondary" onClick={() => window.print()}><Download size={16} /> Export orders</button></div>
      <div className="stat-grid compact-stats">
        <StatCard title="All Orders" value="2,910" change="+8.2%" note="this period" icon={ShoppingBag} tone="purple" />
        <StatCard title="Completed" value="2,540" change="+10.1%" note="this period" icon={Package} tone="green" />
        <StatCard title="Processing" value="245" change="+4.3%" note="this period" icon={Activity} tone="orange" />
        <StatCard title="Pending" value="125" change="+1.8%" note="this period" icon={CreditCard} tone="blue" />
      </div>
      <section className="panel orders-page-panel">
        <SectionHeading title="All transactions" description={`${filtered.length} orders shown`} />
        <div className="table-toolbar">
          <div className="search-box table-search"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders or customers..." /></div>
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All statuses</option><option>Completed</option><option>Processing</option><option>Pending</option></select>
        </div>
        <div className="table-wrap">
          <table className="orders-table full-orders-table">
            <thead><tr><th>Customer</th><th>Order ID</th><th>Product</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map((order) => <tr key={order.id}>
                <td><div className="customer-cell"><div className={`customer-avatar ${order.color}`}>{order.initials}</div><div><strong>{order.customer}</strong><span>{order.email}</span></div></div></td>
                <td className="order-id">{order.id}</td><td>{order.product}</td><td className="date-cell">{order.date}</td><td className="amount-cell">${order.amount.toFixed(2)}</td><td><span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span></td>
              </tr>)}
              {filtered.length === 0 && <tr><td colSpan="6" className="empty-state">No orders match your search.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function AnalyticsPage({ period, setPeriod }) {
  const data = period === "Weekly" ? weeklyData : period === "Monthly" ? monthlyData : yearlyData;
  return (
    <>
      <div className="welcome-row"><div><div className="eyebrow">DATA & PERFORMANCE</div><h1>Analytics</h1><p className="welcome-subtitle">Understand what's driving your business forward.</p></div><div className="period-switch standalone-switch">{["Weekly", "Monthly", "Yearly"].map((p) => <button key={p} className={period === p ? "period-active" : ""} onClick={() => setPeriod(p)}>{p}</button>)}</div></div>
      <div className="stat-grid">
        <StatCard title="Total Revenue" value={period === "Weekly" ? "$44,700" : period === "Monthly" ? "$685,000" : "$1.12M"} change="+12.8%" note="vs. previous period" icon={CreditCard} tone="purple" />
        <StatCard title="Orders Processed" value={period === "Weekly" ? "2,910" : period === "Monthly" ? "38,450" : "69,000"} change="+8.2%" note="vs. previous period" icon={ShoppingBag} tone="green" />
        <StatCard title="Avg. Order Value" value="$153.61" change="+4.1%" note="vs. previous period" icon={Activity} tone="orange" />
        <StatCard title="Returning Customers" value="42.8%" change="+6.7%" note="vs. previous period" icon={Users} tone="blue" />
      </div>
      <section className="panel analytics-chart-panel"><SectionHeading title="Revenue performance" description={`Revenue and order activity · ${period}`} /><div className="large-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 15, right: 12, left: -15, bottom: 0 }}><CartesianGrid stroke="#252a38" strokeDasharray="4 5" vertical={false} /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#858ba0", fontSize: 12 }} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#858ba0", fontSize: 11 }} tickFormatter={(v) => v >= 1000 ? `$${v / 1000}k` : `$${v}`} /><Tooltip contentStyle={{ background: "#191d29", border: "1px solid #30364a", borderRadius: 12 }} formatter={(v, name) => [name === "revenue" ? formatMoney(v) : v.toLocaleString(), name === "revenue" ? "Revenue" : "Orders"]} /><Bar dataKey="revenue" fill="#8b7cff" radius={[5, 5, 0, 0]} maxBarSize={32} /><Bar dataKey="orders" fill="#42c9a5" radius={[5, 5, 0, 0]} maxBarSize={32} /></BarChart></ResponsiveContainer></div><div className="chart-footer"><span><i className="legend-dot revenue-dot" /> Revenue</span><span><i className="legend-dot orders-dot" /> Orders</span></div></section>
      <div className="middle-grid analytics-bottom"><section className="panel"><SectionHeading title="Traffic breakdown" description="Visitor acquisition channels" />{trafficData.map((item) => <div className="breakdown-row" key={item.name}><div className="breakdown-label"><i style={{ background: item.color }} />{item.name}<strong>{item.value}%</strong></div><div className="progress-track"><div style={{ width: `${item.value}%`, background: item.color }} /></div></div>)}</section><section className="panel insight-panel"><div className="insight-icon"><Sparkles size={20} /></div><h2>Your weekly insight</h2><p>Revenue is trending upward, with social traffic contributing a meaningful share of your visitors. Keep monitoring your best-performing products to identify growth opportunities.</p><div className="insight-metric"><span>Growth opportunity</span><strong>+18.6%</strong></div></section></div>
    </>
  );
}

function ProductsPage() {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filtered = products.filter((p) => category === "All" || p.category === category);
  return (
    <>
      <div className="welcome-row"><div><div className="eyebrow">CATALOG MANAGEMENT</div><h1>Products</h1><p className="welcome-subtitle">See how your products are performing.</p></div><button className="button button-primary" onClick={() => alert("Product creation is a demo action in this dashboard.")}>+ Add product</button></div>
      <section className="panel products-page-panel"><SectionHeading title="Your products" description={`${filtered.length} products in your catalog`} /><div className="category-filters">{categories.map((item) => <button key={item} className={category === item ? "category-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="product-list">{filtered.map((product) => <div className="product-row" key={product.name}><div className="product-emoji">{product.icon}</div><div className="product-info"><strong>{product.name}</strong><span>{product.category} · {product.sales.toLocaleString()} sold</span></div><div className="product-progress"><div className="progress-track"><div style={{ width: `${product.percent}%` }} /></div></div><strong className="product-revenue">{product.revenue}</strong><button className="icon-button" aria-label={`View ${product.name}`} onClick={() => alert(`${product.name} has sold ${product.sales.toLocaleString()} units.`)}><ArrowUpRight size={17} /></button></div>)}</div></section>
    </>
  );
}

function CustomersPage() {
  const segments = [{ label: "New customers", value: "2,481", pct: "29%", tone: "purple" }, { label: "Returning customers", value: "3,659", pct: "43%", tone: "green" }, { label: "VIP customers", value: "1,205", pct: "14%", tone: "orange" }, { label: "At-risk customers", value: "1,204", pct: "14%", tone: "blue" }];
  return (
    <>
      <div className="welcome-row"><div><div className="eyebrow">CUSTOMER RELATIONSHIPS</div><h1>Customers</h1><p className="welcome-subtitle">Get to know the people behind your business.</p></div><button className="button button-secondary" onClick={() => window.print()}><Download size={16} /> Export customers</button></div>
      <div className="stat-grid"><StatCard title="Total Customers" value="8,549" change="+18.6%" note="vs. previous period" icon={Users} tone="purple" /><StatCard title="New This Month" value="1,284" change="+11.2%" note="vs. previous period" icon={ArrowUpRight} tone="green" /><StatCard title="Retention Rate" value="68.4%" change="+5.8%" note="vs. previous period" icon={Activity} tone="orange" /><StatCard title="Lifetime Value" value="$284.50" change="+9.1%" note="vs. previous period" icon={CreditCard} tone="blue" /></div>
      <section className="panel customer-segments"><SectionHeading title="Customer segments" description="Understand your customer mix" />{segments.map((segment) => <div className="segment-row" key={segment.label}><div className={`segment-icon ${segment.tone}`}><Users size={18} /></div><div className="segment-info"><strong>{segment.label}</strong><span>{segment.value} customers</span></div><div className="segment-progress"><div className="progress-track"><div className={segment.tone} style={{ width: segment.pct }} /></div></div><strong className="segment-pct">{segment.pct}</strong></div>)}</section>
      <div className="panel customer-note"><div className="insight-icon"><Sparkles size={20} /></div><div><h2>Customer insight</h2><p>Your returning customer segment is growing steadily. Consider a loyalty campaign to reward repeat purchases and improve retention.</p></div></div>
    </>
  );
}

function UtilityPage({ active }) {
  const [saved, setSaved] = useState(false);
  return <div className="utility-page"><div className="utility-icon">{active === "Settings" ? <Settings size={28} /> : <CircleHelp size={28} />}</div><div className="eyebrow">PULSE WORKSPACE</div><h1>{active}</h1><p>{active === "Settings" ? "Manage your workspace preferences and dashboard experience." : "Need a hand? Here are some helpful ways to get started."}</p>{active === "Settings" ? <div className="panel utility-panel"><div className="setting-row"><div><strong>Email notifications</strong><span>Receive important account and sales updates.</span></div><input type="checkbox" defaultChecked aria-label="Email notifications" /></div><div className="setting-row"><div><strong>Weekly report</strong><span>Get a summary of your business performance.</span></div><input type="checkbox" defaultChecked aria-label="Weekly report" /></div><div className="setting-row"><div><strong>Compact dashboard</strong><span>Preference for a more condensed layout.</span></div><input type="checkbox" aria-label="Compact dashboard" /></div><button className="button button-primary" onClick={() => setSaved(true)}>{saved ? "Preferences saved ✓" : "Save preferences"}</button></div> : <div className="panel utility-panel help-links"><button onClick={() => alert("Explore the Overview, Analytics, Orders, Products, and Customers sections.")}>Getting started <ChevronRight size={17} /></button><button onClick={() => alert("Use the date range controls and chart tooltips to explore your demo analytics.")}>Understanding analytics <ChevronRight size={17} /></button><button onClick={() => alert("This is a frontend demo dashboard with sample data; no real customer data is connected.")}>About this demo <ChevronRight size={17} /></button></div>}</div>;
}

export default function App() {
  const [active, setActive] = useState("Overview");
  const [period, setPeriod] = useState("Weekly");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [orders, setOrders] = useState(initialOrders);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const visibleOrders = useMemo(() => orders, [orders]);

  const handleSearch = (value) => {
    setSearch(value);
    if (value.trim()) setActive("Orders");
  };

  return (
    <div className="app-shell">
      <Sidebar active={active} setActive={setActive} open={mobileOpen} setOpen={setMobileOpen} />
      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu icon-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
            <div className="breadcrumbs"><span>Workspace</span><ChevronRight size={15} /><strong>{active}</strong></div>
          </div>
          <div className="topbar-right">
            {searchOpen ? (
              <div className="search-box top-search"><Search size={17} /><input autoFocus value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search orders..." /><button onClick={() => { setSearchOpen(false); setSearch(""); }} aria-label="Close search"><X size={16} /></button></div>
            ) : <button className="topbar-search icon-button" onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={19} /></button>}
            <div className="notification-wrap">
              <button className="topbar-search icon-button notification-button" onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Notifications"><Bell size={19} /><span className="notification-dot" /></button>
              {notificationsOpen && <div className="notification-popover"><strong>Notifications</strong><p><span className="notification-item-dot" /> Your weekly report is ready.</p><p><span className="notification-item-dot green-dot" /> 8 new orders received today.</p><button onClick={() => setNotificationsOpen(false)}>Mark as read</button></div>}
            </div>
            <div className="topbar-divider" />
            <div className="top-profile"><div className="profile-avatar">AC</div><ChevronDown size={15} className="muted-icon" /></div>
          </div>
        </header>

        <div className="page-content">
          {active === "Overview" && <Overview period={period} setPeriod={setPeriod} orders={visibleOrders} setActive={setActive} />}
          {active === "Analytics" && <AnalyticsPage period={period} setPeriod={setPeriod} />}
          {active === "Orders" && <OrdersPage orders={orders} search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />}
          {active === "Products" && <ProductsPage />}
          {active === "Customers" && <CustomersPage />}
          {(active === "Settings" || active === "Help center") && <UtilityPage active={active} />}
        </div>
      </main>
    </div>
  );
}
