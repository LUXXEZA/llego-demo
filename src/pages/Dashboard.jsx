import React from 'react';
import { statsHoy, ventasSemana, pedidosSimulados, restaurante } from '../data/datos';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  return (
    <div className="pagina">
      <h1 className="titulo-pagina">Dashboard — {restaurante.nombre}</h1>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        
        <div className="card" style={{ borderTop: '5px solid #1f3a5f', padding: '2rem' }}>
          <p style={{ color: '#888', fontSize: '1rem', marginBottom: '0.75rem' }}>Ingresos de Hoy</p>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1f3a5f', lineHeight: 1 }}>${statsHoy.ingresos.toFixed(2)}</p>
          <p style={{ fontSize: '0.9rem', color: '#2ecc71', marginTop: '0.75rem' }}>+12% vs ayer</p>
        </div>

        <div className="card" style={{ borderTop: '5px solid #1f3a5f', padding: '2rem' }}>
          <p style={{ color: '#888', fontSize: '1rem', marginBottom: '0.75rem' }}>Pedidos Totales</p>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1f3a5f', lineHeight: 1 }}>{statsHoy.pedidosTotales}</p>
          <p style={{ fontSize: '0.9rem', color: '#2ecc71', marginTop: '0.75rem' }}>+5 vs ayer</p>
        </div>

        <div className="card" style={{ borderTop: '5px solid #1f3a5f', padding: '2rem' }}>
          <p style={{ color: '#888', fontSize: '1rem', marginBottom: '0.75rem' }}>Gasto Promedio por Cliente</p>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1f3a5f', lineHeight: 1 }}>${statsHoy.ticketPromedio}</p>
          <p style={{ fontSize: '0.9rem', color: '#2ecc71', marginTop: '0.75rem' }}>+$1.20 vs ayer</p>
        </div>

        <div className="card" style={{ borderTop: '5px solid #4a7fb5', padding: '2rem' }}>
          <p style={{ color: '#888', fontSize: '1rem', marginBottom: '0.75rem' }}>Pedidos Delivery</p>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4a7fb5', lineHeight: 1 }}>{statsHoy.pedidosDelivery}</p>
          <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.75rem' }}>62% del total</p>
        </div>

        <div className="card" style={{ borderTop: '5px solid #4a7fb5', padding: '2rem' }}>
          <p style={{ color: '#888', fontSize: '1rem', marginBottom: '0.75rem' }}>Pedidos en Mesa</p>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4a7fb5', lineHeight: 1 }}>{statsHoy.pedidosMesa}</p>
          <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.75rem' }}>38% del total</p>
        </div>

        <div className="card" style={{ borderTop: '5px solid #4a7fb5', padding: '2rem' }}>
          <p style={{ color: '#888', fontSize: '1rem', marginBottom: '0.75rem' }}>Mensajeros Activos</p>
          <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#4a7fb5', lineHeight: 1 }}>{statsHoy.mensajerosActivos}</p>
          <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.75rem' }}>de 3 disponibles</p>
        </div>

      </div>

      {/* GRAFICA Y PEDIDOS RECIENTES */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ color: '#1a1a2e', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.5rem' }}>Ventas de la Semana</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ventasSemana}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="dia" tick={{ fontSize: 13 }} />
              <YAxis tick={{ fontSize: 13 }} />
              <Tooltip
                formatter={(value) => [`$${value}`, 'Ventas']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="ventas" fill="#1f3a5f" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ color: '#1a1a2e', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.5rem' }}>Pedidos Recientes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pedidosSimulados.map(pedido => (
              <div key={pedido.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f9f9f9', borderRadius: '10px' }}>
                <div>
                  <p style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1rem' }}>{pedido.cliente}</p>
                  <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.25rem' }}>#{pedido.id} · {pedido.mesa}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 800, color: '#1f3a5f', fontSize: '1.1rem' }}>${pedido.total.toFixed(2)}</p>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    marginTop: '0.25rem',
                    display: 'inline-block',
                    background: pedido.estado === 'nuevo' ? '#fff3cd' : pedido.estado === 'preparando' ? '#cff4fc' : '#d1e7dd',
                    color: pedido.estado === 'nuevo' ? '#856404' : pedido.estado === 'preparando' ? '#055160' : '#0a3622',
                  }}>
                    {pedido.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;