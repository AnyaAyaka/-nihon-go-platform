'use client'

import { useRouter } from 'next/navigation'

export default function AdminDashboard({ user, profile }) {
  const router = useRouter()

  return (
    <div>  
      <h2 style={{ marginBottom: '30px', color: '#333' }}>Admin Dashboard</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '25px', 
        margin: '20px 0' 
      }}>
        
        <div style={{ 
          border: '2px solid #e1e5e9', 
          padding: '25px', 
          borderRadius: '15px', 
          background: 'linear-gradient(135deg, #DC3545 0%, #C82333 100%)',
          color: 'white'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>👥 User Management</h3>
          <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>Manage students and teachers</p>
          <button style={{ 
            padding: '12px 20px', 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            color: 'white', 
            border: '2px solid rgba(255,255,255,0.3)', 
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Manage Users
          </button>
        </div>

        <div style={{ 
          border: '2px solid #e1e5e9', 
          padding: '25px', 
          borderRadius: '15px', 
          background: 'linear-gradient(135deg, #28A745 0%, #20C997 100%)',
          color: 'white'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>📚 Textbook Management</h3>
          <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>Upload and manage textbooks</p>
          <button 
            onClick={() => router.push('/textbooks')}
            style={{ 
              padding: '12px 20px', 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: 'white', 
              border: '2px solid rgba(255,255,255,0.3)', 
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Upload Textbooks
          </button>
        </div>

        <div style={{ 
          border: '2px solid #e1e5e9', 
          padding: '25px', 
          borderRadius: '15px', 
          background: 'linear-gradient(135deg, #17A2B8 0%, #138496 100%)',
          color: 'white'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>📊 System Overview</h3>
          <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>View platform statistics</p>
          <button style={{ 
            padding: '12px 20px', 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            color: 'white', 
            border: '2px solid rgba(255,255,255,0.3)', 
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            View Stats
          </button>
        </div>

        <div style={{ 
          border: '2px solid #e1e5e9', 
          padding: '25px', 
          borderRadius: '15px', 
          background: 'linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)',
          color: 'white'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>💳 Payment Management</h3>
          <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>Manage tickets and payments</p>
          <button style={{ 
            padding: '12px 20px', 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            color: 'white', 
            border: '2px solid rgba(255,255,255,0.3)', 
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Manage Payments
          </button>
        </div>

        <div style={{ 
          border: '2px solid #e1e5e9', 
          padding: '25px', 
          borderRadius: '15px', 
          background: 'linear-gradient(135deg, #6C757D 0%, #5A6268 100%)',
          color: 'white'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>🔧 Settings</h3>
          <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>System configuration</p>
          <button style={{ 
            padding: '12px 20px', 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            color: 'white', 
            border: '2px solid rgba(255,255,255,0.3)', 
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Settings
          </button>
        </div>

        <div style={{ 
          border: '2px solid #e1e5e9', 
          padding: '25px', 
          borderRadius: '15px', 
          background: 'linear-gradient(135deg, #6F42C1 0%, #563D7C 100%)',
          color: 'white'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>💬 All Chats</h3>
          <p style={{ margin: '0 0 20px 0', opacity: '0.9' }}>Monitor all conversations</p>
          <button style={{ 
            padding: '12px 20px', 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            color: 'white', 
            border: '2px solid rgba(255,255,255,0.3)', 
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            View Chats
          </button>
        </div>

      </div>
    </div>
  )
}
