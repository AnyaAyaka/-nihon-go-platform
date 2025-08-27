'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function TextbookViewerPage() {
  const [user, setUser] = useState(null)
  const [textbooks, setTextbooks] = useState([])
  const [selectedTextbook, setSelectedTextbook] = useState(null)
  const [chapters, setChapters] = useState([])
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [loading, setLoading] = useState(true)
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

  const fetchChapters = async (textbookId) => {
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('textbook_id', textbookId)
      .order('chapter_number', { ascending: true })

    if (error) {
      console.error('Error fetching chapters:', error)
    } else {
      setChapters(data || [])
    }
  }

  const selectTextbook = (textbook) => {
    setSelectedTextbook(textbook)
    setSelectedChapter(null)
    fetchChapters(textbook.id)
  }

  const selectChapter = (chapter) => {
    setSelectedChapter(chapter)
    // TODO: 進捗を記録
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
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
            📖 Online Textbooks
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

        <div style={{ display: 'flex', gap: '30px' }}>
          
          {/* 左側: 教科書一覧 */}
          <div style={{ 
            width: '300px',
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            height: 'fit-content'
          }}>
            <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '20px' }}>Textbooks</h2>
            
            {textbooks.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
                No textbooks available
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {textbooks.map((textbook) => (
                  <div 
                    key={textbook.id}
                    onClick={() => selectTextbook(textbook)}
                    style={{ 
                      padding: '15px',
                      border: selectedTextbook?.id === textbook.id ? '2px solid #667eea' : '2px solid #e1e5e9',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backgroundColor: selectedTextbook?.id === textbook.id ? '#f8f9ff' : 'white'
                    }}
                  >
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#333' }}>
                      {textbook.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                      {textbook.total_chapters || 0} chapters
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 右側: コンテンツエリア */}
          <div style={{ 
            flex: 1,
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            
            {!selectedTextbook ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                color: '#666'
              }}>
                <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Select a Textbook</h3>
                <p>Choose a textbook from the left panel to start reading</p>
              </div>
            ) : !selectedChapter ? (
              <div>
                <h2 style={{ marginBottom: '20px', color: '#333' }}>
                  {selectedTextbook.title}
                </h2>
                <p style={{ marginBottom: '30px', color: '#666' }}>
                  {selectedTextbook.description}
                </p>
                
                <h3 style={{ marginBottom: '20px', color: '#333' }}>Chapters</h3>
                
                {chapters.length === 0 ? (
                  <p style={{ color: '#666', textAlign: 'center', padding: '40px' }}>
                    No chapters available yet. Content will be added soon!
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {chapters.map((chapter) => (
                      <div 
                        key={chapter.id}
                        onClick={() => selectChapter(chapter)}
                        style={{ 
                          padding: '15px 20px',
                          border: '2px solid #e1e5e9',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>
                            Chapter {chapter.chapter_number}: {chapter.title}
                          </h4>
                        </div>
                        <div style={{ 
                          padding: '4px 12px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          borderRadius: '15px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          Read →
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* チャプター表示エリア */}
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button 
                    onClick={() => setSelectedChapter(null)}
                    style={{ 
                      padding: '8px 16px',
                      background: '#f8f9fa',
                      border: '1px solid #dee2e6',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    ← Back to Chapters
                  </button>
                  <h2 style={{ margin: 0, color: '#333' }}>
                    Chapter {selectedChapter.chapter_number}: {selectedChapter.title}
                  </h2>
                </div>
                
                {/* HTMLコンテンツ表示エリア */}
                <div 
                  style={{ 
                    maxWidth: '800px',
                    lineHeight: '1.8',
                    fontSize: '16px',
                    color: '#333'
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: selectedChapter.content || '<p style="color: #666; text-align: center; padding: 60px;">Content will be added here from WordPress pages</p>' 
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
