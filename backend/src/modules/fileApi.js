
const uuid = require('uuid/v1')
const aws = require('aws-sdk')

const s3 = new aws.S3({
  accessKeyId: '',
  secretAccessKey: '',
  params: {
    Bucket: 'al-arabia-files'
  },
  endpoint: new aws.Endpoint('') // fake s3 endpoint for local dev
})

exports.processUpload = async ( upload, ctx ) => {
  if (!upload) {
    return console.log('ERROR: No file received.')
  }
  
  const { stream, filename, mimetype, encoding } = await upload

  console.log(filename, mimetype)
  const key = uuid() + '-' + filename

  // Upload to S3
  const response = await s3
    .upload({
      Key: key,
      ACL: 'public-read',
      Body: stream
    }).promise()

  const url = response.Location
  console.log(response)

  // Sync with Prisma
  const data = {
    filename,
    mimetype,
    encoding,
    url,
  }

  const { id } = await ctx.db.mutation.createFile({ data }, ` { id } `)

  const file = {
    id,
    filename,
    mimetype,
    encoding,
    url,
  }

  console.log('saved prisma file:')
  console.log(file)

  return file
}