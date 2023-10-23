import VerifyLetterIcon from '../../icons/verify-letter.svg';
import { useEffect, useState } from 'preact/hooks';

export function VerificationEmailMessage() {
  const [email, setEmail] = useState('..');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailResent, setIsEmailResent] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setEmail(urlParams.get('email')!);
  }, []);

  const resendVerificationEmail = () => {
    fetch(`${import.meta.env.PUBLIC_API_URL}/v1-send-verification-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong. Please try again later.');
        }

        setIsEmailResent(true);
      })
      .catch(() => {
        setIsEmailResent(false);
        setIsLoading(false);
        setError('Something went wrong. Please try again later.');
      });
  };

  return (
    <div className="mx-auto max-w-md text-center">
      <img
        alt="Verify Email"
        src={VerifyLetterIcon}
        class="mx-auto mb-4 h-20 w-40 sm:h-40"
      />
      <h2 class="my-2 text-center text-xl font-semibold sm:my-5 sm:text-2xl">
        Verify your email address
      </h2>
      <div class="text-sm sm:text-base">
        <p>
          We have sent you an email at <span className="font-bold">{email}</span>.
          Please click the link to verify your account. This link will expire
          shortly, so please verify soon!
        </p>

        <hr class="my-4" />

        {!isEmailResent && (
          <>
            {isLoading && <p className="text-gray-400">Sending the email ..</p>}
            {!isLoading && !error && (
              <p>
                Please make sure to check your spam folder. If you still don't
                have the email click to{' '}
                <button
                  disabled={!email}
                  className="inline text-blue-700"
                  onClick={resendVerificationEmail}
                >
                  resend verification email.
                </button>
              </p>
            )}

            {error && <p class="text-red-700">{error}</p>}
          </>
        )}

        {isEmailResent && <p class="text-green-700">Verification email has been sent!</p>}
      </div>
    </div>
  );
}
