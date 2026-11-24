import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useStore } from '../store/useStore';
import { API_BASE } from '../config/api';

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
    const navigate = useNavigate();
    const { admin, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
        onClose();
    };

    return (
        <>
            <div className={`sidebar-overlay ${open ? 'active' : ''}`} onClick={onClose} />
            <aside className={`sidebar ${open ? 'open' : ''}`}>
                <div className="sidebar-logo">
                    <img src="/escudo26.png" alt="Mutantes Fight Team" className="logo-img" />
                    <div>
                        <h2>Mutantes</h2>
                        <span>Fight Team BJJ</span>
                    </div>
                </div>

                <div style={{
                    margin: '0 12px 10px 12px',
                    padding: '4px 8px',
                    background: 'rgba(234, 179, 8, 0.15)',
                    border: '1px solid rgba(234, 179, 8, 0.4)',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    color: '#facc15',
                    textAlign: 'center',
                    fontWeight: 600,
                    letterSpacing: '0.5px'
                }}>
                    ✨ ENTORNO DEMO
                </div>

                {admin && (
                    <div className="sidebar-user">
                        <span className="user-icon">👤</span>
                        <div className="user-info">
                            <span className="user-name">{admin.nombre}</span>
                            <span className="user-email">{admin.email}</span>
                        </div>
                    </div>
                )}

                <nav className="sidebar-nav">
                    <span className="nav-section-label">Principal</span>
                    <NavLink to="/" className={({ isActive }: { isActive: boolean }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                        <span className="nav-icon">📊</span> Dashboard
                    </NavLink>

                    <span className="nav-section-label">Gestión</span>
                    <NavLink to="/registrar" className={({ isActive }: { isActive: boolean }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                        <span className="nav-icon">🥋</span> Registrar Alumno
                    </NavLink>
                    <NavLink to="/cobrar" className={({ isActive }: { isActive: boolean }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                        <span className="nav-icon">💳</span> Cobrar Cuota
                    </NavLink>
                    <NavLink to="/recordatorios" className={({ isActive }: { isActive: boolean }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                        <span className="nav-icon">🔔</span> Recordatorios
                    </NavLink>

                    <span className="nav-section-label">Sistema</span>
                    <NavLink to="/configuracion" className={({ isActive }: { isActive: boolean }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                        <span className="nav-icon">⚙️</span> Configuración
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <button 
                        type="button"
                        style={{ 
                            width: '100%', 
                            marginBottom: 10, 
                            padding: '6px 10px',
                            fontSize: '0.8rem', 
                            background: 'rgba(234, 179, 8, 0.12)',
                            border: '1px solid rgba(234, 179, 8, 0.3)',
                            borderRadius: 6,
                            color: '#fef08a',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6
                        }}
                        onClick={async () => {
                            if (window.confirm('¿Reiniciar todos los alumnos y pagos de la demo al estado original?')) {
                                try {
                                    useStore.getState().resetDemoData();
                                    const token = useAuthStore.getState().token;
                                    await fetch(`${API_BASE}/demo/reset`, {
                                        method: 'POST',
                                        headers: { 
                                            'Content-Type': 'application/json',
                                            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                                        }
                                    }).catch(() => {});
                                    window.location.reload();
                                } catch (e) {
                                    console.error(e);
                                    window.location.reload();
                                }
                            }
                        }}
                    >
                        <span>🔄</span> Reiniciar Demo
                    </button>
                    <button className="logout-button" onClick={handleLogout}>
                        <span>🚪</span> Cerrar Sesión
                    </button>
                </div>
            </aside>
        </>
    );
}
