import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import { APIError, NewNewUserType, UploadResponse } from '../types'
import { useDropzone } from 'react-dropzone'
import { authHeader } from '../auth'

export function SignUp() {
  async function submitNewUser(newUser: NewNewUserType) {
    const response = await fetch('/api/Users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })

    if (response.ok) {
      return response.json()
    } else {
      throw await response.json()
    }
  }

  const history = useNavigate()
  const [newUser, setNewUser] = useState<NewNewUserType>({
    firstName: '',
    email: '',
    password: '',
    photoUrl: '',
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const createUserMutation = useMutation(
    (newUser: NewNewUserType) => submitNewUser(newUser),
    {
      onSuccess: () => {
        history('/login')
      },
      onError: function (error: APIError) {
        setErrorMessage(Object.values(error.errors).join(' '))
      },
    }
  )

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    createUserMutation.mutate(newUser)
  }

  function handleStringFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const fieldName = event.target.name
    const updatedUser = { ...newUser, [fieldName]: value }
    setNewUser(updatedUser)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  async function uploadFile(fileToUpload: File) {
    // Create a formData object so we can send this
    // to the API that is expecting some form data.
    const formData = new FormData()

    // Append a field that is the form upload itself
    formData.append('file', fileToUpload)

    // Use fetch to send an authorization header and
    // a body containing the form data with the file
    const response = await fetch('/api/Uploads', {
      method: 'POST',
      headers: {
        Authorization: authHeader(),
      },
      body: formData,
    })

    if (response.ok) {
      return response.json()
    } else {
      throw 'Unable to upload image!'
    }
  }

  const uploadFileMutation = useMutation(uploadFile, {
    onSuccess: function (apiResponse: UploadResponse) {
      const url = apiResponse.url

      setNewUser({ ...newUser, photoUrl: url })
    },

    onError: function (error: string) {
      setErrorMessage(error)
    },

    onSettled: function () {
      setIsUploading(false)
    },
  })

  async function onDropFile(acceptedFiles: File[]) {
    // Do something with the files
    const fileToUpload = acceptedFiles[0]

    setIsUploading(true)
    uploadFileMutation.mutate(fileToUpload)
  }

  let dropZoneMessage =
    'tap or drag a picture here to upload your passport photo!'

  if (isUploading) {
    dropZoneMessage = 'Uploading...'
  }
  if (isDragActive) {
    dropZoneMessage = 'Drop file here...'
  }

  return (
    <div>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      <form onSubmit={handleFormSubmit} className="addCountry">
        <p className="addCountry">
          <label htmlFor="firstName">first name</label>
          <input
            className="addCountry"
            type="text"
            name="firstName"
            value={newUser.firstName}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="addCountry">
          <label htmlFor="email">email</label>
          <input
            className="addCountry"
            type="text"
            name="email"
            value={newUser.email}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="addCountry">
          <label htmlFor="password">password</label>
          <input
            className="addCountry"
            type="text"
            name="password"
            value={newUser.password}
            onChange={handleStringFieldChange}
          />
        </p>
        {newUser.photoUrl ? (
          <p>
            <img alt="User Photo" width={200} src={newUser.photoUrl} />
          </p>
        ) : null}
        <div className="addCountry">
          <label htmlFor="photoUrl">user image</label>
          <div className="file-drop-zone">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {dropZoneMessage}
            </div>
          </div>
        </div>
        <div>
          <button className="addCountry" name="submit">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  )
}
