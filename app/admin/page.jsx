'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);

  const [quotes, setQuotes] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState([]);

  // Sub-states for panels
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [quoteSearch, setQuoteSearch] = useState('');
  const [quoteFilter, setQuoteFilter] = useState('All');
  
  // Settings form state
  const [settingsForm, setSettingsForm] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [
      { data: qData },
      { data: cData },
      { data: mData },
      { data: pData },
      { data: sData }
    ] = await Promise.all([
      supabase.from('quotes').select(`*, profiles(full_name, email)`).order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').eq('role', 'user').order('created_at', { ascending: false }),
      supabase.from('messages').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('*').order('sort_order', { ascending: true }),
      supabase.from('site_settings').select('*')
    ]);

    if (qData) setQuotes(qData);
    if (cData) setCustomers(cData);
    if (mData) setMessages(mData);
    if (pData) setProducts(pData);
    if (sData) {
      setSettings(sData);
      const sForm = {};
      sData.forEach(s => sForm[s.key] = s.value);
      setSettingsForm(sForm);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const notifyUserOfStatus = async (quote, newStatus) => {
    if (quote && quote.email && ['Quoted', 'Confirmed', 'Cancelled'].includes(newStatus)) {
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: quote.email,
          subject: `Astra NCR - Quote Status Updated to ${newStatus}`,
          html: `<p>Hi ${quote.full_name},</p><p>Your quote request (${quote.reference_number}) status has been updated to: <strong>${newStatus}</strong>.</p>`
        })
      });
    }
  };

  const updateQuoteStatus = async (id, status) => {
    const quote = quotes.find(q => q.id === id);
    if (quote && quote.status !== status) {
      await notifyUserOfStatus(quote, status);
    }
    await supabase.from('quotes').update({ status }).eq('id', id);
    fetchData();
  };

  const saveQuoteDetails = async (e) => {
    e.preventDefault();
    const originalQuote = quotes.find(q => q.id === selectedQuote.id);
    if (originalQuote && originalQuote.status !== selectedQuote.status) {
      await notifyUserOfStatus(originalQuote, selectedQuote.status);
    }
    await supabase.from('quotes').update({
      admin_notes: selectedQuote.admin_notes,
      quoted_price: selectedQuote.quoted_price,
      status: selectedQuote.status
    }).eq('id', selectedQuote.id);
    setSelectedQuote(null);
    fetchData();
  };

  const saveMessageReply = async (e) => {
    e.preventDefault();
    await supabase.from('messages').update({
      admin_reply: selectedMessage.admin_reply,
      status: 'Replied'
    }).eq('id', selectedMessage.id);
    setSelectedMessage(null);
    fetchData();
  };

  const markMessageRead = async (id) => {
    await supabase.from('messages').update({ status: 'Read' }).eq('id', id);
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, status: 'Read' });
    }
    fetchData();
  };

  const saveProduct = async (product) => {
    if (product.id) {
      await supabase.from('products').update(product).eq('id', product.id);
    } else {
      await supabase.from('products').insert([product]);
    }
    fetchData();
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(settingsForm)) {
      await supabase.from('site_settings').update({ value }).eq('key', key);
    }
    alert('Settings saved!');
    fetchData();
  };

  const stats = {
    totalQuotes: quotes.length,
    newQuotesWeek: quotes.filter(q => (new Date() - new Date(q.created_at)) / (1000*60*60*24) <= 7).length,
    totalCustomers: customers.length,
    unreadMessages: messages.filter(m => m.status === 'Unread').length
  };

  // Renderers
  const renderSidebar = () => {
    const navItems = [
      { name: 'Overview', icon: '📊' },
      { name: 'Quotes', icon: '📋' },
      { name: 'Customers', icon: '👥' },
      { name: 'Messages', icon: '📨', badge: stats.unreadMessages },
      { name: 'Products', icon: '📦' },
      { name: 'Settings', icon: '⚙️' }
    ];

    return (
      <div style={{ width: '240px', background: '#0A0F1E', color: 'white', display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', left: 0, top: 0 }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>ASTRA NCR</h1>
          <p style={{ margin: 0, color: '#FF6B35', fontSize: '0.85rem', fontWeight: 600 }}>Admin Portal</p>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '1rem', color: '#94A3B8', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← View Website
          </a>
        </div>
        <div style={{ flex: 1, padding: '1.5rem 0' }}>
          {navItems.map(item => (
            <div 
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              style={{
                padding: '1rem 1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderLeft: activeTab === item.name ? '4px solid #FF6B35' : '4px solid transparent',
                background: activeTab === item.name ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: activeTab === item.name ? '#FF6B35' : '#94A3B8',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <span style={{ marginRight: '10px' }}>{item.icon}</span>
                <span style={{ fontWeight: 500 }}>{item.name}</span>
              </div>
              {item.badge > 0 && (
                <span style={{ background: '#EF4444', color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 700 }}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
        <div 
          onClick={handleSignOut}
          style={{ padding: '1.5rem', cursor: 'pointer', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <span>🚪</span> Sign Out
        </div>
      </div>
    );
  };

  const renderOverview = () => (
    <div>
      <h2 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '2rem' }}>Dashboard Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {[
          { title: 'Total Quotes', val: stats.totalQuotes, icon: '📋', color: '#3B82F6' },
          { title: 'New This Week', val: stats.newQuotesWeek, icon: '🔥', color: '#F97316' },
          { title: 'Total Customers', val: stats.totalCustomers, icon: '👥', color: '#22C55E' },
          { title: 'Unread Messages', val: stats.unreadMessages, icon: '📨', color: '#EF4444' }
        ].map(stat => (
          <div key={stat.title} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '1.5rem', opacity: 0.8 }}>{stat.icon}</div>
            <div style={{ color: '#64748B', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>{stat.title}</div>
            <div style={{ color: '#0F172A', fontSize: '2.5rem', fontWeight: 800 }}>{stat.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '1.5rem' }}>Recent Quotes</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', textAlign: 'left' }}>
                <th style={{ padding: '0.8rem' }}>Ref</th>
                <th style={{ padding: '0.8rem' }}>Customer</th>
                <th style={{ padding: '0.8rem' }}>Product</th>
                <th style={{ padding: '0.8rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {quotes.slice(0, 10).map(q => (
                <tr key={q.id} style={{ borderBottom: '1px solid #F1F5F9', color: '#1E293B' }}>
                  <td style={{ padding: '0.8rem', fontWeight: 600 }}>{q.reference_number}</td>
                  <td style={{ padding: '0.8rem' }}>{q.full_name}</td>
                  <td style={{ padding: '0.8rem' }}>{q.product_needed}</td>
                  <td style={{ padding: '0.8rem' }}>{renderBadge(q.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginBottom: '1.5rem' }}>Recent Messages</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.slice(0, 5).map(m => (
              <div key={m.id} style={{ padding: '1rem', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#0F172A', fontSize: '0.95rem' }}>{m.name}</strong>
                  {m.status === 'Unread' && <span style={{ width: '10px', height: '10px', background: '#EF4444', borderRadius: '50%' }}></span>}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBadge = (status) => {
    let colors = { bg: '#F1F5F9', text: '#64748B' };
    if (status === 'Under Review' || status === 'Unread') colors = { bg: '#FEF3C7', text: '#B45309' };
    if (status === 'Quoted' || status === 'Read') colors = { bg: '#DBEAFE', text: '#1D4ED8' };
    if (status === 'Confirmed' || status === 'Replied') colors = { bg: '#DCFCE7', text: '#15803D' };
    if (status === 'Cancelled') colors = { bg: '#FEE2E2', text: '#B91C1C' };
    return <span style={{ background: colors.bg, color: colors.text, padding: '4px 8px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>{status}</span>;
  };

  const renderQuotes = () => {
    let filtered = quotes;
    if (quoteFilter !== 'All') filtered = filtered.filter(q => q.status === quoteFilter);
    if (quoteSearch) {
      filtered = filtered.filter(q => 
        q.reference_number?.toLowerCase().includes(quoteSearch.toLowerCase()) || 
        q.full_name?.toLowerCase().includes(quoteSearch.toLowerCase()) ||
        q.email?.toLowerCase().includes(quoteSearch.toLowerCase())
      );
    }

    return (
      <div style={{ position: 'relative', minHeight: '100%' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '2rem' }}>Manage Quotes</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            type="text" 
            placeholder="Search by Ref, Name, Email..." 
            value={quoteSearch}
            onChange={e => setQuoteSearch(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', width: '300px' }}
          />
          <select 
            value={quoteFilter} 
            onChange={e => setQuoteFilter(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', background: 'white' }}
          >
            <option value="All">All Statuses</option>
            <option value="Under Review">Under Review</option>
            <option value="Quoted">Quoted</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead style={{ background: '#F8FAFC' }}>
              <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', textAlign: 'left' }}>
                <th style={{ padding: '1rem' }}>Ref</th>
                <th style={{ padding: '1rem' }}>Customer</th>
                <th style={{ padding: '1rem' }}>Product</th>
                <th style={{ padding: '1rem' }}>Qty/Parts</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(q => (
                <tr key={q.id} style={{ borderBottom: '1px solid #F1F5F9', color: '#1E293B' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{q.reference_number}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 500 }}>{q.full_name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{q.email}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{q.product_needed}</td>
                  <td style={{ padding: '1rem' }}>{q.estimated_quantity} / {q.number_of_parts}</td>
                  <td style={{ padding: '1rem' }}>
                    <select 
                      value={q.status}
                      onChange={(e) => updateQuoteStatus(q.id, e.target.value)}
                      style={{ padding: '4px', borderRadius: '4px', border: '1px solid #E2E8F0', outline: 'none', background: 'white', fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Quoted">Quoted</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button onClick={() => setSelectedQuote(q)} style={{ background: '#F1F5F9', border: 'none', padding: '6px 12px', borderRadius: '6px', color: '#0F172A', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedQuote && (
          <>
            <div onClick={() => setSelectedQuote(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100 }}></div>
            <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '500px', background: 'white', zIndex: 101, padding: '2rem', overflowY: 'auto', boxShadow: '-10px 0 40px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Quote {selectedQuote.reference_number}</h3>
                <button onClick={() => setSelectedQuote(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
                <div><small style={{ color: '#64748B' }}>Customer</small><div style={{ fontWeight: 600 }}>{selectedQuote.full_name}</div></div>
                <div><small style={{ color: '#64748B' }}>Email</small><div>{selectedQuote.email}</div></div>
                <div><small style={{ color: '#64748B' }}>Phone</small><div>{selectedQuote.phone || '-'}</div></div>
                <div><small style={{ color: '#64748B' }}>Business</small><div>{selectedQuote.business_type || '-'}</div></div>
                <div style={{ gridColumn: '1 / -1' }}><small style={{ color: '#64748B' }}>Details</small><div style={{ background: 'white', padding: '0.8rem', borderRadius: '6px', border: '1px solid #E2E8F0', marginTop: '4px' }}>{selectedQuote.additional_details || 'None'}</div></div>
              </div>

              <form onSubmit={saveQuoteDetails}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Status</label>
                  <select 
                    value={selectedQuote.status}
                    onChange={e => setSelectedQuote({...selectedQuote, status: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }}
                  >
                    <option value="Under Review">Under Review</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Quoted Price</label>
                  <input 
                    type="text" 
                    value={selectedQuote.quoted_price || ''}
                    onChange={e => setSelectedQuote({...selectedQuote, quoted_price: e.target.value})}
                    placeholder="e.g. £150"
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }}
                  />
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Admin Notes (Internal)</label>
                  <textarea 
                    value={selectedQuote.admin_notes || ''}
                    onChange={e => setSelectedQuote({...selectedQuote, admin_notes: e.target.value})}
                    rows="4"
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', resize: 'vertical' }}
                  ></textarea>
                </div>

                <button type="submit" style={{ width: '100%', background: '#FF6B35', color: 'white', padding: '1rem', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                  Save Changes
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderMessages = () => (
    <div style={{ position: 'relative', minHeight: '100%' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '2rem' }}>Messages</h2>
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead style={{ background: '#F8FAFC' }}>
            <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', textAlign: 'left' }}>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Email</th>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(m => (
              <tr key={m.id} style={{ borderBottom: '1px solid #F1F5F9', color: '#1E293B', background: m.status === 'Unread' ? '#F8FAFC' : 'white' }}>
                <td style={{ padding: '1rem', fontWeight: m.status === 'Unread' ? 700 : 500 }}>{m.name}</td>
                <td style={{ padding: '1rem' }}>{m.email}</td>
                <td style={{ padding: '1rem' }}>{new Date(m.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '1rem' }}>{renderBadge(m.status)}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button onClick={() => setSelectedMessage(m)} style={{ background: '#F1F5F9', border: 'none', padding: '6px 12px', borderRadius: '6px', color: '#0F172A', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMessage && (
        <>
          <div onClick={() => setSelectedMessage(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100 }}></div>
          <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '500px', background: 'white', zIndex: 101, padding: '2rem', overflowY: 'auto', boxShadow: '-10px 0 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Message Details</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                {selectedMessage.status === 'Unread' && (
                  <button onClick={() => markMessageRead(selectedMessage.id)} style={{ background: '#E2E8F0', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Mark Read</button>
                )}
                <button onClick={() => setSelectedMessage(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
              </div>
            </div>
            
            <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div><strong style={{ display: 'block', color: '#0F172A' }}>{selectedMessage.name}</strong><a href={`mailto:${selectedMessage.email}`} style={{ color: '#3B82F6', fontSize: '0.9rem' }}>{selectedMessage.email}</a></div>
                <div style={{ color: '#64748B', fontSize: '0.85rem' }}>{new Date(selectedMessage.created_at).toLocaleString()}</div>
              </div>
              <div style={{ color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {selectedMessage.message}
              </div>
            </div>

            <form onSubmit={saveMessageReply}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Admin Reply</label>
                <textarea 
                  required
                  value={selectedMessage.admin_reply || ''}
                  onChange={e => setSelectedMessage({...selectedMessage, admin_reply: e.target.value})}
                  rows="6"
                  placeholder="Type reply here..."
                  style={{ width: '100%', padding: '1rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', resize: 'vertical' }}
                ></textarea>
                <small style={{ color: '#64748B', display: 'block', marginTop: '0.5rem' }}>Note: This will save the reply to the database. Sending actual email requires further integration.</small>
              </div>
              <button type="submit" style={{ width: '100%', background: '#FF6B35', color: 'white', padding: '1rem', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                Save Reply
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );

  const renderProducts = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#0F172A', margin: 0 }}>Products</h2>
        <button onClick={() => setProducts([{id: '', name: 'New Product', description: '', price_gbp: '', is_active: true, sort_order: products.length, features: []}, ...products])} style={{ background: '#0F172A', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>+ Add Product</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {products.map((p, idx) => (
          <div key={p.id || `new-${idx}`} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: '#64748B' }}>Product Name</label>
                <input type="text" value={p.name || ''} onChange={e => {
                  const newP = [...products]; newP[idx].name = e.target.value; setProducts(newP);
                }} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: '#64748B' }}>Price (GBP)</label>
                <input type="text" value={p.price_gbp || ''} onChange={e => {
                  const newP = [...products]; newP[idx].price_gbp = e.target.value; setProducts(newP);
                }} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E1', borderRadius: '6px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '0.6rem 0' }}>
                  <input type="checkbox" checked={p.is_active} onChange={e => {
                    const newP = [...products]; newP[idx].is_active = e.target.checked; setProducts(newP);
                  }} style={{ width: '18px', height: '18px' }} />
                  <span style={{ fontWeight: 600, color: '#334155' }}>Active</span>
                </label>
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: '#64748B' }}>Description</label>
              <textarea value={p.description || ''} onChange={e => {
                const newP = [...products]; newP[idx].description = e.target.value; setProducts(newP);
              }} rows="2" style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E1', borderRadius: '6px', resize: 'vertical' }}></textarea>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem', color: '#64748B' }}>Features (comma separated)</label>
              <input type="text" value={p.features ? p.features.join(', ') : ''} onChange={e => {
                const newP = [...products]; newP[idx].features = e.target.value.split(',').map(s=>s.trim()); setProducts(newP);
              }} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E1', borderRadius: '6px' }} placeholder="e.g. Full color, Perforated, 50 sets" />
            </div>

            <button onClick={() => saveProduct(p)} style={{ background: '#FF6B35', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
              Save Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div>
      <h2 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '2rem' }}>Customers</h2>
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead style={{ background: '#F8FAFC' }}>
            <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', textAlign: 'left' }}>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Business</th>
              <th style={{ padding: '1rem' }}>Country</th>
              <th style={{ padding: '1rem' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9', color: '#1E293B' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>{c.full_name}</td>
                <td style={{ padding: '1rem' }}>{c.business_name || '-'}</td>
                <td style={{ padding: '1rem' }}>{c.country || '-'}</td>
                <td style={{ padding: '1rem' }}>{new Date(c.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div style={{ maxWidth: '800px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '2rem' }}>Site Settings</h2>
      <form onSubmit={saveSettings} style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          {Object.keys(settingsForm).map(key => (
            <div key={key} style={{ gridColumn: key.includes('text') || key.includes('hero') ? '1 / -1' : 'auto' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1E293B', textTransform: 'capitalize' }}>
                {key.replace(/_/g, ' ')}
              </label>
              <input 
                type="text" 
                value={settingsForm[key] || ''} 
                onChange={e => setSettingsForm({...settingsForm, [key]: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none' }}
              />
            </div>
          ))}
        </div>
        <button type="submit" style={{ background: '#0F172A', color: 'white', padding: '1rem 2rem', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
          Save All Settings
        </button>
      </form>
    </div>
  );

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F7FA' }}><div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #CBD5E1', borderTopColor: '#FF6B35', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div></div>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F7FA' }}>
      {renderSidebar()}
      <div style={{ marginLeft: '240px', flex: 1, padding: '3rem 4rem' }}>
        {activeTab === 'Overview' && renderOverview()}
        {activeTab === 'Quotes' && renderQuotes()}
        {activeTab === 'Customers' && renderCustomers()}
        {activeTab === 'Messages' && renderMessages()}
        {activeTab === 'Products' && renderProducts()}
        {activeTab === 'Settings' && renderSettings()}
      </div>
      <style dangerouslySetInnerHTML={{__html: `@keyframes spin { to { transform: rotate(360deg); } }`}} />
    </div>
  );
}
