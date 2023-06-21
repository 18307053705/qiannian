interface Window {
  QN: {
    history: { push: (url: string, state?: any) => any } & any;
    setError: (value: string) => any;
    error: string;
  } & any;
}
