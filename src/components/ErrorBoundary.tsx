import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: unknown;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // Keep logging minimal; enough to debug white-screen crashes.
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary] Uncaught error:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-xl border border-border bg-card p-6 text-center space-y-3">
          <h1 className="text-lg font-semibold">Ocorreu um erro</h1>
          <p className="text-sm text-muted-foreground">
            A página falhou ao renderizar. Atualize e tente novamente.
          </p>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
            onClick={() => window.location.reload()}
          >
            Recarregar
          </button>
        </div>
      </div>
    );
  }
}
