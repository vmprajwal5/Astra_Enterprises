export default function DIYCanvas() {
  return (
    <section id="diy-section">
      <div className="container">
        <h2 className="section-title animate-fade-up">Draft It Yourself</h2>
        <p className="section-subtitle animate-fade-up" data-stagger-delay="0.1s">
          Use our lightweight editor to draft your form layout. We'll turn it into a professional print file.
        </p>

        <div className="diy-layout animate-fade-up" data-stagger-delay="0.2s">
          <div className="diy-toolbar">
            <button>Heading</button>
            <button>Table</button>
            <button>Signature Line</button>
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }}></div>
            <button style={{ background: 'var(--accent-orange)', borderColor: 'var(--accent-orange)' }}>Save Draft</button>
          </div>

          <div className="diy-canvas-container">
            <div className="diy-canvas">
              <h1 contentEditable="true" suppressContentEditableWarning>Your Company Name</h1>
              <p contentEditable="true" suppressContentEditableWarning style={{ color: '#666', marginTop: '0.5rem' }}>123 Street Name, City, Country</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', borderBottom: '2px solid #000', paddingBottom: '0.5rem' }}>
                <h2 contentEditable="true" suppressContentEditableWarning>INVOICE</h2>
                <div contentEditable="true" suppressContentEditableWarning>Date: __/__/____</div>
              </div>

              <table style={{ width: '100%', marginTop: '2rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th contentEditable="true" suppressContentEditableWarning style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Description</th>
                    <th contentEditable="true" suppressContentEditableWarning style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td contentEditable="true" suppressContentEditableWarning style={{ borderBottom: '1px solid #eee', padding: '1rem 0.5rem' }}>Click to edit item...</td>
                    <td contentEditable="true" suppressContentEditableWarning style={{ borderBottom: '1px solid #eee', padding: '1rem 0.5rem', textAlign: 'right' }}>$0.00</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '250px' }}>
                  <div style={{ borderBottom: '1px solid #000', paddingBottom: '2rem' }}></div>
                  <div contentEditable="true" suppressContentEditableWarning style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.9rem' }}>Authorized Signature</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
