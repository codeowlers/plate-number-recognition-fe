import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Card, CardContent,
  Container, Grid,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { getData } from '../api'
import { FileDropzone } from '../components/file-drop-zone'
import { UploadFile } from '../hooks'
import { Logo } from '../components/logo'

const HomePage = () => {
  const [files, setFiles] = useState([])
  const [photo, handlePhotoUpload] = UploadFile({
    location: 'python',
    fileTypes: ['image/jpg', 'image/jpeg', 'image/png'],
    fileSize: 2,
    errorMessages: {
      fileType: 'Please select an image file (png or jpg)',
      fileSize: 'File Should Not Exceed 200MB',
    },
  })
  const src = photo.url
  const getUrl = useCallback(async () => {
    try {
      const res = await getData('Hello World')
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }, [])
  const handleDrop = (newFiles) => {
    handlePhotoUpload(newFiles)
    setFiles(newFiles)
  }
  useEffect(
    () => {
      getUrl()
    },
    [],
  )
  return (
  <>
    <Head>
      <title>
        Code Owlers | Image Processing
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: {
            xs: '60px',
            md: '120px',
          },
        }}
      >
        <Card
          elevation={16}
          sx={{
            p: 4,
            mb: 2,
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Logo
              sx={{
                height: 40,
                width: 40,
              }}
            />
            <Typography variant="h4">
              Image Processing
            </Typography>
            <Typography
              color="textSecondary"
              sx={{ mt: 2 }}
              variant="body2"
            >
              Number Plate Recognition: Given that we have several cars in an image,
              the system should be able to recognize the plate of the car and retrieve its
              number.
            </Typography>
          </Box>
        </Card>
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={4}
                xs={12}
              >
                <Typography variant="h6">
                  Image
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  Please Upload an image of a car with a plate number to detect it&apos;s plate number
                </Typography>
              </Grid>
              <Grid
                item
                md={8}
                xs={12}
              >
                <FileDropzone
                  progress={photo.url}
                  active={photo.active}
                  accept="image/*"
                  files={files}
                  onDrop={handleDrop}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {photo?.url && (
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <Typography variant="h6">
                    Result
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={{ mt: 1 }}
                  >
                    Here is the image that you submitted and it&apos;s output
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={8}
                  xs={12}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography
                        color="textSecondary"
                        variant="body1"
                        sx={{ my: 1 }}
                      >
                        Original Image
                      </Typography>
                      <Image
                        loader={() => src}
                        src={src}
                        layout="responsive"
                        height={100}
                        width={100}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        color="textSecondary"
                        variant="body1"
                        sx={{ my: 1 }}
                      >
                        Result
                      </Typography>
                      <Image
                        loader={() => src}
                        src={src}
                        layout="responsive"
                        height={100}
                        width={100}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  </>
  )
}

export default HomePage
