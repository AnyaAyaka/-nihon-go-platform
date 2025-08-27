export default function TeacherDashboard({ user, profile }) {
  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', margin: '20px 0' }}>
        
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>📅 My Schedule</h3>
          <p>Manage your teaching schedule</p>
          <button style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
            Set Schedule
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>👥 My Students</h3>
          <p>View your students</p>
          <button style={{ padding: '8px 16px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}>
            View Students
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>📋 Upload Homework</h3>
          <p>Assign homework to students</p>
          <button style={{ padding: '8px 16px', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '4px' }}>
            Upload
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>💰 My Earnings</h3>
          <p>View payment history</p>
          <button style={{ padding: '8px 16px', backgroundColor: '#9C27B0', color: 'white', border: 'none', borderRadius: '4px' }}>
            View Invoice
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>💬 Chat with Students</h3>
          <p>Message your students</p>
          <button style={{ padding: '8px 16px', backgroundColor: '#607D8B', color: 'white', border: 'none', borderRadius: '4px' }}>
            Open Chat
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>🔗 Zoom Links</h3>
          <p>View upcoming lesson links</p>
          <button style={{ padding: '8px 16px', backgroundColor: '#00BCD4', color: 'white', border: 'none', borderRadius: '4px' }}>
            View Links
          </button>
        </div>

      </div>
    </div>
  )
}
