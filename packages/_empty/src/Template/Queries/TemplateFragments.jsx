import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

const TemplateLinkFragmentStr = `
fragment TemplateLink on TemplateGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`

const TemplateMediumFragmentStr = `
fragment TemplateMedium on TemplateGQLModel {
  ...TemplateLink
}
`

const TemplateLargeFragmentStr = `
fragment TemplateLarge on TemplateGQLModel {
  ...TemplateMedium
}
`

export const TemplateLinkFragment = createQueryStrLazy(`${TemplateLinkFragmentStr}`)
export const TemplateMediumFragment = createQueryStrLazy(`${TemplateMediumFragmentStr}`, TemplateLinkFragment)
export const TemplateLargeFragment = createQueryStrLazy(`${TemplateLargeFragmentStr}`, TemplateMediumFragment)
  