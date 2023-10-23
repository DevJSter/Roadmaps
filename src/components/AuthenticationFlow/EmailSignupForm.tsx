import type { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';

const EmailSignupForm: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterResponse = async (res: Response) => {
    const json = await res.json();

    if (!res.ok) {
      setError(json.message || 'Something went wrong. Please try again later.');
      setIsLoading(false);

      return;
    }

    window.location.href = `/verification-pending?email=${encodeURIComponent(
      email
    )}`;
  };

  const onSubmit = (e: Event) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    fetch(`${import.meta.env.PUBLIC_API_URL}/v1-register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then(handleRegisterResponse)
      .catch((err) => {
        setIsLoading(false);
        setError('Something went wrong. Please try again later.');
      });
  };

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={onSubmit}>
      <label htmlFor="name" className="sr-only">
        Name
      </label>
      <input
        name="name"
        type="text"
        autoComplete="name"
        min={3}
        max={50}
        required
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="Full Name"
        value={name}
        onInput={(e) => setName(String((e.target as any).value))}
      />
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        name="email"
        type="email"
        autoComplete="email"
        required
        className="block w-full rounded-lg border border-gray-300 px-3 py-2  outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="Email Address"
        value={email}
        onInput={(e) => setEmail(String((e.target as any).value))}
      />
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        min={6}
        max={50}
        required
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
        placeholder="Password"
        value={password}
        onInput={(e) => setPassword(String((e.target as any).value))}
      />

      {error && (
        <p className="rounded-lg bg-red-100 p-2 text-red-700">{error}.</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
      >
        {isLoading ? 'Please wait...' : 'Continue to Verify Email'}
      </button>
    </form>
  );
};

export default EmailSignupForm;
