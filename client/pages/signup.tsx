/* eslint-disable consistent-return */
import {useFormState} from 'react-use-form-state';
import emailValidator from 'email-validator';
import React, {useState} from 'react';
import Link from 'next/link';
import 'twin.macro';

import BodyWrapper from '../components/BodyWrapper';

const LoginPage: React.FC = () => {
  const [
    formState,
    {
      email: emailProps,
      password: passwordProps,
      checkbox: checkboxProps,
      label: labelProps,
    },
  ] = useFormState<{
    email: string;
    password: string;
    isSeller: boolean;
  }>(null, {withIds: true});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    const {
      email: emailFormValue,
      password: passwordFormValue,
    } = formState.values;

    if (!emailFormValue) {
      return setError('Email address must not be empty.');
    }

    if (!emailValidator.validate(emailFormValue)) {
      return setError('Email address is not valid.');
    }

    if (passwordFormValue.trim().length < 6) {
      return setError('Password must be at least 6 chars long.');
    }

    setError('');
    setLoading(true);

    try {
      console.log('submitted', formState.values);

      // return;
    } catch (err) {
      // backend response
      if (err?.response?.data?.response) {
        // const {
        //   data: {response},
        // } = err.response;
        // if (response && response.statusText) {
        //   setError(response.statusText);
        // }
      } else {
        setError('Error: Backend error');
      }
    }

    setLoading(false);
  }

  return (
    <>
      <BodyWrapper>
        <div tw="flex h-screen items-center justify-center bg-gray-200">
          <div tw="">
            <div tw="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
              <div tw="px-10 py-8">
                <h2 tw="text-3xl font-bold text-center text-gray-700">
                  Real Estate App
                </h2>

                <p tw="mt-1 text-xl font-bold text-center text-gray-600">
                  Hi there
                </p>

                <span tw="mt-1 text-center text-gray-600">Create account</span>

                <form onSubmit={handleSubmit}>
                  <div tw="w-full mt-4">
                    <input
                      {...emailProps('email')}
                      placeholder="Email Address"
                      tw="focus:outline-none focus:bg-white block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded appearance-none"
                    />
                  </div>

                  <div tw="w-full mt-4">
                    <input
                      {...passwordProps('password')}
                      placeholder="Password"
                      tw="focus:outline-none focus:bg-white block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded appearance-none"
                    />
                  </div>

                  <div>
                    <label
                      {...labelProps('isSeller')}
                      tw="block font-bold text-gray-500 mt-4 cursor-pointer "
                    >
                      <input
                        {...checkboxProps('isSeller')}
                        tw="mr-2 leading-tight"
                      />
                      <span tw="text-sm">This is a Seller Account</span>
                    </label>
                  </div>

                  <div tw="flex items-center justify-end mt-6">
                    <button
                      tw="hover:bg-gray-600 focus:outline-none px-4 py-2 text-white bg-gray-700 rounded"
                      type="submit"
                      disabled={loading}
                    >
                      {!loading ? 'Sign Up' : 'Signing up...'}
                    </button>
                  </div>
                </form>
              </div>

              <p tw="text-red-700 text-center text-xs italic">{error}</p>

              <div tw="flex items-center justify-center py-4 text-center bg-gray-100">
                <span tw="text-sm text-gray-600">Already have an account?</span>

                <Link href="/signin">
                  <a tw="cursor-pointer hover:text-blue-500 mx-2 text-sm font-bold text-blue-600">
                    Sign In
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </BodyWrapper>
    </>
  );
};

export default LoginPage;
