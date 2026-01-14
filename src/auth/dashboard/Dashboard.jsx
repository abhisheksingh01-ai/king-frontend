import { useEffect, useState } from "react";
import axios from "axios";
import { 
  PlusCircle, RefreshCw, Calendar, Hash, 
  LayoutDashboard, Database, Activity, CheckCircle2, 
  AlertCircle, Loader2, ArrowUpRight 
} from "lucide-react";
import api from "../../api/api";

const Dashboard = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeMessage, setScrapeMessage] = useState("");

  const [formData, setFormData] = useState({ date: "", number: "" });
  const [editData, setEditData] = useState({ date: "", number: "" });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(api.DateNumber.getAll, { withCredentials: true });
      setList(res.data.data || []);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScrape = async () => {
    setIsScraping(true);
    setScrapeMessage("");
    try {
      await axios.get(api.NewScrapeData.saveScrape, { withCredentials: true });
      setScrapeMessage("Sync Successful");
      fetchData();
      setTimeout(() => setScrapeMessage(""), 4000);
    } catch (err) {
      setScrapeMessage("Sync Failed");
    } finally {
      setIsScraping(false);
    }
  };

  const handleAction = async (e, type) => {
    e.preventDefault();
    try {
      if (type === 'add') {
        await axios.post(api.DateNumber.add, formData, { withCredentials: true });
        setFormData({ date: "", number: "" });
      } else {
        await axios.put(api.DateNumber.update(editData.date), { number: editData.number }, { withCredentials: true });
        setEditData({ date: "", number: "" });
      }
      fetchData();
    } catch (err) { alert("Action failed. Check console."); }
  };

  return (
    <div style={ui.container}>
      {/* Sidebar */}
      <nav style={ui.sidebar}>
        <div style={ui.logoSection}>
          <div style={ui.logoIcon}><Activity size={20} color="#fff" /></div>
          <span style={ui.logoText}>Nexus DB</span>
        </div>
        
        <div style={ui.navLinks}>
          <div style={ui.activeNavLink}><LayoutDashboard size={18} /> Dashboard</div>
          <div style={ui.navLink}><Database size={18} /> Scrape Logs</div>
        </div>

        <div style={ui.sidebarBottom}>
            <p style={ui.systemStatus}>System: Online</p>
        </div>
      </nav>

      {/* Main Content */}
      <main style={ui.main}>
        {/* Header Section */}
        <header style={ui.header}>
          <div>
            <h1 style={ui.title}>Analytics Overview</h1>
            <p style={ui.subtitle}>Manage and monitor your database entries</p>
          </div>
          <div style={ui.headerActions}>
            <button 
                onClick={handleScrape} 
                disabled={isScraping} 
                style={isScraping ? ui.btnDisabled : ui.btnSync}
            >
              {isScraping ? <Loader2 size={16} className="spin" /> : <RefreshCw size={16} />}
              {isScraping ? "Syncing..." : "Sync Database"}
            </button>
            {scrapeMessage && (
              <span style={scrapeMessage.includes("Sync Successful") ? ui.msgSuccess : ui.msgError}>
                {scrapeMessage}
              </span>
            )}
          </div>
        </header>

        {/* Stats Grid */}
        <div style={ui.statsGrid}>
          <div style={ui.statCard}>
            <div style={ui.statLabel}>Total Records</div>
            <div style={ui.statValue}>{list.length}</div>
            <div style={ui.statTrend}><ArrowUpRight size={14} /> +2 today</div>
          </div>
          <div style={ui.statCard}>
            <div style={ui.statLabel}>Last Scrape</div>
            <div style={ui.statValue}>Just Now</div>
            <div style={ui.statTrend}><CheckCircle2 size={14} /> Healthy</div>
          </div>
        </div>

        {/* Action Forms Area */}
        <div style={ui.actionArea}>
          <div style={ui.card}>
            <h3 style={ui.cardTitle}><PlusCircle size={18} /> New Entry</h3>
            <form onSubmit={(e) => handleAction(e, 'add')} style={ui.form}>
              <input style={ui.input} placeholder="Date (DD-MM-YYYY)" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              <input style={ui.input} placeholder="Value" value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} />
              <button style={ui.primaryBtn}>Submit Entry</button>
            </form>
          </div>

          <div style={ui.card}>
            <h3 style={ui.cardTitle}><RefreshCw size={18} /> Quick Update</h3>
            <form onSubmit={(e) => handleAction(e, 'update')} style={ui.form}>
              <input style={ui.input} placeholder="Target Date" value={editData.date} onChange={e => setEditData({...editData, date: e.target.value})} />
              <input style={ui.input} placeholder="New Value" value={editData.number} onChange={e => setEditData({...editData, number: e.target.value})} />
              <button style={ui.secondaryBtn}>Update Row</button>
            </form>
          </div>
        </div>

        {/* Table Area */}
        <div style={ui.tableWrapper}>
          <table style={ui.table}>
            <thead>
              <tr>
                <th style={ui.th}>Date</th>
                <th style={ui.th}>Status</th>
                <th style={ui.th}>Recorded Value</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, idx) => (
                <tr key={item._id || idx} style={ui.tr}>
                  <td style={ui.td}>
                    <div style={ui.dateCell}><Calendar size={14} /> {item.date}</div>
                  </td>
                  <td style={ui.td}>
                    <span style={ui.badge}><div style={ui.dot} /> Active</span>
                  </td>
                  <td style={ui.td}>
                    <strong style={ui.tableNumber}>{item.number}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && <div style={ui.emptyState}>No data found in database.</div>}
        </div>
      </main>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        body { margin: 0; background: #f4f7fe; }
      `}</style>
    </div>
  );
};

const ui = {
  container: { display: "flex", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" },
  sidebar: { width: "260px", background: "#fff", borderRight: "1px solid #e9edf7", padding: "24px", display: "flex", flexDirection: "column" },
  logoSection: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" },
  logoIcon: { width: "32px", height: "32px", background: "#4318FF", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" },
  logoText: { fontSize: "20px", fontWeight: "bold", color: "#1B2559" },
  navLinks: { display: "flex", flexDirection: "column", gap: "8px" },
  activeNavLink: { display: "flex", alignItems: "center", gap: "12px", background: "#F4F7FE", color: "#4318FF", padding: "12px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer" },
  navLink: { display: "flex", alignItems: "center", gap: "12px", color: "#A3AED0", padding: "12px", borderRadius: "12px", fontWeight: "500", cursor: "pointer" },
  main: { flex: 1, padding: "40px", backgroundColor: "#F4F7FE" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px" },
  title: { fontSize: "32px", fontWeight: "800", color: "#1B2559", margin: 0 },
  subtitle: { color: "#A3AED0", marginTop: "4px" },
  headerActions: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" },
  btnSync: { display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "none", padding: "10px 20px", borderRadius: "12px", color: "#4318FF", fontWeight: "bold", cursor: "pointer", boxShadow: "0px 10px 20px rgba(0,0,0,0.05)" },
  btnDisabled: { display: "flex", alignItems: "center", gap: "8px", background: "#E9EDF7", border: "none", padding: "10px 20px", borderRadius: "12px", color: "#A3AED0", cursor: "not-allowed" },
  msgSuccess: { color: "#05CD99", fontSize: "12px", fontWeight: "bold" },
  msgError: { color: "#EE5D50", fontSize: "12px", fontWeight: "bold" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "30px" },
  statCard: { background: "#fff", padding: "20px", borderRadius: "20px", boxShadow: "0px 4px 12px rgba(0,0,0,0.02)" },
  statLabel: { color: "#A3AED0", fontSize: "14px", fontWeight: "500" },
  statValue: { fontSize: "24px", fontWeight: "800", color: "#1B2559", margin: "4px 0" },
  statTrend: { fontSize: "12px", color: "#05CD99", display: "flex", alignItems: "center", gap: "4px" },
  actionArea: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" },
  card: { background: "#fff", padding: "24px", borderRadius: "20px" },
  cardTitle: { margin: "0 0 20px 0", fontSize: "18px", color: "#1B2559", display: "flex", alignItems: "center", gap: "10px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "12px 16px", borderRadius: "12px", border: "1px solid #E9EDF7", background: "#F4F7FE", outline: "none" },
  primaryBtn: { background: "#4318FF", color: "#fff", border: "none", padding: "12px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer" },
  secondaryBtn: { background: "#E9EDF7", color: "#1B2559", border: "none", padding: "12px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer" },
  tableWrapper: { background: "#fff", borderRadius: "20px", padding: "20px" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px", borderBottom: "1px solid #F4F7FE", color: "#A3AED0", fontSize: "12px", textTransform: "uppercase" },
  tr: { borderBottom: "1px solid #F4F7FE" },
  td: { padding: "16px 12px", color: "#1B2559", fontSize: "14px" },
  dateCell: { display: "flex", alignItems: "center", gap: "8px", fontWeight: "600" },
  badge: { display: "flex", alignItems: "center", gap: "6px", background: "#05CD991A", color: "#05CD99", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", width: "fit-content" },
  dot: { width: "6px", height: "6px", background: "#05CD99", borderRadius: "50%" },
  tableNumber: { fontSize: "16px", color: "#4318FF" },
  emptyState: { padding: "40px", textAlign: "center", color: "#A3AED0" }
};

export default Dashboard;