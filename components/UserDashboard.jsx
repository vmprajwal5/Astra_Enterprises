'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/AuthContext';

export default function UserDashboard({ isOpen, onClose }) {
  const { user: authUser, profile, setUser: updateAuthUser } = useAuth();
  const [quotes, setQuotes] = useState([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', bizName: '', phone: '', country: '', annualSales: '', source: '' });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (isOpen && authUser) {
      if (profile) {
        setEditForm({ 
          name: profile.full_name || '', 
          bizName: profile.business_name || '', 
          phone: profile.contact_number || '',
          country: profile.country || '',
          annualSales: profile.sales_count || '',
          source: profile.discovery_source || ''
        });
      }
      
      const fetchQuotes = async () => {
        const { data: quotesData } = await supabase
          .from('quotes')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false });
        if (quotesData) setQuotes(quotesData);
      };
      fetchQuotes();
    } else {
      setIsEditing(false);
      setShowSaveSuccess(false);
      setSaveError('');
    }
  }, [isOpen, authUser, profile]);

  const handleSaveProfile = async () => {
    setSaveError('');
    if (!editForm.name || !editForm.bizName || !editForm.phone || !editForm.country || !editForm.annualSales || !editForm.source) {
      setSaveError('Please fill in all fields.');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.name,
          business_name: editForm.bizName,
          contact_number: editForm.phone,
          country: editForm.country,
          sales_count: editForm.annualSales,
          discovery_source: editForm.source
        })
        .eq('id', authUser.id);

      if (error) throw error;
      
      if (updateAuthUser) {
        updateAuthUser(prev => ({
          ...prev,
          full_name: editForm.name,
          business_name: editForm.bizName,
          contact_number: editForm.phone,
          country: editForm.country,
          sales_count: editForm.annualSales,
          discovery_source: editForm.source
        }));
      }
      
      setShowSaveSuccess(true);
      setTimeout(() => {
        setShowSaveSuccess(false);
        setIsEditing(false);
      }, 2000);
      
    } catch(e) {
      console.error('Failed to save profile', e);
      setSaveError('Failed to save profile. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="dashboard-backdrop open" onClick={onClose} />
      <div className="user-dashboard open">
        <div className="dashboard-header">
          <h3>My Account</h3>
          <button className="auth-close" onClick={onClose} style={{ position: 'relative', top: '0', right: '0' }}>&times;</button>
        </div>
        
        <div className="dashboard-content">
          {profile && (
            <div className="dashboard-profile-card anim-scale-in" style={{ marginBottom: '2rem' }}>
              
              {!isEditing ? (
                <>
                  <div className="profile-avatar-large">
                    {profile.full_name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{profile.full_name}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{authUser?.email}</p>
                  
                  <div className="profile-details-grid" style={{ marginBottom: '1rem' }}>
                    <div className="pd-item">
                      <small>Business Name</small>
                      <div>{profile.business_name}</div>
                    </div>
                    <div className="pd-item">
                      <small>Contact Number</small>
                      <div>{profile.contact_number || 'Not provided'}</div>
                    </div>
                    <div className="pd-item">
                      <small>Country</small>
                      <div>{profile.country || 'Not provided'}</div>
                    </div>
                    <div className="pd-item">
                      <small>Annual Sales</small>
                      <div>{profile.sales_count || 'Not provided'}</div>
                    </div>
                    <div className="pd-item" style={{ gridColumn: '1 / -1' }}>
                      <small>Discovery Source</small>
                      <div>{profile.discovery_source || 'Not provided'}</div>
                    </div>
                  </div>
                  
                  <button className="btn btn-outline" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                </>
              ) : (
                <div className="anim-fade-up" style={{ width: '100%', textAlign: 'left' }}>
                  <h4 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>Edit Profile</h4>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', fontWeight: 600 }}>Full Name</label>
                    <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', fontWeight: 600 }}>Business Name</label>
                    <input type="text" value={editForm.bizName} onChange={e => setEditForm({...editForm, bizName: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', fontWeight: 600 }}>Contact Number</label>
                    <input type="tel" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none' }} />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', fontWeight: 600 }}>Country</label>
                    <select value={editForm.country} onChange={e => setEditForm({...editForm, country: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', background: 'white' }}>
                      <option value="">Select a country</option>
                      <option value="India">India</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', fontWeight: 600 }}>How many NCR sets do you order per year?</label>
                    <select value={editForm.annualSales} onChange={e => setEditForm({...editForm, annualSales: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', background: 'white' }}>
                      <option value="">Select a range</option>
                      <option value="Less than 100">Less than 100</option>
                      <option value="100–500">100–500</option>
                      <option value="500–2,000">500–2,000</option>
                      <option value="2,000–5,000">2,000–5,000</option>
                      <option value="5,000+">5,000+</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', fontWeight: 600 }}>How did you find us?</label>
                    <select value={editForm.source} onChange={e => setEditForm({...editForm, source: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', background: 'white' }}>
                      <option value="">Select a source</option>
                      <option value="Google Search">Google Search</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Word of Mouth">Word of Mouth</option>
                      <option value="Referred by a Client">Referred by a Client</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  {saveError && (
                    <div style={{ color: '#E53E3E', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '500' }}>
                      {saveError}
                    </div>
                  )}

                  {showSaveSuccess ? (
                    <div style={{ color: '#22C55E', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: '500', textAlign: 'center', padding: '0.8rem' }}>
                      ✓ Profile updated successfully
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button className="btn nav-quote-btn" style={{ flex: 1, border: 'none', padding: '0.8rem' }} onClick={handleSaveProfile}>Save Changes</button>
                      <button className="btn btn-outline" style={{ flex: 1, padding: '0.8rem' }} onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="dashboard-quotes-section anim-fade-up delay-2">
            <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>My Quotes</h4>
            
            {quotes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
                <div style={{ fontSize: '3rem', opacity: 0.3, marginBottom: '1rem' }}>📋</div>
                <h5 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--navy-900)', fontWeight: 'bold' }}>No quotes yet</h5>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Submit your first quote request and it will appear here.</p>
                <button className="btn nav-quote-btn" onClick={() => {
                  onClose();
                  document.getElementById('quote').scrollIntoView({ behavior: 'smooth' });
                }}>Request a Quote</button>
              </div>
            ) : (
              <div className="quotes-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {quotes.map((q, i) => {
                  const refId = q.reference_number;
                  const formattedDate = new Date(q.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                  
                  // Status colors
                  let statusColor = { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' }; // Under Review
                  if (q.status === 'Quoted') statusColor = { bg: '#DBEAFE', text: '#1E40AF', border: '#BFDBFE' };
                  if (q.status === 'Confirmed') statusColor = { bg: '#DCFCE7', text: '#166534', border: '#BBF7D0' };
                  if (q.status === 'Cancelled') statusColor = { bg: '#FEE2E2', text: '#991B1B', border: '#FECACA' };
                  
                  return (
                    <div key={i} className="anim-fade-up" style={{ 
                      animationDelay: `${i * 0.1}s`,
                      background: 'white', 
                      padding: '16px', 
                      borderRadius: '12px', 
                      border: '1px solid #E2E8F0' 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                        <strong style={{ color: 'var(--navy-900)', fontSize: '1rem' }}>{refId}</strong>
                        <span style={{ background: statusColor.bg, color: statusColor.text, padding: '0.25rem 0.6rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '600', border: `1px solid ${statusColor.border}` }}>
                          {q.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '0.5rem' }}>
                        {q.product_needed} &bull; {q.estimated_quantity} sets &bull; {q.number_of_parts}-part
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                        {formattedDate}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </>
  );
}
