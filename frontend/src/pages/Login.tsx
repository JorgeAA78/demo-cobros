// ─── Página de Login ─────────────────────────────────────────────────────────
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../services/auth.service';
import { sanitizeInput } from '../services/ycloud';
import { useAuthStore } from '../store/authStore';

export default function Login() {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [requiereVerificacion, setRequiereVerificacion] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const sanitizedEmail = sanitizeInput(formData.email);
        const sanitizedPassword = sanitizeInput(formData.password);

        try {
            const response = await loginAdmin({ email: sanitizedEmail, password: sanitizedPassword });

            if (response.error) {
                if (response.requiereVerificacion) {
                    setRequiereVerificacion(true);
                }
                setError(response.mensaje || 'Error al iniciar sesión');
                return;
            }

            if (response.token && response.admin) {
                setAuth(response.token, response.admin);
                navigate('/');
            }
        } catch (err: any) {
            console.error('Error de login:', err);
            setError(`Error de conexión: ${err?.message || 'No se pudo conectar con el servidor'}. Verifica tu conexión a internet.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <img src="/escudo26.png" alt="Mutantes Fight Team" className="auth-logo-img" />
                    <h1>Mutantes Fight Team</h1>
                    <p>Sistema de Gestión de Cobros</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <h2>Iniciar Sesión</h2>

                    <div style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: 8,
                        padding: '12px',
                        marginBottom: '16px',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#86efac' }}>
                            🎮 <strong>Entorno de Demostración</strong><br/>
                            Usuario: <code>demo@cobros.com</code> | Clave: <code>demo123</code>
                        </p>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            style={{ width: '100%', fontSize: '0.85rem', padding: '6px' }}
                            onClick={() => {
                                setFormData({ email: 'demo@cobros.com', password: 'demo123' });
                            }}
                        >
                            ⚡ Cargar credenciales Demo
                        </button>
                    </div>

                    {error && (
                        <div className="auth-error">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    {requiereVerificacion && (
                        <div className="auth-warning">
                            <Link to={`/verificar?email=${encodeURIComponent(formData.email)}`}>
                                Verificar mi email →
                            </Link>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading-spinner">
                                <img src="/escudo26.png" alt="Cargando..." className="loading-logo" />
                            </span>
                        ) : (
                            'Ingresar'
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="auth-footer-note">
                        El acceso es solo por invitación.<br/>
                        Contacta al administrador para obtener acceso.
                    </p>
                </div>
            </div>
        </div>
    );
}
