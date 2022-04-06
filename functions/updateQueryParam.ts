export default function (vueInstance: any, val: string, param: string) {
  const newQuery = { ...vueInstance.$route.query }

  if (!val) {
    delete newQuery[param]
  } else {
    newQuery[param] = val
  }

  vueInstance.$router.push({
    path: vueInstance.$route.path,
    query: newQuery,
  })
}
