import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://trgqrsgeqkspberckazi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyZ3Fyc2dlcWtzcGJlcmNrYXppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MzY3NjQsImV4cCI6MjA2NDUxMjc2NH0.khO-E-zPvQaiRQTuOqc9icnI8teSNw3rtP1ypPRddjI'
)

export default function Home() {
  const [stock, setStock] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('stock')
        .select(`quantity, product(name), warehouse(name)`)
      if (error) console.error(error)
      else setStock(data || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <main style={{ padding: 32 }}>
      <h1>📦 ERP Остатки</h1>
      {loading ? (
        <p>Загружаю...</p>
      ) : stock.length === 0 ? (
        <p>Нет данных. Добавь хотя бы 1 товар в Supabase.</p>
      ) : (
        <table style={{ border: '1px solid gray', width: '100%', marginTop: 16 }}>
          <thead>
            <tr>
              <th>Товар</th>
              <th>Склад</th>
              <th>Кол-во</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((row, i) => (
              <tr key={i}>
                <td>{row.product?.name}</td>
                <td>{row.warehouse?.name}</td>
                <td>{row.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}
