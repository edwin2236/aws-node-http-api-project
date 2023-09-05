export const s3hook = (event, context) => {
  console.log({ event: JSON.stringify(event) })
  console.log({ context: JSON.stringify(context) })
  console.log({ env: JSON.stringify(process.env) })
}
