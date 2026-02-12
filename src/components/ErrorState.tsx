export function ErrorState({ message, onRetry }: { message: string, onRetry?: () => void }) {
    return (
        <div className="card animate-fade-in" style={{ border: '1px solid var(--error)', background: 'rgba(239, 68, 68, 0.05)' }}>
            <h3 style={{ color: 'var(--error)', marginBottom: '0.5rem' }}>Connection Issue</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="btn"
                    style={{ background: 'var(--error)' }}
                >
                    Retry Connection
                </button>
            )}
        </div>
    );
}
