import { UploadSimple } from '@phosphor-icons/react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone-esm'

interface DropzoneProps {
  errorMessage?: string
  onFileUploaded: (file: File) => void
  defaultFileUrl?: string
}

export function Dropzone({
  errorMessage,
  onFileUploaded,
  defaultFileUrl,
}: DropzoneProps) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const fileUrl = URL.createObjectURL(file)

      onFileUploaded(file)
      setSelectedFileUrl(fileUrl)
    },
    [onFileUploaded],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg', '.jpeg'],
    },
    maxSize: 1024 * 1024 * 5, // 5MB
    multiple: false,
  })

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex items-center justify-center bg-desaturated rounded-lg p-2 md:p-8">
        <div
          {...getRootProps()}
          className={
            'group w-full h-40 md:h-80 flex flex-col items-center justify-center relative gap-2 md:gap-4 border border-dashed border-greenpeace hover:border-ecogreen rounded-lg overflow-hidden cursor-pointer select-none transition duration-300'
          }
        >
          <input {...getInputProps()} />

          {selectedFileUrl || defaultFileUrl ? (
            <img
              src={selectedFileUrl || defaultFileUrl}
              alt=""
              className="w-full h-full object-contain"
            />
          ) : (
            <>
              <UploadSimple className="text-2xl text-greenpeace group-hover:text-ecogreen transition duration-300" />
              <p className="text-sm md:text-base text-title">
                Imagem do estabelecimento
              </p>
            </>
          )}
        </div>
      </div>

      {errorMessage && (
        <span className="text-xs leading-tight text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  )
}
