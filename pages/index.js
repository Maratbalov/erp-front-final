import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
