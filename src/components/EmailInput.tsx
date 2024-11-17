import { useState } from 'react';

export default function EmailInput() {
  const [email, setEmail] = useState('');

  return (
    <div className="mb-4">
      <label 
        htmlFor="email" 
        className="block text-sm font-medium text-gray-700"
      >
        Email Adresse
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="ihre@email.de"
        required
      />
    </div>
  );
} 