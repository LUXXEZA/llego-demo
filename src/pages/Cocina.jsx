import React, { useState } from 'react';
import { pedidosSimulados } from '../data/datos';

function Cocina() {
  const [pedidos, setPedidos] = useState(pedidosSimulados);

  const avanzarEstado = (id) => {
    setPedidos(pedidos.map(p => {
      if (p.id !== id) return p;
      const estados = ['nuevo', 'preparando', 'listo', 'entregado'];
      const siguiente = estados[estados.indexOf(p.estado) + 1];
      return siguiente ? { ...p, estado: siguiente } : p;
    }));
  };

const columnas = [
  { estado: 'nuevo', titulo: 'Nuevos', color: '#ffffff', bg: '#1f3a5f' },
  { estado: 'preparando', titulo: 'Preparando', color: '#ffffff', bg: '#1f3a5f' },
  { estado: 'listo', titulo: 'Listos', color: '#ffffff', bg: '#1f3a5f' },
  { estado: 'entregado', titulo: 'Entregados', color: '#ffffff', bg: '#1f3a5f' },
];

  return (
    <div className="pagina">
      <h1 className="titulo-pagina">👨‍🍳 Panel de Cocina</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {columnas.map(col => (
          <div key={col.estado}>
            <div style={{ background: col.bg, color: col.color, padding: '0.75rem 1rem', borderRadius: '10px', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>
              {col.titulo} ({pedidos.filter(p => p.estado === col.estado).length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {pedidos.filter(p => p.estado === col.estado).map(pedido => (
                <div key={pedido.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 700, color: '#1a1a2e' }}>#{pedido.id}</span>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>⏱ {pedido.tiempo}</span>
                  </div>

                  <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{pedido.cliente}</p>
                  <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.75rem' }}>{pedido.mesa}</p>

                  {pedido.items.map((item, i) => (
                    <div key={i} style={{ fontSize: '0.85rem', padding: '0.25rem 0', borderBottom: '1px solid #f5f5f5' }}>
                      x{item.cantidad} {item.nombre}
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                    <span style={{ fontWeight: 700, color: '#e94560' }}>${pedido.total.toFixed(2)}</span>
                    {pedido.estado !== 'entregado' && (
                      <button className="btn btn-verde" onClick={() => avanzarEstado(pedido.id)}>
                        {pedido.estado === 'nuevo' ? 'Preparar' : pedido.estado === 'preparando' ? 'Listo ✓' : 'Entregar'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cocina;