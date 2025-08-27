'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function TextbooksPage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [textbooks, setTextbooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const router = useRouter()

  useEffect(() => {
    checkUser()
    fetchTextbooks()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth')
      return
    }

    setUser(user)

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    setProfile(profileData)
    setLoading(false)
  }

  const fetchTextbooks = async () => {
    const { data, error } = await supabase
      .from('textbooks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching textbooks:', error)
    } else {
      setTextbooks(data || [])
    }
  }

  const uploadTextbook = async (e) => {
    e.preventDefault()
    
    if (!file || !title) {
      alert('Please provide both title and file')
      return
    }

    if (profile?.role !== 'admin') {
      alert('Only admins can upload textbooks')
      return
    }

    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `textbooks/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('textbooks')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('textbooks')
        .getPublicUrl(filePath)

      const { error: dbError } = await supabase
        .from('textbooks')
        .insert({
          title,
          description,
          file_url: publicUrl,
          file_name: file.name,
          uploaded_by: user.id
        })

      if (dbError) {
        throw dbError
      }

      alert('Textbook uploaded successfully!')
      setTitle('')
      setDescription('')
      setFile(null)
      fetchTextbooks()

    } catch (error) {
      console.error('Error uploading:', error)
      alert('Error uploading textbook')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            📚 Textbooks
          </h1>
          
          <button 
            onClick={() => router.push('/dashboard')}
            style={{ 
              padding: '12px 20px', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white', 
              border: 'none', 
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back to Dashboard
          </button>
        </div>

        {profile?.role === 'admin' && (
          <div style={{ 
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Upload New Textbook</h2>
            
            <form onSubmit={uploadTextbook}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Title:</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '10px', 
                    border: '2px solid #e1e5e9',
                    fontSize: '16px'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Description:</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '10px', 
                    border: '2px solid #e1e5e9',
                    fontSize: '16px',
                    height: '100px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>PDF File:</label>
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '10px', 
                    border: '2px solid #e1e5e9',
                    fontSize: '16px'
                  }}
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={uploading}
                style={{ 
                  padding: '15px 30px', 
                  background: uploading ? '#ccc' : 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: uploading ? 'not-allowed' : 'pointer'
                }}
              >
                {uploading ? 'Uploading...' : 'Upload Textbook'}
              </button>
            </form>
          </div>
        )}

        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Available Textbooks</h2>
          
          {textbooks.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
              No textbooks available yet.
            </p>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '20px' 
            }}>
              {textbooks.map((textbook) => (
                <div key={textbook.id} style={{ 
                  border: '2px solid #e1e5e9',
                  borderRadius: '15px',
                  padding: '20px',
                  transition: 'all 0.3s ease'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{textbook.title}</h3>
                  <p style={{ color: '#666', margin: '0 0 15px 0', fontSize: '14px' }}>
                    {textbook.description || 'No description'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#999' }}>
                      {new Date(textbook.created_at).toLocaleDateString()}
                    </span>
                    <a 
                      href={textbook.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        padding: '8px 16px', 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white', 
                        textDecoration: 'none',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
