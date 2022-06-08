import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { recordAuthentication } from '../auth'
import { APIError, LoginSuccess, LoginUserType } from '../types'

async function loginUser(user: LoginUserType): Promise<LoginSuccess> {
  const response = await fetch('/api/Sessions', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(user),
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

export function Login() {
  const [errorMessage, setErrorMessage] = useState('')

  const [user, setUser] = useState<LoginUserType>({
    email: '',
    password: '',
    photoUrl: '',
  })

  const loginUserMutation = useMutation(loginUser, {
    onSuccess: function (apiResponse) {
      // TODO: record the authentication information we receive

      recordAuthentication(apiResponse)
      window.location.assign('/')
    },
    onError: function (error: APIError) {
      setErrorMessage(Object.values(error.errors).join(' '))
    },
  })

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    loginUserMutation.mutate(user)
  }

  function handleStringFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...user, [fieldName]: value }

    setUser(updatedUser)
  }

  return (
    <div>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      <form onSubmit={handleFormSubmit} className="addCountry">
        <p className="addCountry">
          <label htmlFor="email">email</label>
          <input
            className="addCountry"
            type="text"
            name="email"
            value={user.email}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="addCountry">
          <label htmlFor="password">password</label>
          <input
            className="addCountry"
            type="text"
            name="password"
            value={user.password}
            onChange={handleStringFieldChange}
          />
        </p>
        <div>
          <button className="addCountry" name="submit">
            LOG IN
          </button>
        </div>
      </form>
    </div>
  )
}
