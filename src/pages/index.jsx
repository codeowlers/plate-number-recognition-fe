import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react'
import {
  Box, Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel, LinearProgress,
  OutlinedInput, TextField, Tooltip,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { toast } from 'react-hot-toast'
import { getData } from '../api'
import { FileDropzone } from '../components/file-drop-zone'
import { UploadFile } from '../hooks'
import { Logo } from '../components/logo'

const HomePage = () => {
  const [files, setFiles] = useState([])
  const [response, setResponse] = useState({})
  const [loading, setLoading] = useState(false)
  const [epochs, setEpochs] = useState('')
  const [photo, handlePhotoUpload] = UploadFile({
    location: 'python',
    fileTypes: ['image/jpg', 'image/jpeg', 'image/png'],
    fileSize: 2,
    errorMessages: {
      fileType: 'Please select an image file (png or jpg)',
      fileSize: 'File Should Not Exceed 200MB',
    },
  })
  const src = useMemo(() => photo.url, [photo.url])
  // const responseUrl = useMemo(() => response?.url, [response.url])
  const getUrl = useCallback(async (url) => {
    if (epochs >= 0 && epochs < 7) {
      if (url) {
        setLoading(true)
        try {
          const res = await getData(epochs, url)
          console.log(res)
          return res
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    } else {
      setFiles([])
      photo.setUrl('')
      setEpochs('')
    }
  }, [epochs, photo])
  const handleDrop = (newFiles) => {
    // handlePhotoUpload(newFiles)
    setFiles(newFiles)
  }
  useEffect(() => {
    if (photo.url && !response.predictions) {
      getUrl(photo.url).then(({
        plate_contour,
        plate_segmented,
        predictions,
        plate_number,
      }) => {
        setResponse({
          // eslint-disable-next-line camelcase
          plate_contour, plate_segmented, predictions, plate_number,
        })
      })
    }
  }, [getUrl, photo.url, response.predictions, response.url])
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FileDropzone
                      progress={photo.progress}
                      active={photo.active}
                      accept="image/*"
                      files={files}
                      onDrop={handleDrop}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Epochs"
                      variant="outlined"
                      type="number"
                      onChange={(e) => setEpochs(e.target.value)}
                      value={epochs}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      onClick={() => {
                        handlePhotoUpload(files)
                      }}
                      variant="contained"
                      disabled={files.length === 0 || epochs.length === 0 || photo.active || loading}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
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
                    {loading ? (<Grid item xs={12}><LinearProgress color="success" /></Grid>) : (
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography
                              color="textSecondary"
                              variant="body1"
                              sx={{ my: 1 }}
                            >
                              Plate Contour
                            </Typography>
                            <img
                              src={response?.plate_contour}
                              alt="response"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              color="textSecondary"
                              variant="body1"
                              sx={{ my: 1 }}
                            >
                              Plate Segmented
                            </Typography>
                            <img
                              src={response?.plate_segmented}
                              alt="response"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              color="textSecondary"
                              variant="body1"
                              sx={{ my: 1 }}
                            >
                              Predictions
                            </Typography>
                            <img
                              src={response?.predictions}
                              alt="response"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel htmlFor="outlined-adornment-password">Plate Numbers</InputLabel>
                              <OutlinedInput
                                disabled
                                id="outlined-adornment-password"
                                type="text"
                                value={response?.plate_number || ''}
                                endAdornment={(
                                  <Tooltip title="Copy">
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => { navigator.clipboard.writeText(response?.plate_number).then(() => toast.success('Plate Number Copied to clipboard')) }}
                                        edge="end"
                                      >
                                        <ContentCopyIcon />
                                      </IconButton>
                                    </InputAdornment>
                                  </Tooltip>
                                )}
                                label="Password"
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
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
