import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Mise à jour de l'état pour afficher l'UI de secours en cas d'erreur
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez également logger l'erreur ici
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez personnaliser le message d'erreur à afficher à l'utilisateur
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; // Rend les enfants normalement
  }
}

export default ErrorBoundary;
