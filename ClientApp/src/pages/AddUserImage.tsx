import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import { authHeader, getUser } from '../auth'
import { LoginUserType, UploadResponse } from '../types'

export function AddUserImage() {
  async function submitLoggedInUserPhoto(loggedInUser: LoginUserType) {
    const response = await fetch('/api/Users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(loggedInUser),
    })

    if (response.ok) {
      return response.json()
    } else {
      throw await response.json()
    }
  }

  const history = useNavigate()
  const [loggedInUser, setNewLoggedInUser] = useState<LoginUserType>({
    firstName: '',
    email: '',
    password: '',
    photoUrl: '',
  })

  const [errorMessage, setErrorMessage] = useState('')
  // const [isUploading, setIsUploading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

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

      setNewLoggedInUser({ ...loggedInUser, photoUrl: url })
    },

    onError: function (error: string) {
      setErrorMessage(error)
    },

    onSettled: function () {
      setIsUploading(false)
    },
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
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

  const user = getUser()
  const createUserMutation = useMutation(
    (loggedInUser: LoginUserType) => submitLoggedInUserPhoto(loggedInUser),
    {
      onSuccess: () => {
        history(`/passport/${user.id}`)
      },
      // QUESTION: Making email and first name mandatory b/c it's set in User model.
      // If I delete the below, i do not get an error message, but the error is still on the backend.
      // onError: function (error: APIError) {
      //   setErrorMessage(Object.values(error.errors).join(' '))
      // },
    }
  )

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    createUserMutation.mutate(loggedInUser)
  }

  return (
    <div>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      <form onSubmit={handleFormSubmit} className="addCountry">
        <div className="addImage">
          <label htmlFor="photoUrl">passport photo</label>
          <div className="file-drop-zone">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {dropZoneMessage}
            </div>
          </div>
        </div>
        <div>
          <button className="addCountry" name="submit">
            Add Image
          </button>
        </div>
      </form>
    </div>
  )
}
