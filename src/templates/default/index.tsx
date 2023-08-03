interface DefaultPageTemplateProps {
  children?: JSX.Element | JSX.Element[]
}

export default function DefaultPageTemplate({
  children
}: DefaultPageTemplateProps) {
  return { children }
}
